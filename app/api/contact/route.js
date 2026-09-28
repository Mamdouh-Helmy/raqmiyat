// app/api/contact/route.js
import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Contact from "@/models/Contact";
import { validateContactForm } from "@/lib/validate";
import { verifySessionToken, SESSION_COOKIE } from "@/lib/auth";
import { sanitizeDetails, summarizeDetails } from "@/lib/leadDetails";

const ALLOWED_SUBJECTS = [
  "استشارة مجانية",
  "التحدث مع خبير تقني",
  "فحص أمني",
  "مناقشة مشروع",
  "عام",
];

export async function POST(req) {
  try {
    const body = await req.json();
    console.log("contact body:", JSON.stringify(body));
    const { name, email, phone, message, subject, company, details: rawDetails } =
      body || {};

    const details = sanitizeDetails(rawDetails);

    // لو الـ planner مبعتش ملاحظات حرّة، الرسالة بتتكوّن من التفاصيل نفسها
    const finalMessage =
      (typeof message === "string" && message.trim()) || summarizeDetails(details);

    // Server-side validation is the source of truth — never trust the client.
    const errors = validateContactForm({ name, email, phone, message: finalMessage });
    if (Object.keys(errors).length > 0) {
      return NextResponse.json({ error: "بيانات غير صحيحة.", fields: errors }, { status: 400 });
    }

    const safeSubject = ALLOWED_SUBJECTS.includes(subject) ? subject : "عام";

    await connectDB();
    const contact = await Contact.create({
      name: name.trim(),
      email: email.trim(),
      phone: phone?.trim() || undefined,
      company: company?.trim() || undefined,
      message: finalMessage,
      subject: safeSubject,
      details,
    });

    return NextResponse.json({ success: true, id: contact._id }, { status: 201 });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "حدث خطأ أثناء إرسال الطلب. حاول مرة أخرى." },
      { status: 500 }
    );
  }
}

// Protected: only accessible to a signed-in admin (httpOnly session cookie),
// so submitted leads (names, emails, messages) can't be read by anyone who
// just finds the URL or a leaked static key.
export async function GET(req) {
  try {
    const token = req.cookies.get(SESSION_COOKIE)?.value;
    const session = await verifySessionToken(token);
    if (!session) {
      return NextResponse.json({ error: "غير مصرح." }, { status: 401 });
    }

    await connectDB();
    const contacts = await Contact.find().sort({ createdAt: -1 }).limit(200);
    return NextResponse.json({ contacts });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "تعذر جلب البيانات." }, { status: 500 });
  }
}