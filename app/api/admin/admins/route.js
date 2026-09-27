import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { connectDB } from "@/lib/mongodb";
import Admin from "@/models/Admin";
import { verifySessionToken, SESSION_COOKIE } from "@/lib/auth";

async function requireSession(req) {
  const token = req.cookies.get(SESSION_COOKIE)?.value;
  return verifySessionToken(token);
}

export async function GET(req) {
  const session = await requireSession(req);
  if (!session) {
    return NextResponse.json({ error: "غير مصرح." }, { status: 401 });
  }

  await connectDB();
  const admins = await Admin.find().select("-passwordHash").sort({ createdAt: 1 });
  return NextResponse.json({ admins });
}

export async function POST(req) {
  const session = await requireSession(req);
  if (!session) {
    return NextResponse.json({ error: "غير مصرح." }, { status: 401 });
  }

  try {
    const { username, password } = await req.json();

    if (!username || !username.trim()) {
      return NextResponse.json({ error: "اسم المستخدم مطلوب." }, { status: 400 });
    }
    if (!password || password.length < 8) {
      return NextResponse.json(
        { error: "كلمة المرور لازم تكون 8 أحرف على الأقل." },
        { status: 400 }
      );
    }

    await connectDB();
    const normalized = username.trim().toLowerCase();

    const exists = await Admin.findOne({ username: normalized });
    if (exists) {
      return NextResponse.json({ error: "اسم المستخدم ده مستخدم بالفعل." }, { status: 409 });
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const admin = await Admin.create({ username: normalized, passwordHash });

    return NextResponse.json(
      {
        admin: {
          _id: admin._id,
          username: admin.username,
          role: admin.role,
          createdAt: admin.createdAt,
        },
      },
      { status: 201 }
    );
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "حدث خطأ أثناء الإنشاء." }, { status: 500 });
  }
}