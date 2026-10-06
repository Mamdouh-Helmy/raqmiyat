//app/works/page.jsx
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WorksLedger from "@/components/WorksLedger";
import { SITE_URL, SITE_NAME } from "@/lib/site";
import { works } from "@/lib/works";

export const metadata = {
  title: "أعمالنا",
  description:
    "سجل أعمال رقميات. نوثّق كل مشروع بعد تسليمه: المشكلة، وما بنيناه، وما تغيّر بعد الإطلاق.",
  alternates: { canonical: "/works" },
  openGraph: {
    type: "website",
    locale: "ar_SA",
    siteName: SITE_NAME,
    title: "أعمالنا | رقميات",
    description: "سجل أعمال رقميات. نوثّق كل مشروع بعد تسليمه وقياس نتيجته.",
    url: `${SITE_URL}/works`,
  },
};

export default function WorksPage() {
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      name: "أعمالنا",
      url: `${SITE_URL}/works`,
      inLanguage: "ar",
      isPartOf: { "@type": "WebSite", name: SITE_NAME, url: SITE_URL },
      mainEntity: {
        "@type": "ItemList",
        itemListElement: works.map((w, i) => ({
          "@type": "ListItem",
          position: i + 1,
          name: w.title,
        })),
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "الرئيسية", item: SITE_URL },
        { "@type": "ListItem", position: 2, name: "أعمالنا", item: `${SITE_URL}/works` },
      ],
    },
  ];

  return (
    <main className="bg-paper">
      <Navbar />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <WorksLedger />
      <Footer />
    </main>
  );
}