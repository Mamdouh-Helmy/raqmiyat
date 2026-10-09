// lib/requireAdmin.js  (ملف جديد)
// للـ API routes بس (بيكلّم الداتابيز، فمينفعش يتستورد في الـ middleware).
// بيتحقق من الـ token وكمان إن الأدمن لسه موجود، فلو اتمسح تتقفل جلسته فوراً.
import mongoose from "mongoose";
import { connectDB } from "@/lib/mongodb";
import Admin from "@/models/Admin";
import { verifySessionToken, SESSION_COOKIE } from "@/lib/auth";

/** بيرجّع payload الجلسة لو سليمة، وإلا null */
export async function requireAdmin(req) {
  const token = req.cookies.get(SESSION_COOKIE)?.value;
  const session = await verifySessionToken(token);

  if (!session?.sub || !mongoose.isValidObjectId(session.sub)) return null;

  await connectDB();
  const exists = await Admin.exists({ _id: session.sub });
  return exists ? session : null;
}