// components/Navbar.jsx
"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { ChevronDown, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useContactModal } from "./ContactModalProvider";

const SERVICES = [
  { href: "/software", label: "الحلول البرمجية" },
  { href: "/security", label: "أنظمة الأمان" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [contactInView, setContactInView] = useState(false);
  const { openContactModal } = useContactModal();

  const isHome = pathname === "/";

  // فوق الصورة الغامقة: الرئيسية + عند الصفر + القائمة مقفولة
  const overHero = isHome && !scrolled && !isOpen;

  // الخلفية تظهر بعد النزول، أو مع قائمة الموبايل، أو في الصفحات غير الرئيسية
  const showBg = scrolled || isOpen || !isHome;

  // صورة اللوجو: مخفية عند الصفر على الرئيسية فقط
  const showLogo = !overHero;

  const isActive = (href) =>
    pathname === href || pathname.startsWith(`${href}/`);

  const servicesActive = SERVICES.some((s) => isActive(s.href));

  const active = {
    home: isHome && !contactInView,
    blog: isActive("/blog"),
    contact: isHome && contactInView,
  };

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [pathname]);

  useEffect(() => {
    setContactInView(false);
    if (!isHome) return;
    const el = document.getElementById("contact");
    if (!el) return;

    const io = new IntersectionObserver(
      ([entry]) => setContactInView(entry.isIntersecting),
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [isHome, pathname]);

  useEffect(() => {
    setIsOpen(false);
    setServicesOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e) => e.key === "Escape" && setIsOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen]);

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

  // ───── ستايلات ─────
  const desktopLink = (on) =>
    `relative flex items-center gap-1 py-2 transition-colors duration-200 after:absolute after:inset-x-0 after:-bottom-0.5 after:h-0.5 after:origin-center after:rounded-full after:bg-sand after:transition-transform after:duration-300 ${
      on
        ? `font-black after:scale-x-100 ${overHero ? "text-white" : "text-ink"}`
        : `after:scale-x-0 hover:after:scale-x-50 ${
            overHero
              ? "text-white/75 hover:text-white"
              : "text-ink/60 hover:text-ink"
          }`
    }`;

  const mobileLink = (on) =>
    `flex items-center justify-between rounded-xl px-4 py-3 transition-colors ${
      on
        ? "bg-brand-soft font-black text-brand"
        : "text-ink/80 hover:bg-brand-soft hover:text-brand"
    }`;

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
          showBg
            ? "bg-paper/90 shadow-[0_1px_0_0_rgba(0,0,0,0.06)] backdrop-blur-md"
            : "bg-transparent shadow-none backdrop-blur-none"
        }`}
      >
        <div
          className={`container-x transition-all duration-300 ${
            scrolled ? "py-3" : "py-5"
          }`}
        >
          <nav
            aria-label="التنقل الرئيسي"
            className="flex items-center justify-between gap-6"
          >
            {/* الشعار: الاسم ظاهر دايماً، والصورة تظهر بعد النزول */}
            <Link
              href="/"
              onClick={() => setIsOpen(false)}
              aria-label="رقميات"
              className="flex items-center gap-2.5"
            >
              <span
                className={`overflow-hidden transition-all duration-300 ${
                  showLogo ? "w-9 opacity-100" : "w-0 opacity-0"
                }`}
              >
                <Image
                  src="/raqmiyat.png"
                  alt=""
                  width={36}
                  height={36}
                  className="rounded-lg object-contain"
                  priority
                />
              </span>
              <span
                className={`font-heading text-3xl transition-colors duration-300 ${
                  overHero ? "text-white" : "text-brand"
                }`}
              >
                رقميات
              </span>
            </Link>

            {/* قائمة الديسكتوب */}
            <ul className="hidden items-center gap-9 text-sm font-medium md:flex">
              <li>
                <Link
                  href="/"
                  aria-current={active.home ? "page" : undefined}
                  className={desktopLink(active.home)}
                >
                  الرئيسية
                </Link>
              </li>

              <li className="group relative">
                <button
                  type="button"
                  aria-haspopup="true"
                  className={desktopLink(servicesActive)}
                >
                  الخدمات
                  <ChevronDown
                    size={14}
                    className="transition-transform duration-300 group-focus-within:rotate-180 group-hover:rotate-180"
                  />
                </button>

                <div className="invisible absolute right-0 top-full z-50 pt-3 opacity-0 transition-all duration-200 group-focus-within:visible group-focus-within:opacity-100 group-hover:visible group-hover:opacity-100">
                  <div className="w-56 rounded-2xl border border-ink/5 bg-white p-2 shadow-xl">
                    {SERVICES.map((s) => {
                      const on = isActive(s.href);
                      return (
                        <Link
                          key={s.href}
                          href={s.href}
                          aria-current={on ? "page" : undefined}
                          className={`flex items-center justify-between rounded-xl px-4 py-2.5 text-sm transition-colors ${
                            on
                              ? "bg-brand-soft font-black text-brand"
                              : "text-ink/80 hover:bg-brand-soft hover:text-brand"
                          }`}
                        >
                          {s.label}
                          {on && (
                            <span
                              aria-hidden="true"
                              className="h-1.5 w-1.5 rounded-full bg-sand-deep"
                            />
                          )}
                        </Link>
                      );
                    })}
                  </div>
                </div>
              </li>

              <li>
                <Link
                  href="/blog"
                  aria-current={active.blog ? "page" : undefined}
                  className={desktopLink(active.blog)}
                >
                  المدونة
                </Link>
              </li>

              <li>
                <Link
                  href="/#contact"
                  aria-current={active.contact ? "location" : undefined}
                  className={desktopLink(active.contact)}
                >
                  تواصل معنا
                </Link>
              </li>
            </ul>

            {/* زر الاستشارة */}
            <button
              type="button"
              onClick={handleRequestClick}
              className="btn-primary hidden !px-5 !py-2.5 text-xs md:block"
            >
              اطلب استشارة
            </button>

            {/* زر قائمة الموبايل */}
            <button
              type="button"
              onClick={() => setIsOpen(!isOpen)}
              aria-label={isOpen ? "إغلاق القائمة" : "فتح القائمة"}
              aria-expanded={isOpen}
              className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-soft text-brand transition-all duration-300 hover:bg-brand hover:text-white md:hidden"
            >
              {isOpen ? <X size={23} /> : <Menu size={23} />}
            </button>
          </nav>

          {/* قائمة الموبايل */}
          <div
            className={`overflow-hidden transition-all duration-300 ease-in-out md:hidden ${
              isOpen ? "mt-4 max-h-[700px] opacity-100" : "mt-0 max-h-0 opacity-0"
            }`}
          >
            <div className="space-y-1 rounded-2xl border border-ink/5 bg-white p-3 shadow-xl">
              <Link
                href="/"
                onClick={() => setIsOpen(false)}
                aria-current={active.home ? "page" : undefined}
                className={mobileLink(active.home)}
              >
                الرئيسية
              </Link>

              <div>
                <button
                  type="button"
                  onClick={() => setServicesOpen(!servicesOpen)}
                  aria-expanded={servicesOpen}
                  className={`w-full ${mobileLink(servicesActive)}`}
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
                    servicesOpen ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
                  }`}
                >
                  <div className="space-y-1 pb-1 pr-4 pt-1">
                    {SERVICES.map((s) => {
                      const on = isActive(s.href);
                      return (
                        <Link
                          key={s.href}
                          href={s.href}
                          onClick={() => setIsOpen(false)}
                          aria-current={on ? "page" : undefined}
                          className={`block rounded-lg px-4 py-2.5 text-sm transition-colors ${
                            on
                              ? "bg-brand-soft font-black text-brand"
                              : "text-ink/60 hover:bg-brand-soft hover:text-brand"
                          }`}
                        >
                          {s.label}
                        </Link>
                      );
                    })}
                  </div>
                </div>
              </div>

              <Link
                href="/blog"
                onClick={() => setIsOpen(false)}
                aria-current={active.blog ? "page" : undefined}
                className={mobileLink(active.blog)}
              >
                المدونة
              </Link>

              <Link
                href="/#contact"
                onClick={() => setIsOpen(false)}
                aria-current={active.contact ? "location" : undefined}
                className={mobileLink(active.contact)}
              >
                تواصل معنا
              </Link>

              <button
                type="button"
                onClick={handleMobileRequestClick}
                className="btn-primary mt-2 block !w-full !py-3 text-center"
              >
                اطلب استشارة
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* مساحة بديلة للصفحات غير الرئيسية (الـ header fixed) */}
      {!isHome && <div aria-hidden="true" className="h-[4.5rem]" />}
    </>
  );
}