// app/api/contact/[id]/route.js
import { NextResponse } from "next/server";
import mongoose from "mongoose";
import { connectDB } from "@/lib/mongodb";
import Contact from "@/models/Contact";
import { requireAdmin } from "@/lib/requireAdmin";

// Admin only — نفس حماية الـ GET.
export async function DELETE(req, { params }) {
  try {
    const session = await requireAdmin(req);
    if (!session) {
      return NextResponse.json({ error: "غير مصرح." }, { status: 401 });
    }

    const { id } = await params;
    if (!mongoose.isValidObjectId(id)) {
      return NextResponse.json({ error: "معرّف غير صالح." }, { status: 400 });
    }

    await connectDB();
    const deleted = await Contact.findByIdAndDelete(id);
    if (!deleted) {
      return NextResponse.json({ error: "الطلب غير موجود." }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "تعذر حذف الطلب." }, { status: 500 });
  }
}