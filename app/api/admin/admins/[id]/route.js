import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { connectDB } from "@/lib/mongodb";
import Admin from "@/models/Admin";
import { verifySessionToken, SESSION_COOKIE } from "@/lib/auth";

async function requireSession(req) {
  const token = req.cookies.get(SESSION_COOKIE)?.value;
  return verifySessionToken(token);
}

export async function PATCH(req, { params }) {
  const session = await requireSession(req);
  if (!session) {
    return NextResponse.json({ error: "غير مصرح." }, { status: 401 });
  }

  try {
    const { username, password } = await req.json();
    const update = {};

    if (username && username.trim()) {
      update.username = username.trim().toLowerCase();
    }
    if (password) {
      if (password.length < 8) {
        return NextResponse.json(
          { error: "كلمة المرور لازم تكون 8 أحرف على الأقل." },
          { status: 400 }
        );
      }
      update.passwordHash = await bcrypt.hash(password, 10);
    }

    if (Object.keys(update).length === 0) {
      return NextResponse.json({ error: "مفيش حاجة للتحديث." }, { status: 400 });
    }

    await connectDB();

    if (update.username) {
      const clash = await Admin.findOne({
        username: update.username,
        _id: { $ne: params.id },
      });
      if (clash) {
        return NextResponse.json({ error: "اسم المستخدم ده مستخدم بالفعل." }, { status: 409 });
      }
    }

    const admin = await Admin.findByIdAndUpdate(params.id, update, { new: true }).select(
      "-passwordHash"
    );

    if (!admin) {
      return NextResponse.json({ error: "الأدمن غير موجود." }, { status: 404 });
    }

    return NextResponse.json({ admin });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "حدث خطأ أثناء التحديث." }, { status: 500 });
  }
}

export async function DELETE(req, { params }) {
  const session = await requireSession(req);
  if (!session) {
    return NextResponse.json({ error: "غير مصرح." }, { status: 401 });
  }

  try {
    if (session.sub === params.id) {
      return NextResponse.json(
        { error: "متقدرش تمسح حسابك الحالي وانت داخل بيه." },
        { status: 400 }
      );
    }

    await connectDB();

    const total = await Admin.countDocuments();
    if (total <= 1) {
      return NextResponse.json(
        { error: "لازم يفضل أدمن واحد على الأقل." },
        { status: 400 }
      );
    }

    const admin = await Admin.findByIdAndDelete(params.id);
    if (!admin) {
      return NextResponse.json({ error: "الأدمن غير موجود." }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "حدث خطأ أثناء الحذف." }, { status: 500 });
  }
}