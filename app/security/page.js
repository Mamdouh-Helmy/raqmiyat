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

export const metadata = {
  title: "أنظمة كاميرات المراقبة | رقميات",
  description:
    "تركيب وصيانة أنظمة كاميرات مراقبة متطورة بتقنية الذكاء الاصطناعي لحماية منشآتك على مدار الساعة.",
};

// icon هنا اسم (string) مش كومبوننت — SecurityServices بيحوله للأيقونة الفعلية
// الأرقام في stats تقديرية، عدّلها حسب مواصفاتكم الفعلية
const items = [
  {
    icon: "video",
    title: "توريد وتركيب الكاميرات",
    text: "اختيار وتركيب كاميرات عالية الدقة (4K) تناسب طبيعة موقعك الداخلي والخارجي.",
    image: "/security/services/installation.png",
    intro:
      "نبدأ بمعاينة الموقع بأنفسنا: نمشي المكان ونحدد النقاط العمياء، ثم نختار عدد الكاميرات وأنواعها على هذا الأساس، لا العكس.",
    stats: [
      { value: "4K", label: "دقة الصورة" },
      { value: "IP66", label: "مقاومة الماء والغبار" },
      { value: "٣٠م", label: "مدى الرؤية الليلية" },
    ],
    features: [
      {
        title: "معاينة قبل عرض السعر",
        text: "نزور الموقع ونرسم خريطة التغطية، فتعرف من البداية ما الذي ستراه كل كاميرا.",
      },
      {
        title: "كاميرات تناسب المكان",
        text: "داخلية للردهات والمكاتب، وخارجية مقاومة للطقس للمداخل والمواقف والأسوار.",
      },
      {
        title: "تمديد مرتب",
        text: "الكابلات مخفية ومثبتة بعناية، ولا تترك أثراً على شكل المكان بعد التركيب.",
      },
      {
        title: "تسليم بعد اختبار",
        text: "نجرّب كل كاميرا ليلاً ونهاراً قبل التسليم، ونسلّمك النظام وهو يعمل فعلاً.",
      },
    ],
  },
  {
    icon: "bell",
    title: "التنبيهات الذكية",
    text: "إشعارات فورية على هاتفك عند رصد حركة أو شخص غير معتاد في الموقع.",
    image: "/security/services/smart-alerts.png",
    intro:
      "بدل أن تراجع ساعات من التسجيل، يصلك تنبيه واحد فقط عندما يحدث شيء يستحق انتباهك.",
    stats: [
      { value: "٥ ث", label: "متوسط وصول التنبيه" },
      { value: "٣", label: "أنواع تصنيف الحركة" },
      { value: "٢٤/٧", label: "رصد متواصل" },
    ],
    features: [
      {
        title: "يفرّق بين الشخص والسيارة والحيوان",
        text: "لا يصلك تنبيه لأن قطة عبرت الموقف.",
      },
      {
        title: "مناطق حساسة تحددها أنت",
        text: "حدّد على الشاشة المنطقة التي تهمك كالبوابة أو المخزن، ويتجاهل النظام ما عداها.",
      },
      {
        title: "مقطع قصير مع كل تنبيه",
        text: "تعرف ما حدث من التنبيه نفسه، دون الحاجة لفتح التسجيلات والبحث فيها.",
      },
      {
        title: "إنذارات كاذبة أقل",
        text: "لا تزعجك حركة الأشجار أو الظلال أو تغيّر الإضاءة.",
      },
    ],
  },
  {
    icon: "smartphone",
    title: "المتابعة عبر الجوال",
    text: "تطبيق مخصص يتيح لك مشاهدة كل الكاميرات مباشرة من أي مكان وفي أي وقت.",
    image: "/security/services/mobile-app.png",
    intro:
      "كل كاميراتك في شاشة واحدة، سواء كنت في المكتب أو في سفر.",
    stats: [
      { value: "١", label: "تطبيق لكل الكاميرات" },
      { value: "٢", label: "iOS وAndroid" },
      { value: "HD", label: "بث يتكيف مع الاتصال" },
    ],
    features: [
      {
        title: "بث مباشر",
        text: "شاهد أي كاميرا لحظياً، أو اعرض عدة كاميرات معاً في شاشة واحدة.",
      },
      {
        title: "الرجوع للتسجيلات",
        text: "اختر اليوم والساعة وستصل مباشرة إلى اللحظة التي تبحث عنها.",
      },
      {
        title: "صلاحيات لكل شخص",
        text: "أضف مدير الموقع أو الحارس، وحدد لكل منهم ما يراه وما لا يراه.",
      },
      {
        title: "لقطة ومشاركة",
        text: "احفظ صورة أو مقطعاً من التطبيق وأرسله لمن تريد.",
      },
    ],
  },
  {
    icon: "cloud",
    title: "التخزين السحابي",
    text: "نسخ احتياطي تلقائي للتسجيلات على السحابة، بحفظ آمن لأي مدة تحتاجها.",
    image: "/security/services/cloud-storage.png",
    intro:
      "جهاز التسجيل في الموقع قد يتعطل أو يُسرق. النسخة السحابية تبقى محفوظة في مكان آخر.",
    stats: [
      { value: "AES-256", label: "تشفير التسجيلات" },
      { value: "٩٠+", label: "يوماً مدة حفظ ممكنة" },
      { value: "٢٤/٧", label: "وصول من أي مكان" },
    ],
    features: [
      {
        title: "نسخ تلقائي",
        text: "يُرفع التسجيل باستمرار دون أن تتدخل.",
      },
      {
        title: "محفوظ حتى لو سُرق الجهاز",
        text: "الأدلة تبقى موجودة حتى لو تعطّل جهاز التسجيل في الموقع.",
      },
      {
        title: "تشفير كامل",
        text: "التسجيلات مشفّرة أثناء الرفع وفي التخزين، ولا يفتحها غيرك.",
      },
      {
        title: "مدة تحددها أنت",
        text: "من أسبوع إلى عدة أشهر بحسب احتياجك وميزانيتك.",
      },
    ],
  },
  {
    icon: "wrench",
    title: "الصيانة الدورية",
    text: "فحص وصيانة منتظمة لضمان عمل كل كاميرا بأعلى كفاءة طوال الوقت.",
    image: "/security/services/maintenance.png",
    intro:
      "النظام الذي لا يُفحص قد يكون متوقفاً منذ أسابيع دون أن تعلم. الزيارات الدورية تمنع ذلك.",
    stats: [
      { value: "٤", label: "زيارات فحص في السنة" },
      { value: "٤٨", label: "ساعة لاستبدال التالف" },
      { value: "١", label: "تقرير بعد كل زيارة" },
    ],
    features: [
      {
        title: "فحص مجدول",
        text: "نزور الموقع في مواعيد ثابتة ونفحص الكاميرات والأجهزة والكابلات.",
      },
      {
        title: "عدسات نظيفة",
        text: "الغبار والمطر يُضعفان الصورة، فننظّف العدسات الخارجية في كل زيارة.",
      },
      {
        title: "تحديث البرمجيات",
        text: "نحدّث النظام بانتظام لسدّ الثغرات وتحسين الأداء.",
      },
      {
        title: "تقرير بعد كل زيارة",
        text: "تعرف حالة كل كاميرا، وما تم إصلاحه، وما يحتاج قراراً منك.",
      },
    ],
  },
  {
    icon: "headphones",
    title: "دعم فني على مدار الساعة",
    text: "فريق جاهز للرد على أي عطل أو استفسار فور حدوثه، ليل نهار.",
    image: "/security/services/support.png",
    intro:
      "الأعطال لا تنتظر ساعات الدوام. فريقنا موجود حين تحتاجه، ليلاً أو نهاراً.",
    stats: [
      { value: "٢٤/٧", label: "خط دعم متواصل" },
      { value: "٣", label: "قنوات تواصل" },
      { value: "٣٠ د", label: "متوسط الرد الأول" },
    ],
    features: [
      {
        title: "تشخيص عن بُعد",
        text: "نحل أغلب الأعطال دون زيارة، عبر الاتصال بنظامك مباشرة.",
      },
      {
        title: "أولوية للحالات الحرجة",
        text: "توقّف كاميرا المدخل الرئيسي يختلف عن عطل بسيط، ونتعامل معه على هذا الأساس.",
      },
      {
        title: "قناتك المفضلة",
        text: "اتصال هاتفي، أو رسالة واتساب، أو من داخل التطبيق.",
      },
      {
        title: "متابعة بعد الإصلاح",
        text: "نتأكد أن كل شيء عاد يعمل، ثم نغلق البلاغ.",
      },
    ],
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