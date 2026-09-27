import Navbar from "@/components/Navbar";
import PageHero from "@/components/PageHero";
import FeatureGrid from "@/components/FeatureGrid";
import ProcessSteps from "@/components/ProcessSteps";
import Testimonial from "@/components/Testimonial";
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

export const metadata = {
  title: "الحلول البرمجية | رقميات",
  description:
    "نطور تطبيقات ويب وموبايل، متاجر إلكترونية، وأنظمة مؤسسية مخصصة بأحدث التقنيات.",
};

const items = [
  {
    icon: Globe,
    title: "تطبيقات الويب",
    text: "منصات وأنظمة ويب مخصصة سريعة وقابلة للتوسع، مبنية بأحدث الأطر البرمجية.",
  },
  {
    icon: Smartphone,
    title: "تطبيقات الموبايل",
    text: "تطبيقات iOS وAndroid بتجربة استخدام سلسة وأداء عالٍ لعملائك أينما كانوا.",
  },
  {
    icon: ShoppingCart,
    title: "المتاجر الإلكترونية",
    text: "حلول تجارة إلكترونية متكاملة من بوابات الدفع حتى إدارة المخزون والشحن.",
  },
  {
    icon: Boxes,
    title: "أنظمة تخطيط الموارد (ERP)",
    text: "أنظمة داخلية مخصصة لإدارة العمليات، المخزون، والموارد البشرية بكفاءة.",
  },
  {
    icon: BarChart3,
    title: "لوحات التحكم وتحليل البيانات",
    text: "لوحات تحكم تفاعلية تحوّل بياناتك إلى قرارات عمل واضحة وسريعة.",
  },
  {
    icon: Plug,
    title: "تكامل الأنظمة والـ APIs",
    text: "ربط أنظمتك الحالية ببعضها أو بخدمات خارجية بأمان وسلاسة تامة.",
  },
];

export default function SoftwarePage() {
  return (
    <main className="bg-paper">
      <Navbar />
      <PageHero
        eyebrow="الحلول البرمجية"
        title="نبني برمجيات تنمو مع أعمالك"
        subtitle="من الفكرة إلى الإطلاق، نصمم وننفّذ حلولاً برمجية مخصصة بدقة هندسية وتجربة مستخدم استثنائية."
        gradient="bg-gradient-to-br from-brand-dark via-brand to-emerald-700"
      />
      <FeatureGrid
        title="خدماتنا البرمجية"
        subtitle="مجموعة متكاملة من الحلول التقنية المصممة خصيصاً لاحتياجات عملك."
        items={items}
      />
      <ProcessSteps />
      <Testimonial />
      <CTASection />
      <Footer />
    </main>
  );
}
