"use client";

import { useCallback, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { MapPin, Phone, Mail, Instagram, Linkedin, HelpCircle } from "lucide-react";
import AboutModal from "@/components/AboutModal";

// action: "about" يفتح مودال من نحن، وغير كده href عادي
const quickLinks = [
  { label: "من نحن", action: "about" },
  { label: "أعمالنا", href: "/works" },
  { label: "المدونة التقنية", href: "/blog" },
  { label: "تواصل معنا", href: "/#contact" },
];

const services = [
  { label: "تطوير البرمجيات", href: "/software" },
  { label: "الأمن السيبراني", href: "/security" },
  { label: "تحليل البيانات", href: "/" },
  { label: "الحوسبة السحابية", href: "/" },
];

const socials = [
  { icon: Instagram, href: "#", label: "انستجرام" },
  { icon: Linkedin, href: "#", label: "لينكدإن" },
  { icon: HelpCircle, href: "/#contact", label: "المساعدة" },
];

export default function Footer() {
  const [aboutOpen, setAboutOpen] = useState(false);
  const closeAbout = useCallback(() => setAboutOpen(false), []);

  return (
    <footer className="pt-14 pb-8 bg-white">
      <div className="container-x grid grid-cols-1 md:grid-cols-4 gap-10 pb-6 text-sm">
        <div>
          <h4 className="font-black text-ink mb-5">المقر الرئيسي</h4>
          <ul className="space-y-4 text-ink/60">
            <li className="flex items-center gap-3">
              <span className="w-8 h-8 rounded-lg bg-brand-soft flex items-center justify-center shrink-0">
                <MapPin size={15} className="text-brand" />
              </span>
              الرياض، المملكة العربية السعودية
            </li>
            <li className="flex items-center gap-3">
              <span className="w-8 h-8 rounded-lg bg-brand-soft flex items-center justify-center shrink-0">
                <Phone size={15} className="text-brand" />
              </span>
              <a href="tel:+966501053303" dir="ltr" className="hover:text-brand transition-colors">
                +966 50 105 3303
              </a>
            </li>
            <li className="flex items-center gap-3">
              <span className="w-8 h-8 rounded-lg bg-brand-soft flex items-center justify-center shrink-0">
                <Mail size={15} className="text-brand" />
              </span>
              <a href="mailto:raqmyat@raqmyat.com" className="hover:text-brand transition-colors">
                raqmyat@raqmyat.com
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="font-black text-ink mb-5">روابط سريعة</h4>
          <ul className="space-y-3 text-ink/60">
            {quickLinks.map(({ label, href, action }) => (
              <li key={label}>
                {action === "about" ? (
                  <button
                    type="button"
                    onClick={() => setAboutOpen(true)}
                    className="hover:text-brand transition-colors"
                  >
                    {label}
                  </button>
                ) : (
                  <Link href={href} className="hover:text-brand transition-colors">
                    {label}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-black text-ink mb-5">الخدمات</h4>
          <ul className="space-y-3 text-ink/60">
            {services.map(({ label, href }) => (
              <li key={label}>
                <Link href={href} className="hover:text-brand transition-colors">
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <Link href="/" className="flex items-center gap-2.5 mb-4">
            <Image
              src="/raqmiyat.png"
              alt="شعار رقميات"
              width={32}
              height={32}
              className="rounded-lg object-contain"
            />
            <span className="font-heading text-2xl text-brand">رقميات</span>
          </Link>
          <p className="text-ink/60 leading-relaxed mb-5">
            نحن شريككم الموثوق في رحلة التحول الرقمي، نقدم حلولاً برمجية
            وأمنية تتجاوز التوقعات وتدعم رؤية المملكة 2030.
          </p>
          <div className="flex gap-3">
            {socials.map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                className="w-9 h-9 rounded-full border border-ink/15 flex items-center justify-center hover:bg-brand hover:border-brand hover:text-white transition-colors"
              >
                <Icon size={16} />
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="container-x flex flex-col md:flex-row items-center justify-between mt-14 pt-6 border-t border-ink/10 text-xs text-ink/50 gap-3">
        <span>© 2026 شركة رقميات للحلول التقنية. جميع الحقوق محفوظة.</span>
        <div className="flex gap-6">
          <Link href="/" className="hover:text-brand transition-colors">
            سياسة الخصوصية
          </Link>
          <Link href="/" className="hover:text-brand transition-colors">
            شروط الخدمة
          </Link>
        </div>
      </div>

      <AboutModal open={aboutOpen} onClose={closeAbout} />
    </footer>
  );
}