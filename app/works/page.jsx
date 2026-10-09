//app/works/page.jsx
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WorksLedger from "@/components/WorksLedger";
import { SITE_URL, SITE_NAME } from "@/lib/site";
import { works } from "@/lib/works";

// @next-codemod-ignore Cache Components adoption: this segment temporarily allows blocking.
// Remove this opt-out after verifying the segment passes validation without it.
// See: https://nextjs.org/docs/app/guides/migrating-to-cache-components
export const instant = false;

export const metadata = {
  title: "أعمالنا: متاجر وتطبيقات وأنظمة مراقبة وأعمال",
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
    images: works[0]?.image ? [{ url: works[0].image, width: 1600, height: 1000 }] : undefined,
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
          item: {
            "@type": "CreativeWork",
            name: w.title,
            description: w.problem,
            ...(w.image ? { image: `${SITE_URL}${w.image}` } : {}),
            creator: { "@type": "Organization", name: SITE_NAME, url: SITE_URL },
          },
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