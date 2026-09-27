import Navbar from "@/components/Navbar";
import PageHero from "@/components/PageHero";
import FeatureGrid from "@/components/FeatureGrid";
import ProcessSteps from "@/components/ProcessSteps";
import Testimonial from "@/components/Testimonial";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";
import {
  ShieldAlert,
  Eye,
  FileCheck2,
  Siren,
  Lock,
  Users,
} from "lucide-react";

export const metadata = {
  title: "أنظمة الأمان | رقميات",
  description:
    "حماية شاملة لبياناتك وأنظمتك من التهديدات الرقمية بمعايير أمنية عالمية.",
};

const items = [
  {
    icon: ShieldAlert,
    title: "اختبار الاختراق",
    text: "فحص استباقي لأنظمتك وتطبيقاتك لاكتشاف الثغرات قبل استغلالها.",
  },
  {
    icon: Eye,
    title: "المراقبة الأمنية المستمرة (SOC)",
    text: "رصد وتحليل التهديدات على مدار الساعة عبر مركز عمليات أمنية متكامل.",
  },
  {
    icon: FileCheck2,
    title: "الامتثال والحوكمة",
    text: "مواءمة أنظمتك مع المعايير السعودية والعالمية مثل NCA وISO 27001.",
  },
  {
    icon: Siren,
    title: "الاستجابة للحوادث",
    text: "فريق جاهز للتحرك الفوري عند وقوع أي اختراق لاحتواء الضرر بسرعة.",
  },
  {
    icon: Lock,
    title: "حماية وتشفير البيانات",
    text: "تطبيق أعلى بروتوكولات التشفير لحماية بياناتك أثناء التخزين والنقل.",
  },
  {
    icon: Users,
    title: "التوعية الأمنية للموظفين",
    text: "برامج تدريبية لرفع وعي فريقك وتقليل مخاطر الهندسة الاجتماعية.",
  },
];

export default function SecurityPage() {
  return (
    <main className="bg-paper">
      <Navbar />
      <PageHero
        eyebrow="أنظمة الأمان"
        title="أمن بياناتك مسؤوليتنا الأولى"
        subtitle="أنظمة حماية سيبرانية متقدمة تضمن سلامة أصولك الرقمية على مدار الساعة بمعايير عالمية."
        gradient="bg-gradient-to-br from-emerald-950 via-brand-dark to-brand"
      />
      <FeatureGrid
        title="خدمات الأمن السيبراني"
        subtitle="حماية متكاملة تغطي كل طبقات بنيتك التقنية، من الأنظمة إلى الأفراد."
        items={items}
      />
      <ProcessSteps />
      <Testimonial />
      <CTASection />
      <Footer />
    </main>
  );
}
