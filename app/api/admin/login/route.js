// مكان الملف: نفس مسار route تسجيل الدخول الحالي (POST /login)
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { connectDB } from "@/lib/mongodb";
import Admin from "@/models/Admin";
import { createSessionToken, SESSION_COOKIE } from "@/lib/auth";
import { createLimiter, getClientIp } from "@/lib/rateLimit";

const WINDOW_MS = 15 * 60 * 1000;
// حد لكل IP، وحد لكل اسم مستخدم (بيوقف التخمين الموزّع على IPs كتير)
const ipLimiter = createLimiter({ max: 5, windowMs: WINDOW_MS });
const userLimiter = createLimiter({ max: 10, windowMs: WINDOW_MS });

const MAX_USERNAME = 64;
const MAX_PASSWORD = 200;

// A precomputed dummy hash, compared against when the username doesn't
// exist, so a login attempt for a real vs. fake username takes roughly the
// same time (avoids leaking which usernames exist via response timing).
const DUMMY_HASH =
  "$2b$10$CwTycUXWue0Thq9StjUM0uJ8vAgFj2Bm7oXQKA9cQY6c6qHFNjaDe";

const tooMany = () =>
  NextResponse.json(
    { error: "محاولات دخول كثيرة، حاول تاني بعد شوية." },
    { status: 429 }
  );

export async function POST(req) {
  const ip = getClientIp(req);
  if (ipLimiter.isLimited(ip)) return tooMany();

  let body;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "طلب غير صالح." }, { status: 400 });
  }

  const { username, password } = body || {};

  if (
    typeof username !== "string" ||
    typeof password !== "string" ||
    !username.trim() ||
    !password
  ) {
    return NextResponse.json(
      { error: "أدخل اسم المستخدم وكلمة المرور." },
      { status: 400 }
    );
  }

  if (username.length > MAX_USERNAME || password.length > MAX_PASSWORD) {
    return NextResponse.json(
      { error: "اسم المستخدم أو كلمة المرور غير صحيحة." },
      { status: 401 }
    );
  }

  const normalized = username.trim().toLowerCase();
  if (userLimiter.isLimited(normalized)) return tooMany();

  try {
    await connectDB();
    const admin = await Admin.findOne({ username: normalized });

    const validPassword = await bcrypt.compare(
      password,
      admin ? admin.passwordHash : DUMMY_HASH
    );

    if (!admin || !validPassword) {
      ipLimiter.hit(ip);
      userLimiter.hit(normalized);
      return NextResponse.json(
        { error: "اسم المستخدم أو كلمة المرور غير صحيحة." },
        { status: 401 }
      );
    }

    ipLimiter.reset(ip);
    userLimiter.reset(normalized);

    await Admin.updateOne({ _id: admin._id }, { lastLoginAt: new Date() });

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