//app/layout.js
import localFont from "next/font/local";
import "./globals.css";
import { ContactModalProvider } from "@/components/ContactModalProvider";
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
    icon: [{ url: "/logo.png", type: "image/png" }],
    shortcut: "/logo.png",
    apple: "/logo.png",
  },
  openGraph: {
    title,
    description,
    url: SITE_URL,
    siteName: SITE_NAME,
    images: [
      {
        url: "/logo.png",
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
    images: ["/logo.png"],
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="ar"
      dir="rtl"
      className={`${elMessiri.variable} ${rakkas.variable}`}
    >
      <body className="font-arabic antialiased">
        <ContactModalProvider>{children}</ContactModalProvider>
      </body>
    </html>
  );
}