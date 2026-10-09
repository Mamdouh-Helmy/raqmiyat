// components/Navbar.jsx
"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  CaretDown,
  List,
  X,
  House,
  Briefcase,
  BookOpenText,
  PhoneCall,
  Code,
  ShieldCheck,
  ArrowLeft,
} from "@phosphor-icons/react";
import { useEffect, useState } from "react";
import { useContactModal } from "./ContactModalProvider";
import { mainHref, SERVICE_URLS } from "@/lib/links";

// key = اسم الـ subdomain. الرابط الفعلي من SERVICE_URLS
const SERVICES = [
  {
    key: "software",
    label: "الحلول البرمجية",
    desc: "مواقع وتطبيقات وأنظمة مخصصة",
    icon: Code,
  },
  {
    key: "security",
    label: "أنظمة الأمان",
    desc: "كاميرات وتحكم في الدخول",
    icon: ShieldCheck,
  },
];

// الصفحات اللي بتبدأ بقسم غامق والنافبار شفاف فوقه عند الصفر (الموقع الرئيسي بس)
const HERO_PATHS = ["/", "/works"];

// site: "main" (www) | "security" | "software"
// على الـ subdomains الـ "/" هو صفحة القسم، فمنعتمدش على usePathname هناك
export default function Navbar({ site = "main" }) {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [contactInView, setContactInView] = useState(false);
  const [prevPathname, setPrevPathname] = useState(pathname);
  const { openContactModal } = useContactModal();

  // ───── تصفير الحالة عند تغيير الصفحة ─────
  // بنعدّل الـ state أثناء الـ render بدل useEffect (من غير render زيادة)
  if (prevPathname !== pathname) {
    setPrevPathname(pathname);
    setIsOpen(false);
    setServicesOpen(false);
    setContactInView(false);
  }

  const onMain = site === "main";
  const isHome = onMain && pathname === "/";
  const isHeroPage = onMain && HERO_PATHS.includes(pathname);

  // فوق القسم الغامق: صفحات الهيرو + عند الصفر + القائمة مقفولة
  const overHero = isHeroPage && !scrolled && !isOpen;

  // الخلفية تظهر بعد النزول، أو مع قائمة الموبايل، أو في الصفحات من غير هيرو
  const showBg = scrolled || isOpen || !isHeroPage;

  // صورة اللوجو: مخفية عند الصفر على صفحات الهيرو فقط
  const showLogo = !overHero;

  const isActive = (href) =>
    onMain && (pathname === href || pathname.startsWith(`${href}/`));

  const servicesActive = SERVICES.some((s) => s.key === site);

  const active = {
    home: isHome && !contactInView,
    works: isActive("/works"),
    blog: isActive("/blog"),
    contact: isHome && contactInView,
  };

  // تغيير شكل النافبار بعد النزول
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // تمييز "تواصل معنا" لما قسم التواصل يظهر في نص الشاشة
  useEffect(() => {
    if (!isHome) return;
    const el = document.getElementById("contact");
    if (!el) return;

    const io = new IntersectionObserver(
      ([entry]) => setContactInView(entry.isIntersecting),
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [isHome]);

  // Escape + قفل سكرول الصفحة لما القائمة مفتوحة
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e) => e.key === "Escape" && setIsOpen(false);
    window.addEventListener("keydown", onKey);

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [isOpen]);

  function closeMenu() {
    setIsOpen(false);
  }

  function handleRequestClick() {
    document
      .getElementById("cta-section")
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
    openContactModal("استشارة مجانية");
  }

  function handleMobileRequestClick() {
    closeMenu();
    handleRequestClick();
  }

  // ───── ستايلات الديسكتوب ─────
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

  // ───── ستايلات الموبايل ─────
  // ظهور تدريجي لكل عنصر (stagger)
  const reveal = (i, extraClass = "") => ({
    style: { transitionDelay: isOpen ? `${80 + i * 55}ms` : "0ms" },
    className: `transition-all duration-500 ease-out ${
      isOpen ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
    } ${extraClass}`.trim(),
  });

  const mobileRow = (on) =>
    `group flex w-full items-center gap-4 rounded-2xl px-3 py-3.5 text-right transition-colors ${
      on ? "bg-brand-soft" : "active:bg-brand-soft/60"
    }`;

  const iconBox = (on) =>
    `flex h-11 w-11 shrink-0 items-center justify-center rounded-xl transition-colors ${
      on
        ? "bg-brand text-white"
        : "bg-ink/5 text-ink/70 group-hover:bg-brand-soft group-hover:text-brand"
    }`;

  const labelCls = (on) =>
    `flex-1 text-lg ${on ? "font-black text-brand" : "font-bold text-ink"}`;

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
          showBg
            ? `${isOpen ? "bg-white" : "bg-paper/90 backdrop-blur-md"} ${
                isOpen ? "shadow-none" : "shadow-[0_1px_0_0_rgba(0,0,0,0.06)]"
              }`
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
              href={mainHref(site, "/")}
              onClick={closeMenu}
              aria-label="رقميات"
              className="flex items-center gap-2.5"
            >
              <span
                className={`overflow-hidden transition-all duration-300 ${
                  showLogo ? "w-9 opacity-100" : "w-0 opacity-0"
                }`}
              >
                <Image
                  src="/raqmiyat.webp"
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
                  href={mainHref(site, "/")}
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
                  <CaretDown
                    size={14}
                    weight="bold"
                    className="transition-transform duration-300 group-focus-within:rotate-180 group-hover:rotate-180"
                  />
                </button>

                <div className="invisible absolute right-0 top-full z-50 pt-3 opacity-0 transition-all duration-200 group-focus-within:visible group-focus-within:opacity-100 group-hover:visible group-hover:opacity-100">
                  <div className="w-56 rounded-2xl border border-ink/5 bg-white p-2 shadow-xl">
                    {SERVICES.map((s) => {
                      const on = s.key === site;
                      return (
                        <Link
                          key={s.key}
                          href={SERVICE_URLS[s.key]}
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
                  href={mainHref(site, "/blog")}
                  aria-current={active.blog ? "page" : undefined}
                  className={desktopLink(active.blog)}
                >
                  المدونة
                </Link>
              </li>

              <li>
                <Link
                  href={mainHref(site, "/#contact")}
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
              onClick={() => setIsOpen((open) => !open)}
              aria-label={isOpen ? "إغلاق القائمة" : "فتح القائمة"}
              aria-expanded={isOpen}
              aria-controls="mobile-menu"
              className={`relative flex h-11 w-11 items-center justify-center rounded-xl transition-all duration-300 md:hidden ${
                isOpen
                  ? "bg-brand text-white"
                  : overHero
                  ? "bg-white/15 text-white backdrop-blur-sm"
                  : "bg-transparent text-brand"
              }`}
            >
              <List
                size={24}
                weight="bold"
                className={`absolute transition-all duration-300 ${
                  isOpen
                    ? "rotate-90 scale-0 opacity-0"
                    : "rotate-0 scale-100 opacity-100"
                }`}
              />
              <X
                size={24}
                weight="bold"
                className={`absolute transition-all duration-300 ${
                  isOpen
                    ? "rotate-0 scale-100 opacity-100"
                    : "-rotate-90 scale-0 opacity-0"
                }`}
              />
            </button>
          </nav>
        </div>
      </header>

      {/* ───── قائمة الموبايل: شاشة كاملة ───── */}
      <div
        id="mobile-menu"
        aria-hidden={!isOpen}
        className={`fixed inset-0 z-40 md:hidden transition-[opacity,visibility] duration-300 ${
          isOpen
            ? "visible opacity-100"
            : "pointer-events-none invisible opacity-0"
        }`}
      >
        <div className="relative flex h-full flex-col overflow-y-auto overflow-x-hidden bg-white px-5 pb-6 pt-24">
          {/* ───── أشكال الخلفية ───── */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 overflow-hidden"
          >
            {/* دايرة كبيرة فوق */}
            <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-brand-soft" />
            {/* حلقة */}
            <div className="absolute -left-16 top-1/3 h-52 w-52 rounded-full border-[18px] border-sand/30" />
            {/* نقاط */}
            <div
              className="absolute bottom-40 right-4 h-28 w-28 opacity-40"
              style={{
                backgroundImage:
                  "radial-gradient(currentColor 1.5px, transparent 1.5px)",
                backgroundSize: "14px 14px",
              }}
            />
            {/* دايرة تحت */}
            <div className="absolute -bottom-28 -left-20 h-72 w-72 rounded-full bg-brand-soft/70" />
            {/* مربع مائل */}
            <div className="absolute bottom-56 left-8 h-10 w-10 rotate-12 rounded-xl bg-sand/40" />
          </div>

          <ul className="relative z-10 space-y-1">
            {/* الرئيسية */}
            <li {...reveal(0)}>
              <Link
                href={mainHref(site, "/")}
                onClick={closeMenu}
                aria-current={active.home ? "page" : undefined}
                className={mobileRow(active.home)}
              >
                <span className={iconBox(active.home)}>
                  <House size={24} weight="duotone" />
                </span>
                <span className={labelCls(active.home)}>الرئيسية</span>
                <ArrowLeft size={18} weight="bold" className="text-ink/30" />
              </Link>
            </li>

            {/* الخدمات (أكورديون) */}
            <li {...reveal(1)}>
              <button
                type="button"
                onClick={() => setServicesOpen((open) => !open)}
                aria-expanded={servicesOpen}
                className={mobileRow(servicesActive)}
              >
                <span className={iconBox(servicesActive)}>
                  <Briefcase size={24} weight="duotone" />
                </span>
                <span className={labelCls(servicesActive)}>الخدمات</span>
                <CaretDown
                  size={20}
                  weight="bold"
                  className={`text-ink/40 transition-transform duration-300 ${
                    servicesOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              <div
                className={`grid transition-[grid-template-rows] duration-300 ease-out ${
                  servicesOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                }`}
              >
                <div className="overflow-hidden">
                  <div className="mr-[1.35rem] space-y-1 border-r-2 border-ink/10 py-1 pr-4">
                    {SERVICES.map((s) => {
                      const on = s.key === site;
                      const Icon = s.icon;
                      return (
                        <Link
                          key={s.key}
                          href={SERVICE_URLS[s.key]}
                          onClick={closeMenu}
                          aria-current={on ? "page" : undefined}
                          tabIndex={servicesOpen ? 0 : -1}
                          className={`flex items-center gap-3 rounded-xl px-3 py-3 transition-colors ${
                            on
                              ? "bg-brand-soft text-brand"
                              : "text-ink/80 active:bg-brand-soft/60"
                          }`}
                        >
                          <Icon size={22} weight="duotone" className="shrink-0" />
                          <span className="flex-1">
                            <span
                              className={`block text-base ${
                                on ? "font-black" : "font-bold"
                              }`}
                            >
                              {s.label}
                            </span>
                            <span className="block text-xs text-ink/50">
                              {s.desc}
                            </span>
                          </span>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              </div>
            </li>

            {/* المدونة */}
            <li {...reveal(2)}>
              <Link
                href={mainHref(site, "/blog")}
                onClick={closeMenu}
                aria-current={active.blog ? "page" : undefined}
                className={mobileRow(active.blog)}
              >
                <span className={iconBox(active.blog)}>
                  <BookOpenText size={24} weight="duotone" />
                </span>
                <span className={labelCls(active.blog)}>المدونة</span>
                <ArrowLeft size={18} weight="bold" className="text-ink/30" />
              </Link>
            </li>

            {/* تواصل معنا */}
            <li {...reveal(3)}>
              <Link
                href={mainHref(site, "/#contact")}
                onClick={closeMenu}
                aria-current={active.contact ? "location" : undefined}
                className={mobileRow(active.contact)}
              >
                <span className={iconBox(active.contact)}>
                  <PhoneCall size={24} weight="duotone" />
                </span>
                <span className={labelCls(active.contact)}>تواصل معنا</span>
                <ArrowLeft size={18} weight="bold" className="text-ink/30" />
              </Link>
            </li>
          </ul>

          {/* زر الاستشارة في آخر الشاشة */}
          <div {...reveal(4, "relative z-10 mt-auto pt-8")}>
            <button
              type="button"
              onClick={handleMobileRequestClick}
              className="btn-primary block !w-full !py-4 text-center text-base"
            >
              اطلب استشارة مجانية
            </button>
            <p className="mt-3 text-center text-xs text-ink/50">
              هنرد عليك في أقرب وقت
            </p>
          </div>
        </div>
      </div>

      {/* مساحة بديلة للصفحات من غير هيرو (الـ header fixed) */}
      {!isHeroPage && <div aria-hidden="true" className="h-[4.5rem]" />}
    </>
  );
}