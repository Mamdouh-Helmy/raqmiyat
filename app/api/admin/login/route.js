import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { connectDB } from "@/lib/mongodb";
import Admin from "@/models/Admin";
import { createSessionToken, SESSION_COOKIE } from "@/lib/auth";

// Simple in-memory rate limiting. Resets on server restart/redeploy —
// fine for a low-traffic admin login; swap for Redis if you scale this out.
const attempts = new Map();
const MAX_ATTEMPTS = 5;
const WINDOW_MS = 15 * 60 * 1000;

function isRateLimited(key) {
  const entry = attempts.get(key);
  if (!entry) return false;
  if (Date.now() - entry.first > WINDOW_MS) {
    attempts.delete(key);
    return false;
  }
  return entry.count >= MAX_ATTEMPTS;
}

function recordFailedAttempt(key) {
  const entry = attempts.get(key);
  if (!entry) {
    attempts.set(key, { count: 1, first: Date.now() });
  } else {
    entry.count += 1;
  }
}

// A precomputed dummy hash, compared against when the username doesn't
// exist, so a login attempt for a real vs. fake username takes roughly the
// same time (avoids leaking which usernames exist via response timing).
const DUMMY_HASH =
  "$2b$10$CwTycUXWue0Thq9StjUM0uJ8vAgFj2Bm7oXQKA9cQY6c6qHFNjaDe";

export async function POST(req) {
  const ip = req.headers.get("x-forwarded-for") || "local";

  if (isRateLimited(ip)) {
    return NextResponse.json(
      { error: "محاولات دخول كثيرة، حاول تاني بعد شوية." },
      { status: 429 }
    );
  }

  try {
    const { username, password } = await req.json();

    if (!username || !password) {
      return NextResponse.json(
        { error: "أدخل اسم المستخدم وكلمة المرور." },
        { status: 400 }
      );
    }

    await connectDB();
    const admin = await Admin.findOne({
      username: username.trim().toLowerCase(),
    });

    const validPassword = await bcrypt.compare(
      password,
      admin ? admin.passwordHash : DUMMY_HASH
    );

    if (!admin || !validPassword) {
      recordFailedAttempt(ip);
      return NextResponse.json(
        { error: "اسم المستخدم أو كلمة المرور غير صحيحة." },
        { status: 401 }
      );
    }

    attempts.delete(ip);

    admin.lastLoginAt = new Date();
    await admin.save();

    const token = await createSessionToken({
      sub: admin._id.toString(),
      role: admin.role,
    });

    const res = NextResponse.json({ success: true });
    res.cookies.set(SESSION_COOKIE, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 8 * 60 * 60, // 8 hours, matches token expiry
    });
    return res;
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "حدث خطأ أثناء تسجيل الدخول." },
      { status: 500 }
    );
  }
}