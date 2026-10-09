//app/software/page.js
import Navbar from "@/components/Navbar";
import PageHero from "@/components/PageHero";
import TechStack from "@/components/TechStack";
import FeatureGrid from "@/components/FeatureGrid";
import StatsBand from "@/components/StatsBand";
import Principles from "@/components/Principles";
import ProcessSteps from "@/components/ProcessSteps";
import ProjectPlanner from "@/components/ProjectPlanner";
import Testimonial from "@/components/Testimonial";
import Faq from "@/components/Faq";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";
import {
  Globe,
  Smartphone,
  ShoppingCart,
  Boxes,
  BarChart3,
  Plug,
} from "lucide-react";
import { SOFTWARE_URL } from "@/lib/site";

export const metadata = {
  title: "الحلول البرمجية",
  description:
    "نطور تطبيقات ويب وموبايل، متاجر إلكترونية، وأنظمة مؤسسية مخصصة بأحدث التقنيات.",
  keywords: [
    "تطوير برمجيات",
    "شركة برمجة في الرياض",
    "تطوير تطبيقات الجوال",
    "أنظمة ERP",
    "متاجر إلكترونية",
  ],
  alternates: { canonical: SOFTWARE_URL },
  openGraph: {
    type: "website",
    locale: "ar_SA",
    siteName: "رقميات",
    title: "الحلول البرمجية | رقميات",
    description: "تطبيقات ويب وموبايل ومتاجر إلكترونية وأنظمة مؤسسية مخصصة.",
    url: SOFTWARE_URL,
  },
};

const items = [
  {
    icon: Globe,
    title: "تطبيقات الويب",
    text: "منصات وأنظمة ويب مخصصة سريعة وقابلة للتوسع، مبنية بأحدث الأطر البرمجية.",
    details: {
      deliverables: [
        "واجهات تعمل بسلاسة على الجوال والحاسوب، بالعربية والإنجليزية",
        "حسابات مستخدمين بصلاحيات مختلفة ولوحة إدارة خاصة بك",
        "صفحات سريعة ومهيأة لمحركات البحث",
        "نشر المشروع على خادم مستقر مع نسخ احتياطي دوري",
      ],
      tech: ["Next.js", "React", "Node.js", "MongoDB", "Tailwind CSS"],
      duration: "من 4 إلى 12 أسبوعاً",
    },
  },
  {
    icon: Smartphone,
    title: "تطبيقات الموبايل",
    text: "تطبيقات iOS وAndroid بتجربة استخدام سلسة وأداء عالٍ لعملائك أينما كانوا.",
    details: {
      deliverables: [
        "تطبيق واحد يعمل على iOS وAndroid",
        "تصميم يحترم أسلوب كل منصة في التنقل والإيماءات",
        "إشعارات فورية وتسجيل دخول آمن",
        "رفع التطبيق على App Store وGoogle Play ومتابعة المراجعة",
      ],
      tech: ["React Native", "Expo", "Firebase"],
      duration: "من 6 إلى 14 أسبوعاً",
    },
  },
  {
    icon: ShoppingCart,
    title: "المتاجر الإلكترونية",
    text: "حلول تجارة إلكترونية متكاملة من بوابات الدفع حتى إدارة المخزون والشحن.",
    details: {
      deliverables: [
        "عرض المنتجات بمتغيراتها من مقاسات وألوان مع تتبع المخزون",
        "الدفع بالبطاقات والمحافظ الإلكترونية والدفع عند الاستلام",
        "ربط شركات الشحن ومتابعة كل طلب",
        "لوحة تتحكم منها بالطلبات والعملاء والخصومات",
      ],
      tech: ["Next.js", "MongoDB", "Stripe", "Paymob"],
      duration: "من 5 إلى 10 أسابيع",
    },
  },
  {
    icon: Boxes,
    title: "أنظمة تخطيط الموارد (ERP)",
    text: "أنظمة داخلية مخصصة لإدارة العمليات، المخزون، والموارد البشرية بكفاءة.",
    details: {
      deliverables: [
        "دراسة طريقة عملك الحالية قبل كتابة أي كود",
        "وحدات للمخزون والمبيعات والموارد البشرية حسب حاجتك",
        "صلاحيات لكل موظف وسجل بكل عملية تمت",
        "تقارير جاهزة تُصدَّر إلى Excel وPDF",
      ],
      tech: ["Node.js", "PostgreSQL", "React", "Docker"],
      duration: "من 3 إلى 6 أشهر",
    },
  },
  {
    icon: BarChart3,
    title: "لوحات التحكم وتحليل البيانات",
    text: "لوحات تحكم تفاعلية تحوّل بياناتك إلى قرارات عمل واضحة وسريعة.",
    details: {
      deliverables: [
        "الاتفاق معك على المؤشرات التي تهم قراراتك فعلاً",
        "رسوم بيانية تفاعلية تتحدّث من بياناتك مباشرة",
        "فلاتر بالتاريخ والفرع والمنتج، وتقارير قابلة للتصدير",
        "ربط بقواعد البيانات وملفات Excel وأنظمتك الحالية",
      ],
      tech: ["React", "Recharts", "Python", "SQL"],
      duration: "من 3 إلى 8 أسابيع",
    },
  },
  {
    icon: Plug,
    title: "تكامل الأنظمة والـ APIs",
    text: "ربط أنظمتك الحالية ببعضها أو بخدمات خارجية بأمان وسلاسة تامة.",
    details: {
      deliverables: [
        "ربط الأنظمة ببعضها بحيث لا تُدخل البيانات مرتين",
        "تكامل مع بوابات الدفع وواتساب وأنظمة إدارة العملاء",
        "توثيق كامل للـ APIs لفريقك",
        "مراقبة الأخطاء وإعادة المحاولة تلقائياً عند فشل الطلب",
      ],
      tech: ["REST", "GraphQL", "Webhooks", "OAuth"],
      duration: "من أسبوع إلى 4 أسابيع",
    },
  },
];

const stats = [
  { value: "+150", label: "مشروع منجز" },
  { value: "24/7", label: "دعم فني مستمر" },
  { value: "+80", label: "عميل راضٍ" },
  { value: "6+", label: "سنوات خبرة" },
];

export default function SoftwarePage() {
  return (
    <main className="bg-paper">
      <Navbar site="software" />
      <PageHero
        title="نبني برمجيات تنمو مع أعمالك"
        subtitle="من الفكرة إلى الإطلاق، نصمم وننفّذ حلولاً برمجية مخصصة بدقة هندسية وتجربة مستخدم استثنائية."
        screenshot="/screenshots/software-hero.webp"
      />
      <TechStack />
      <FeatureGrid
        title="خدماتنا البرمجية"
        subtitle="مجموعة متكاملة من الحلول التقنية المصممة خصيصاً لاحتياجات عملك."
        items={items}
      />
      <StatsBand stats={stats} />
      <Principles />
      <ProcessSteps />
      <ProjectPlanner />
      <Testimonial />
      <Faq />
      <CTASection />
      <Footer site="software" />
    </main>
  );
}
