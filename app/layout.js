// app/layout.js
import localFont from "next/font/local";
import "./globals.css";
import { ContactModalProvider } from "@/components/ContactModalProvider";
import PageTransition from "@/components/PageTransition";
import SiteLoader from "@/components/SiteLoader";
import { ARRIVAL_CSS, ARRIVAL_SCRIPT } from "@/lib/arrival";
import { SITE_URL, SITE_NAME } from "@/lib/site";

// خط متغيّر: كل الأوزان من 400 لـ 700 في ملف واحد (عربي + لاتيني)
const elMessiri = localFont({
  src: "./fonts/El_Messiri,Rakkas/ElMessiri-VariableFont_wght.ttf",
  weight: "400 700",
  variable: "--font-arabic",
  display: "swap",
});

// وزن واحد (400) للعناوين
const rakkas = localFont({
  src: "./fonts/Rakkas/Rakkas-Regular.ttf",
  weight: "400",
  variable: "--font-arabic-heading",
  display: "swap",
});

const title = "رقميات | مستقبل البرمجيات برؤية سعودية";
const description =
  "نقدم حلولاً برمجية متطورة وخدمات أمنية متكاملة لدعم التحول الرقمي في المملكة.";

export const metadata = {
  metadataBase: new URL(SITE_URL),
  // الصفحات الداخلية بتكتب عنوانها بس، والـ template بيضيف اسم الموقع
  title: {
    default: title,
    template: `%s | ${SITE_NAME}`,
  },
  description,
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: [{ url: "/logo.webp", type: "image/webp" }],
    shortcut: "/logo.webp",
    apple: "/logo.webp",
  },
  openGraph: {
    title,
    description,
    url: SITE_URL,
    siteName: SITE_NAME,
    images: [
      {
        url: "/logo.webp",
        width: 512,
        height: 512,
        alt: "شعار رقميات",
      },
    ],
    locale: "ar_SA",
    type: "website",
  },
  twitter: {
    card: "summary",
    title,
    description,
    images: ["/logo.webp"],
  },
};

export default function RootLayout({ children }) {
  return (
    // suppressHydrationWarning: سكريبت الوصول بيضيف attribute على <html> قبل الـ hydration
    <html
      lang="ar"
      dir="rtl"
      suppressHydrationWarning
      className={`${elMessiri.variable} ${rakkas.variable}`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: ARRIVAL_SCRIPT }} />
        <style dangerouslySetInnerHTML={{ __html: ARRIVAL_CSS }} />
      </head>
      <body className="font-arabic antialiased">
        {/* لو الـ JS مقفول، نخفي اللودر عشان الموقع ما يفضلش محجوب */}
        <noscript>
          <style>{`#site-loader{display:none!important}`}</style>
        </noscript>

        <SiteLoader />

        <ContactModalProvider>
          {children}
          <PageTransition />
        </ContactModalProvider>
      </body>
    </html>
  );
}