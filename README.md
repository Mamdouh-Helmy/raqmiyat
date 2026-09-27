# رقميات — Raqmiyat

نسخة Next.js (App Router) + MongoDB من تصميم "رقميات"، بخط Tajawal بدل Cairo.

## التشغيل محلياً

```bash
npm install
cp .env.example .env.local   # ثم ضع رابط قاعدة بيانات MongoDB الخاصة بك
npm run dev
```

الموقع يعمل على http://localhost:3000

## البنية

- `app/page.js` — الصفحة الرئيسية، تجمع كل الأقسام.
- `components/` — كل قسم في ملف منفصل (Hero, SecurityBanner, InnovationCarousel, ServicesGrid, StatsSection, ProcessSteps, TrustedBy, WhyDifferent, Testimonial, CTASection, ContactSection, Footer).
- `lib/mongodb.js` — الاتصال بقاعدة البيانات (mongoose، مع caching للـ dev mode).
- `lib/validate.js` — منطق الـ validation المشترك بين الفرونت والباك إند لكل الفورمات.
- `models/Contact.js` — موديل لطلبات التواصل/الاستشارات.
- `app/api/contact/route.js` — الباك إند: `POST` لاستقبال أي فورم في الموقع وحفظه في MongoDB (بعد التحقق من صحة البيانات مرة ثانية على السيرفر)، و`GET` محمي لعرض الطلبات.
- `app/admin/leads/page.js` — لوحة بسيطة لعرض كل طلبات التواصل الواردة، محمية بمفتاح إدارة.

## الباك إند وربط الفورمات

كل الفورمات في الموقع (فورم "تواصل معنا"، وفورم البوب أب في "اطلب استشارة مجانية" / "تحدث مع خبير تقني") مربوطة بنفس الـ API الواحد `POST /api/contact`:

1. **Validation مزدوج**: الفورم بيتحقق من البيانات لحظياً في المتصفح (`lib/validate.js`)، وبرضه السيرفر بيعيد نفس التحقق قبل الحفظ — عشان محدش يقدر يبعت بيانات فاضية أو غلط حتى لو تخطى الفرونت إند.
2. **الحفظ**: البيانات الصحيحة بتتحفظ في MongoDB عبر Mongoose (موديل `Contact`) مع الوقت والتاريخ تلقائياً.
3. **عرض الطلبات**: افتح `/admin/leads` وحط قيمة `ADMIN_SECRET` اللي حطيتها في `.env.local` عشان تشوف كل الطلبات الواردة (اسم، إيميل، تليفون، الموضوع، الرسالة).

لإضافة فورم جديد في أي مكان بالموقع، استورد `validateContactForm` و`inputClass` من `lib/validate.js`، واستخدم نفس نمط الأخطاء الموجود في `ContactSection.jsx` أو `CTASection.jsx`، وابعت البيانات لنفس `/api/contact`.


## الخط

تم استبدال Cairo بخط **Tajawal** (عبر `next/font/google`)، وهو متاح مجاناً ويدعم الأوزان الثقيلة المستخدمة في العناوين. لتغييره لخط آخر، عدّل الاستيراد في `app/layout.js`.

## الصور

الأقسام التي تحتوي صوراً (الخلفية الخضراء، صورة الفريق، إلخ) موضوعة حالياً كتدرجات لونية بديلة (placeholders) بدل صور حقيقية محمية بحقوق نشر. استبدلها بصورك الخاصة عبر:

```jsx
import Image from "next/image";
<Image src="/hero.jpg" alt="..." fill className="object-cover" />
```

بعد وضع الصورة في `public/`.

## قاعدة البيانات

يستخدم المشروع MongoDB عبر Mongoose لتخزين نماذج التواصل/طلب الاستشارة المرسلة من قسم "لنبدأ في بناء مشروعك القادم". يمكن بسهولة إضافة موديلات أخرى (مثل الخدمات أو التقييمات) بنفس الطريقة لجعل المحتوى ديناميكياً بدل أن يكون ثابتاً في الكود.
