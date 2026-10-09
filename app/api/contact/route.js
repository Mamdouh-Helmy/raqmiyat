// app/api/contact/route.js
import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Contact from "@/models/Contact";
import { validateContactForm } from "@/lib/validate";
import { requireAdmin } from "@/lib/requireAdmin";
import { createLimiter, getClientIp } from "@/lib/rateLimit";
import { sanitizeDetails, summarizeDetails } from "@/lib/leadDetails";

const ALLOWED_SUBJECTS = [
  "استشارة مجانية",
  "التحدث مع خبير تقني",
  "فحص أمني",
  "مناقشة مشروع",
  "عام",
];

// 5 طلبات لكل IP كل 15 دقيقة
const limiter = createLimiter({ max: 5, windowMs: 15 * 60 * 1000 });

// أقصى أطوال للحقول النصية
const LIMITS = { name: 100, email: 254, phone: 30, company: 100, message: 4000 };
const MAX_FINAL_MESSAGE = 6000;

// بيرجّع اسم أول حقل نوعه غلط أو طويل زيادة، وإلا null
function findBadField(body) {
  for (const [field, max] of Object.entries(LIMITS)) {
    const value = body[field];
    if (value === undefined || value === null || value === "") continue;
    if (typeof value !== "string" || value.length > max) return field;
  }
  return null;
}

export async function POST(req) {
  try {
    const ip = getClientIp(req);
    if (limiter.isLimited(ip)) {
      return NextResponse.json(
        { error: "طلبات كتير في وقت قصير. حاول تاني بعد شوية." },
        { status: 429 }
      );
    }
    limiter.hit(ip);

    let body;
    try {
      body = await req.json();
    } catch {
      return NextResponse.json({ error: "طلب غير صالح." }, { status: 400 });
    }
    if (!body || typeof body !== "object") {
      return NextResponse.json({ error: "طلب غير صالح." }, { status: 400 });
    }

    // Honeypot: حقل مخفي (website) البشر ما بيملوهوش، والبوتات بتملاه.
    // بنرد بنجاح وهمي من غير ما نحفظ حاجة.
    if (typeof body.website === "string" && body.website.trim()) {
      return NextResponse.json({ success: true }, { status: 201 });
    }

    const badField = findBadField(body);
    if (badField) {
      return NextResponse.json(
        { error: "بيانات غير صحيحة.", fields: { [badField]: "قيمة غير صالحة أو طويلة." } },
        { status: 400 }
      );
    }

    const { name, email, phone, message, subject, company, details: rawDetails } = body;

    const details = sanitizeDetails(rawDetails);

    // لو الـ planner مبعتش ملاحظات حرّة، الرسالة بتتكوّن من التفاصيل نفسها
    const finalMessage = (
      (typeof message === "string" && message.trim()) || summarizeDetails(details)
    ).slice(0, MAX_FINAL_MESSAGE);

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
    const session = await requireAdmin(req);
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