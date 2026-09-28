import { El_Messiri, Rakkas } from "next/font/google";
import "./globals.css";
import { ContactModalProvider } from "@/components/ContactModalProvider";

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

const SITE_URL = "https://www.rqmyat.sa";

const title = "رقميات | مستقبل البرمجيات برؤية سعودية";
const description =
  "نقدم حلولاً برمجية متطورة وخدمات أمنية متكاملة لدعم التحول الرقمي في المملكة.";

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title,
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
    siteName: "رقميات",
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
    <html lang="ar" dir="rtl">
      <body
        className={`${elMessiri.variable} ${rakkas.variable} font-arabic antialiased`}
      >
        <ContactModalProvider>{children}</ContactModalProvider>
      </body>
    </html>
  );
}