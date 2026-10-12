//components/AboutModal.jsx
"use client";

import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import Link from "next/link";
import {
  X,
  Check,
  Globe,
  ShoppingCart,
  DeviceMobile,
  UsersThree,
  Buildings,
  FlowArrow,
  Robot,
  ChartLineUp,
  GraduationCap,
  Code,
  PlugsConnected,
  Receipt,
  IdentificationCard,
  CreditCard,
  ShieldCheck,
  Bank,
  Briefcase,
  RocketLaunch,
  VideoCamera,
  LockKey,
} from "@phosphor-icons/react";

// نسيج المعيّنات النجدي نفسه المستخدم في اللودر وجدار الكاميرات
const LATTICE = {
  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='56' height='56' viewBox='0 0 56 56'%3E%3Cpath d='M28 4 52 28 28 52 4 28Z' fill='none' stroke='%23c9a66b' stroke-opacity='0.1'/%3E%3C/svg%3E")`,
  backgroundSize: "56px 56px",
};

const highlights = [
  "فريق واحد للبرمجيات وأنظمة المراقبة",
  "جاهزية للمتطلبات السعودية: فاتورة، نفاذ، مدى، وحماية البيانات",
  "أنظمة وواجهات تعمل بالعربية والإنجليزية",
  "دعم فني مستمر بعد التشغيل",
];

// لمن نبني؟
const audiences = [
  {
    icon: Briefcase,
    title: "شركات ومؤسسات خاصة",
    text: "من المنشأة الناشئة إلى الشركة متعددة الفروع، أنظمة تكبر مع أعمالك.",
  },
  {
    icon: Bank,
    title: "جهات حكومية وشبه حكومية",
    text: "خدمات رقمية آمنة للمستفيدين، تنسجم مع توجهات التحول الرقمي الحكومي.",
  },
  {
    icon: RocketLaunch,
    title: "رواد أعمال وشركات ناشئة",
    text: "من الفكرة إلى منتج يعمل، بنسخة أولى سريعة وأساس قابل للتوسع.",
  },
];

const softwareServices = [
  {
    icon: Globe,
    title: "مواقع ومنصات ويب",
    text: "مواقع سريعة ومهيأة لمحركات البحث، ومنصات متكاملة بلوحات تحكم تدير منها كل شيء بنفسك.",
  },
  {
    icon: ShoppingCart,
    title: "متاجر إلكترونية",
    text: "متجر متكامل بالكتالوج والمخزون والطلبات والشحن، مصمم ليحوّل الزائر إلى مشترٍ.",
  },
  {
    icon: DeviceMobile,
    title: "تطبيقات الجوال",
    text: "تطبيق واحد يعمل على iOS وAndroid، بإشعارات فورية وتسجيل دخول آمن.",
  },
  {
    icon: UsersThree,
    title: "أنظمة إدارة العملاء (CRM)",
    text: "عملاؤك وفرصك البيعية وطلباتهم في مكان واحد، فلا يضيع عميل ولا يتكرر عمل.",
  },
  {
    icon: Buildings,
    title: "أنظمة تخطيط الموارد (ERP)",
    text: "المالية والمخزون والمبيعات والموارد البشرية في نظام واحد، بصلاحيات لكل موظف.",
  },
  {
    icon: FlowArrow,
    title: "أتمتة العمليات وسير العمل",
    text: "نحوّل الموافقات والطلبات والمهام المتكررة إلى مسارات رقمية تعمل تلقائياً، فيتوفر الوقت وتقل الأخطاء.",
  },
  {
    icon: Robot,
    title: "الذكاء الاصطناعي والمساعدات الذكية",
    text: "مساعدات ترد على عملائك بالعربية والإنجليزية، وأدوات تلخّص مستنداتك وتستخرج بياناتها.",
  },
  {
    icon: ChartLineUp,
    title: "تحليل البيانات ولوحات التحكم",
    text: "نحوّل بياناتك إلى مؤشرات وتقارير واضحة تبني عليها قراراتك.",
  },
  {
    icon: GraduationCap,
    title: "منصات التعلم (LMS)",
    text: "تدريب عن بُعد مع اختبارات وشهادات وتتبع لتقدم المتدربين.",
  },
  {
    icon: Code,
    title: "أنظمة مخصصة على مقاسك",
    text: "لا يوجد نظام جاهز يناسب عملك؟ نبنيه من الصفر على مقاس إجراءاتك، ويكبر معك.",
  },
  {
    icon: PlugsConnected,
    title: "ربط الأنظمة والـ APIs",
    text: "نربط أنظمتك القائمة ببوابات الدفع وواتساب والرسائل النصية وأي خدمة تستخدمها، حتى لا تُدخل البيانات مرتين.",
    wide: true,
  },
];

// الميزة المحلية: متطلبات السوق السعودي
const saudiReadyServices = [
  {
    icon: Receipt,
    title: "الفوترة الإلكترونية والربط مع «فاتورة»",
    text: "نربط نظامك بمنصة «فاتورة» التابعة لهيئة الزكاة والضريبة والجمارك، لتصدر فواتير متوافقة مع مرحلة الربط والتكامل وفق موجة منشأتك.",
  },
  {
    icon: IdentificationCard,
    title: "الدخول والتوثيق عبر «نفاذ»",
    text: "نهيّئ منصتك للتكامل مع النفاذ الوطني الموحد عبر القنوات المعتمدة، ليوثّق عملاؤك هويتهم بثقة وبلا نماذج طويلة.",
  },
  {
    icon: CreditCard,
    title: "المدفوعات المحلية",
    text: "مدى وApple Pay وSTC Pay وخيارات التقسيط مثل تمارا وتابي، عبر بوابات دفع مرخّصة.",
  },
  {
    icon: ShieldCheck,
    title: "أمان البيانات والامتثال",
    text: "صلاحيات دقيقة وتشفير وسجلات تدقيق، مع مراعاة نظام حماية البيانات الشخصية وضوابط الهيئة الوطنية للأمن السيبراني.",
  },
  {
    icon: Bank,
    title: "حلول للجهات الحكومية وشبه الحكومية",
    text: "بوابات وخدمات رقمية للمستفيدين ولوحات متابعة للقيادات، مصممة لتنسجم مع توجهات التحول الرقمي الحكومي ورؤية ٢٠٣٠.",
    wide: true,
  },
];

const securityServices = [
  {
    icon: VideoCamera,
    title: "كاميرات المراقبة",
    text: "تصميم وتركيب وصيانة، مع تنبيهات ذكية ومتابعة مباشرة من الجوال.",
  },
  {
    icon: LockKey,
    title: "التحكم في الدخول وغرف المراقبة",
    text: "أنظمة تحكم في الدخول وغرف مراقبة مركزية تجمع كل الكاميرات في شاشة واحدة.",
  },
];

const steps = [
  {
    title: "نفهم احتياجك",
    text: "نحدد معك المشكلة والهدف قبل أي تصميم.",
  },
  {
    title: "نصمم ونبني",
    text: "تراجع معنا التصميم ويُبنى النظام على مراحل واضحة.",
  },
  {
    title: "نختبر ونسلّم",
    text: "نجرّب كل شيء ونسلّمك النظام وهو يعمل فعلاً.",
  },
  {
    title: "ندعمك بعد التشغيل",
    text: "صيانة وتطوير ودعم فني كلما احتجت.",
  },
];

const toAr = (n) => String(n).replace(/\d/g, (d) => "٠١٢٣٤٥٦٧٨٩"[d]);

function SectionHeading({ id, children, intro, className = "" }) {
  return (
    <div className={className}>
      <h3
        id={id}
        className="font-heading text-2xl font-extrabold leading-snug text-ink md:text-3xl"
      >
        {children}
      </h3>
      {intro && (
        <p className="mt-2 max-w-xl text-sm leading-relaxed text-ink/70 md:text-base">
          {intro}
        </p>
      )}
    </div>
  );
}

function ServiceList({ items }) {
  return (
    <ul className="grid gap-x-8 gap-y-5 sm:grid-cols-2">
      {items.map(({ icon: Icon, title, text, wide }) => (
        <li
          key={title}
          className={`flex items-start gap-3.5 border-t border-ink/10 pt-4 ${
            wide ? "sm:col-span-2" : ""
          }`}
        >
          <Icon
            size={28}
            weight="duotone"
            className="mt-0.5 shrink-0 text-brand"
            aria-hidden="true"
          />
          <div>
            <h4 className="font-black leading-relaxed text-ink">{title}</h4>
            <p className="mt-1 text-sm leading-relaxed text-ink/70">{text}</p>
          </div>
        </li>
      ))}
    </ul>
  );
}

export default function AboutModal({ open, onClose }) {
  const panelRef = useRef(null);
  const closeRef = useRef(null);
  const onCloseRef = useRef(onClose);

  useEffect(() => {
    onCloseRef.current = onClose;
  });

  useEffect(() => {
    if (!open) return;

    const previouslyFocused = document.activeElement;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();

    const onKey = (e) => {
      if (e.key === "Escape") {
        onCloseRef.current();
        return;
      }
      if (e.key !== "Tab" || !panelRef.current) return;

      // حبس الـ Tab جوه النافذة
      const focusable = panelRef.current.querySelectorAll(
        "a[href], button:not([disabled])"
      );
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = previousOverflow;
      previouslyFocused?.focus?.();
    };
  }, [open]);

  if (!open) return null;

  // Portal على الـ body: عشان تطلع فوق الـ Navbar والصور حتى لو الأب عليه isolate
  return createPortal(
    <div
      className="fixed inset-0 z-[99] flex items-end justify-center bg-brand-dark/80 backdrop-blur-sm md:items-center md:p-6"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="about-title"
      dir="rtl"
    >
      <div
        ref={panelRef}
        onClick={(e) => e.stopPropagation()}
        className="relative h-[100dvh] w-full max-w-6xl overflow-hidden bg-paper shadow-2xl motion-safe:animate-fadeIn md:h-[min(780px,90vh)] md:rounded-xl2"
      >
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          aria-label="إغلاق"
          className="absolute left-4 top-4 z-10 grid size-10 place-items-center rounded-full bg-sand text-brand-dark outline-none transition-colors hover:bg-white focus-visible:ring-2 focus-visible:ring-brand-dark"
        >
          <X size={18} weight="bold" aria-hidden="true" />
        </button>

        <div className="no-scrollbar h-full overflow-y-auto lg:grid lg:grid-cols-[0.8fr_1.25fr] lg:overflow-hidden">
          {/* الهوية */}
          <aside
            className="relative flex flex-col bg-brand-dark px-6 pb-10 pt-8 text-white md:px-10 md:pt-10 lg:h-full lg:overflow-y-auto lg:py-12"
            style={LATTICE}
          >
            <Image
              src="/logo.webp"
              alt=""
              width={40}
              height={40}
              className="size-10 object-contain"
            />

            <h2
              id="about-title"
              className="mt-8 font-heading text-3xl font-extrabold leading-[1.3] md:text-4xl lg:mt-14"
            >
              رقميات لتقنية المعلومات
            </h2>

            <p className="mt-5 max-w-md leading-loose text-white/75">
              شركة سعودية متخصصة في بناء البرمجيات والأنظمة المؤسسية، وتضيف
              إليها خبرة الأنظمة الأمنية والمراقبة، لتحصل على حل متكامل من
              مصدر واحد، من الفكرة حتى التشغيل والدعم.
            </p>

            <ul className="mt-8 space-y-3.5 border-t border-white/15 pt-6 lg:mt-auto">
              {highlights.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-3 text-sm font-bold leading-relaxed text-white/90"
                >
                  <Check
                    size={16}
                    weight="bold"
                    className="mt-1 shrink-0 text-sand"
                    aria-hidden="true"
                  />
                  {item}
                </li>
              ))}
            </ul>
          </aside>

          {/* الخدمات */}
          <div className="no-scrollbar px-6 py-10 md:px-10 md:py-12 lg:h-full lg:overflow-y-auto">
            {/* لمن نبني */}
            <SectionHeading
              intro="سواء كنت منشأة صغيرة أو شركة كبيرة أو جهة حكومية، نبني لك النظام المناسب لحجم عملك وطبيعته."
            >
              نبني لكل جهة تحتاج حلاً تقنياً
            </SectionHeading>
            <ul className="mt-6 grid gap-3 sm:grid-cols-3">
              {audiences.map(({ icon: Icon, title, text }) => (
                <li
                  key={title}
                  className="rounded-2xl border border-ink/10 bg-white/60 p-4"
                >
                  <Icon
                    size={26}
                    weight="duotone"
                    className="text-brand"
                    aria-hidden="true"
                  />
                  <h4 className="mt-3 font-black leading-relaxed text-ink">
                    {title}
                  </h4>
                  <p className="mt-1 text-sm leading-relaxed text-ink/70">
                    {text}
                  </p>
                </li>
              ))}
            </ul>

            {/* البرمجيات */}
            <SectionHeading
              className="mt-12"
              intro="كل ما تحتاجه منشأتك لتعمل رقمياً، من موقع بسيط إلى منظومة متكاملة تدير بها أعمالك."
            >
              برمجيات وأنظمة لإدارة أعمالك
            </SectionHeading>
            <div className="mt-6">
              <ServiceList items={softwareServices} />
            </div>

            {/* الميزة المحلية */}
            <SectionHeading
              className="mt-12"
              intro="نفهم المتطلبات المحلية من اليوم الأول، فنصمم نظامك بما يسهّل عليك الالتزام بها دون تعقيد."
            >
              جاهزون للسوق السعودي
            </SectionHeading>
            <div className="mt-6">
              <ServiceList items={saudiReadyServices} />
            </div>

            {/* الأمن */}
            <SectionHeading className="mt-12">
              أمن ومراقبة لمنشأتك
            </SectionHeading>
            <div className="mt-6">
              <ServiceList items={securityServices} />
            </div>

            {/* طريقة العمل */}
            <SectionHeading className="mt-12">كيف نعمل معك</SectionHeading>
            <ol className="mt-6 grid gap-x-6 gap-y-6 sm:grid-cols-2">
              {steps.map((step, i) => (
                <li key={step.title} className="flex items-start gap-3.5">
                  <span
                    aria-hidden="true"
                    className="font-heading text-3xl font-extrabold leading-none text-brand"
                  >
                    {toAr(i + 1)}
                  </span>
                  <div>
                    <h4 className="font-black leading-relaxed text-ink">
                      {step.title}
                    </h4>
                    <p className="mt-1 text-sm leading-relaxed text-ink/70">
                      {step.text}
                    </p>
                  </div>
                </li>
              ))}
            </ol>

            <div className="mt-12 flex flex-wrap items-center gap-x-5 gap-y-3 rounded-2xl bg-brand-dark px-6 py-6 text-white">
              <Link
                href="/#contact"
                onClick={onClose}
                className="inline-flex items-center justify-center rounded-full bg-sand px-8 py-3.5 text-sm font-black text-brand-dark outline-none transition-colors duration-300 hover:bg-white focus-visible:ring-2 focus-visible:ring-white"
              >
                ناقش مشروعك معنا
              </Link>
              <span className="text-sm leading-relaxed text-white/75">
                شركة أو جهة حكومية، اشرح لنا احتياجك ولنبدأ من الحل المناسب.
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}