//app/works/page.jsx
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WorksLedger from "@/components/WorksLedger";
import { SITE_URL } from "@/lib/site";

export const metadata = {
  title: "أعمالنا",
  description:
    "سجل أعمال رقميات. نوثّق كل مشروع بعد تسليمه: المشكلة، وما بنيناه، وما تغيّر بعد الإطلاق.",
  alternates: { canonical: "/works" },
  openGraph: {
    type: "website",
    locale: "ar_SA",
    siteName: "رقميات",
    title: "أعمالنا | رقميات",
    description:
      "سجل أعمال رقميات. نوثّق كل مشروع بعد تسليمه وقياس نتيجته.",
    url: `${SITE_URL}/works`,
  },
};

export default function WorksPage() {
  return (
    <main className="bg-paper">
      <Navbar />
      <WorksLedger />
      <Footer />
    </main>
  );
}