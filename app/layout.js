import { El_Messiri, Rakkas } from "next/font/google";
import "./globals.css";

const elMessiri = El_Messiri({
  subsets: ["arabic"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-arabic",
  display: "swap",
});

const rakkas = Rakkas({
  subsets: ["arabic"],
  weight: "400",
  variable: "--font-arabic-heading",
  display: "swap",
});

const SITE_URL = "https://raqmiyat.com"; // غيّر ده لدومين موقعك الحقيقي بعد ما ينشر

const title = "رقميات | مستقبل البرمجيات برؤية سعودية";
const description =
  "نقدم حلولاً برمجية متطورة وخدمات أمنية متكاملة لدعم التحول الرقمي في المملكة.";

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title,
  description,
  icons: {
    icon: "/logo.png",
    shortcut: "/logo.png",
    apple: "/logo.png",
  },
  openGraph: {
    title,
    description,
    url: SITE_URL,
    siteName: "رقميات",
    images: [
      {
        url: "/logo.png",
        width: 1254,
        height: 1254,
        alt: "شعار رقميات",
      },
    ],
    locale: "ar_SA",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/logo.png"],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="ar" dir="rtl">
      <body
        className={`${elMessiri.variable} ${rakkas.variable} font-arabic antialiased`}
      >
        {children}
      </body>
    </html>
  );
}