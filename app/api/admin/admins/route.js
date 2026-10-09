// مكان الملف: نفس مسار route الأدمنز الحالي (GET قائمة + POST إنشاء)
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { connectDB } from "@/lib/mongodb";
import Admin from "@/models/Admin";
import { requireAdmin } from "@/lib/requireAdmin";

const MAX_USERNAME = 64;
const MAX_PASSWORD = 200;

const unauthorized = () =>
  NextResponse.json({ error: "غير مصرح." }, { status: 401 });

export async function GET(req) {
  try {
    const session = await requireAdmin(req);
    if (!session) return unauthorized();

    await connectDB();
    const admins = await Admin.find().select("-passwordHash").sort({ createdAt: 1 });
    return NextResponse.json({ admins });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "تعذر جلب البيانات." }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    const session = await requireAdmin(req);
    if (!session) return unauthorized();

    let body;
    try {
      body = await req.json();
    } catch {
      return NextResponse.json({ error: "طلب غير صالح." }, { status: 400 });
    }

    const { username, password } = body || {};

    if (typeof username !== "string" || !username.trim()) {
      return NextResponse.json({ error: "اسم المستخدم مطلوب." }, { status: 400 });
    }
    if (username.trim().length > MAX_USERNAME) {
      return NextResponse.json({ error: "اسم المستخدم طويل جداً." }, { status: 400 });
    }
    if (typeof password !== "string" || password.length < 8) {
      return NextResponse.json(
        { error: "كلمة المرور لازم تكون 8 أحرف على الأقل." },
        { status: 400 }
      );
    }
    if (password.length > MAX_PASSWORD) {
      return NextResponse.json({ error: "كلمة المرور طويلة جداً." }, { status: 400 });
    }

    await connectDB();
    const normalized = username.trim().toLowerCase();

    const exists = await Admin.findOne({ username: normalized });
    if (exists) {
      return NextResponse.json({ error: "اسم المستخدم ده مستخدم بالفعل." }, { status: 409 });
    }

    const passwordHash = await bcrypt.hash(password, 10);

    let admin;
    try {
      admin = await Admin.create({ username: normalized, passwordHash });
    } catch (err) {
      // طلبين متزامنين بنفس الاسم: الـ unique index هو اللي بيمسكهم
      if (err?.code === 11000) {
        return NextResponse.json({ error: "اسم المستخدم ده مستخدم بالفعل." }, { status: 409 });
      }
      throw err;
    }

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