import Navbar from "@/components/Navbar";
import SecurityIntro from "@/components/SecurityIntro";
import SiteMonitoring from "@/components/SiteMonitoring";
import SurveillanceFeatures from "@/components/SurveillanceFeatures";
import BeforeAfterCompare from "@/components/BeforeAfterCompare";
import SecurityServices from "@/components/SecurityServices";
import ProcessSteps from "@/components/ProcessSteps";
import Testimonial from "@/components/Testimonial";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";
import {
  Video,
  BellRing,
  Smartphone,
  CloudUpload,
  Wrench,
  HeadphonesIcon,
} from "lucide-react";

export const metadata = {
  title: "أنظمة كاميرات المراقبة | رقميات",
  description:
    "تركيب وصيانة أنظمة كاميرات مراقبة متطورة بتقنية الذكاء الاصطناعي لحماية منشآتك على مدار الساعة.",
};

const items = [
  {
    icon: Video,
    title: "توريد وتركيب الكاميرات",
    text: "اختيار وتركيب كاميرات عالية الدقة (4K) تناسب طبيعة موقعك الداخلي والخارجي.",
  },
  {
    icon: BellRing,
    title: "التنبيهات الذكية",
    text: "إشعارات فورية على هاتفك عند رصد حركة أو شخص غير معتاد في الموقع.",
  },
  {
    icon: Smartphone,
    title: "المتابعة عبر الجوال",
    text: "تطبيق مخصص يتيح لك مشاهدة كل الكاميرات مباشرة من أي مكان وفي أي وقت.",
  },
  {
    icon: CloudUpload,
    title: "التخزين السحابي",
    text: "نسخ احتياطي تلقائي للتسجيلات على السحابة، بحفظ آمن لأي مدة تحتاجها.",
  },
  {
    icon: Wrench,
    title: "الصيانة الدورية",
    text: "فحص وصيانة منتظمة لضمان عمل كل كاميرا بأعلى كفاءة طوال الوقت.",
  },
  {
    icon: HeadphonesIcon,
    title: "دعم فني على مدار الساعة",
    text: "فريق جاهز للرد على أي عطل أو استفسار فور حدوثه، ليل نهار.",
  },
];

export default function SecurityPage() {
  return (
    <main className="bg-paper">
      <Navbar />
      <SecurityIntro
        title="عين ساهرة على منشأتك، ٢٤ ساعة"
        subtitle="أنظمة كاميرات مراقبة متطورة بتقنية الذكاء الاصطناعي، تركيب احترافي ومتابعة مستمرة تضمن أمان موقعك."
        image="/security/intro.png"
      />
      <SiteMonitoring
        images={[
          "/security/cam-entrance.png",
          "/security/cam-parking.png",
          "/security/cam-lobby.png",
          "/security/cam-warehouse.png",
        ]}
        locations={["المدخل الرئيسي", "موقف السيارات", "الردهة", "المخازن"]}
      />
      <SurveillanceFeatures />
      <BeforeAfterCompare
        beforeImage="/security/compare-before.png"
        afterImage="/security/compare-after.png"
      />
      <SecurityServices
        title="خدماتنا في أنظمة المراقبة"
        subtitle="من التركيب إلى الصيانة، نغطي كل احتياجاتك في حماية موقعك بالكاميرات."
        items={items}
      />
      <ProcessSteps />
      <Testimonial />
      <CTASection />
      <Footer />
    </main>
  );
}