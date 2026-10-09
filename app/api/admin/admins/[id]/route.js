// مكان الملف: نفس مسار route الأدمن الواحد الحالي (PATCH تعديل + DELETE حذف) داخل [id]
import { NextResponse } from "next/server";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import { connectDB } from "@/lib/mongodb";
import Admin from "@/models/Admin";
import { requireAdmin } from "@/lib/requireAdmin";

const MAX_USERNAME = 64;
const MAX_PASSWORD = 200;

const unauthorized = () =>
  NextResponse.json({ error: "غير مصرح." }, { status: 401 });

const invalidId = () =>
  NextResponse.json({ error: "معرّف غير صالح." }, { status: 400 });

const duplicate = () =>
  NextResponse.json({ error: "اسم المستخدم ده مستخدم بالفعل." }, { status: 409 });

export async function PATCH(req, { params }) {
  try {
    const session = await requireAdmin(req);
    if (!session) return unauthorized();

    const { id } = await params;
    if (!mongoose.isValidObjectId(id)) return invalidId();

    let body;
    try {
      body = await req.json();
    } catch {
      return NextResponse.json({ error: "طلب غير صالح." }, { status: 400 });
    }

    const { username, password } = body || {};
    const update = {};

    if (username !== undefined && username !== null && username !== "") {
      if (typeof username !== "string") {
        return NextResponse.json({ error: "اسم المستخدم غير صالح." }, { status: 400 });
      }
      const trimmed = username.trim();
      if (trimmed) {
        if (trimmed.length > MAX_USERNAME) {
          return NextResponse.json({ error: "اسم المستخدم طويل جداً." }, { status: 400 });
        }
        update.username = trimmed.toLowerCase();
      }
    }

    if (password !== undefined && password !== null && password !== "") {
      if (typeof password !== "string" || password.length < 8) {
        return NextResponse.json(
          { error: "كلمة المرور لازم تكون 8 أحرف على الأقل." },
          { status: 400 }
        );
      }
      if (password.length > MAX_PASSWORD) {
        return NextResponse.json({ error: "كلمة المرور طويلة جداً." }, { status: 400 });
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
        _id: { $ne: id },
      });
      if (clash) return duplicate();
    }

    let admin;
    try {
      admin = await Admin.findByIdAndUpdate(id, update, { new: true }).select(
        "-passwordHash"
      );
    } catch (err) {
      if (err?.code === 11000) return duplicate();
      throw err;
    }

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
  try {
    const session = await requireAdmin(req);
    if (!session) return unauthorized();

    const { id } = await params;
    if (!mongoose.isValidObjectId(id)) return invalidId();

    if (session.sub === id) {
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

    const admin = await Admin.findByIdAndDelete(id);
    if (!admin) {
      return NextResponse.json({ error: "الأدمن غير موجود." }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "حدث خطأ أثناء الحذف." }, { status: 500 });
  }
}