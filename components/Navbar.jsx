"use client";

import Link from "next/link";
import Image from "next/image";
import { ChevronDown, Menu, X } from "lucide-react";
import { useState } from "react";
import { useContactModal } from "./ContactModalProvider";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const { openContactModal } = useContactModal();

  function handleRequestClick() {
    document
      .getElementById("cta-section")
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
    openContactModal("استشارة مجانية");
  }

  function handleMobileRequestClick() {
    setIsOpen(false);
    handleRequestClick();
  }

  return (
    <header className="container-x pt-6 relative z-50">
      <nav className="flex items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2.5"
          onClick={() => setIsOpen(false)}
        >
          <Image
            src="/raqmiyat.png"
            alt="شعار رقميات"
            width={36}
            height={36}
            className="rounded-lg object-contain"
            priority
          />

          <span className="font-heading text-3xl text-brand">
            رقميات
          </span>
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden md:flex items-center gap-8 text-sm text-ink/70 font-medium">
          <li>
            <Link
              href="/"
              className="hover:text-brand transition-colors"
            >
              الرئيسية
            </Link>
          </li>

          <li className="relative group">
            <button className="flex items-center gap-1 hover:text-brand transition-colors">
              الخدمات
              <ChevronDown size={14} />
            </button>

            <div className="absolute top-full right-0 pt-3 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50">
              <div className="bg-white rounded-xl shadow-xl border border-ink/5 p-2 w-52">
                <Link
                  href="/software"
                  className="block px-4 py-2.5 rounded-lg hover:bg-brand-soft text-ink/80 hover:text-brand text-sm transition-colors"
                >
                  الحلول البرمجية
                </Link>

                <Link
                  href="/security"
                  className="block px-4 py-2.5 rounded-lg hover:bg-brand-soft text-ink/80 hover:text-brand text-sm transition-colors"
                >
                  أنظمة الأمان
                </Link>
              </div>
            </div>
          </li>

          {/* Blog */}
          <li>
            <Link
              href="/blog"
              className="hover:text-brand transition-colors"
            >
              المدونة
            </Link>
          </li>

          <li>
            <Link
              href="/#contact"
              className="hover:text-brand transition-colors"
            >
              تواصل معنا
            </Link>
          </li>
        </ul>

        {/* Desktop CTA */}
        <button
          type="button"
          onClick={handleRequestClick}
          className="hidden md:block btn-primary !py-2.5 !px-5 text-xs"
        >
          اطلب استشارة
        </button>

        {/* Mobile Toggle Button */}
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? "إغلاق القائمة" : "فتح القائمة"}
          aria-expanded={isOpen}
          className="md:hidden w-11 h-11 flex items-center justify-center rounded-xl bg-brand-soft text-brand hover:bg-brand hover:text-white transition-all duration-300"
        >
          {isOpen ? <X size={23} /> : <Menu size={23} />}
        </button>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen
            ? "max-h-[600px] opacity-100 mt-4"
            : "max-h-0 opacity-0 mt-0"
        }`}
      >
        <div className="bg-white rounded-2xl shadow-xl border border-ink/5 p-3">
          {/* Home */}
          <Link
            href="/"
            onClick={() => setIsOpen(false)}
            className="flex items-center px-4 py-3 rounded-xl text-ink/80 hover:bg-brand-soft hover:text-brand transition-colors"
          >
            الرئيسية
          </Link>

          {/* Services */}
          <div className="mt-1">
            <button
              type="button"
              onClick={() => setServicesOpen(!servicesOpen)}
              className="w-full flex items-center justify-between px-4 py-3 rounded-xl text-ink/80 hover:bg-brand-soft hover:text-brand transition-colors"
            >
              <span>الخدمات</span>

              <ChevronDown
                size={18}
                className={`transition-transform duration-300 ${
                  servicesOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            <div
              className={`overflow-hidden transition-all duration-300 ${
                servicesOpen
                  ? "max-h-40 opacity-100"
                  : "max-h-0 opacity-0"
              }`}
            >
              <div className="pr-4 pt-1 pb-1 space-y-1">
                <Link
                  href="/software"
                  onClick={() => setIsOpen(false)}
                  className="block px-4 py-2.5 rounded-lg text-sm text-ink/60 hover:bg-brand-soft hover:text-brand transition-colors"
                >
                  الحلول البرمجية
                </Link>

                <Link
                  href="/security"
                  onClick={() => setIsOpen(false)}
                  className="block px-4 py-2.5 rounded-lg text-sm text-ink/60 hover:bg-brand-soft hover:text-brand transition-colors"
                >
                  أنظمة الأمان
                </Link>
              </div>
            </div>
          </div>

          {/* Blog */}
          <Link
            href="/blog"
            onClick={() => setIsOpen(false)}
            className="flex items-center px-4 py-3 rounded-xl text-ink/80 hover:bg-brand-soft hover:text-brand transition-colors"
          >
            المدونة
          </Link>

          {/* Contact */}
          <Link
            href="/#contact"
            onClick={() => setIsOpen(false)}
            className="flex items-center px-4 py-3 rounded-xl text-ink/80 hover:bg-brand-soft hover:text-brand transition-colors"
          >
            تواصل معنا
          </Link>

          {/* CTA */}
          <button
            type="button"
            onClick={handleMobileRequestClick}
            className="btn-primary mt-2 !w-full !py-3 text-center block"
          >
            اطلب استشارة
          </button>
        </div>
      </div>
    </header>
  );
}