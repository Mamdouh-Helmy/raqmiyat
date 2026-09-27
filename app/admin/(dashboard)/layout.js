"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Inbox, Users, Menu, X } from "lucide-react";
import LogoutButton from "@/components/admin/LogoutButton";

const NAV = [
  { href: "/admin/leads", label: "طلبات التواصل", icon: Inbox },
  { href: "/admin/admins", label: "إدارة الأدمن", icon: Users },
];

export default function AdminDashboardLayout({ children }) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <div className="min-h-screen flex bg-paper" dir="rtl">
      {mobileOpen && (
        <div
          onClick={() => setMobileOpen(false)}
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
        />
      )}

      <aside
        className={`fixed inset-y-0 right-0 z-50 w-72 max-w-[80%] bg-brand-dark text-white flex flex-col transition-transform duration-300 ease-in-out md:static md:z-auto md:w-64 md:shrink-0 md:translate-x-0 ${
          mobileOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="px-6 py-7 flex items-center gap-3">
          {/* حط ملف اللوجو في public/logo.png (أو غيّر الامتداد هنا لو svg/webp) */}
          <Image
            src="/logo.png"
            alt="شعار الموقع"
            width={36}
            height={36}
            className="rounded-lg object-contain bg-white/10 p-1.5"
          />
          <div className="flex-1">
            <p className="font-black text-[15px] leading-tight">لوحة التحكم</p>
            <p className="text-[11px] text-white/40 leading-tight mt-0.5">إدارة الموقع</p>
          </div>
          <button
            onClick={() => setMobileOpen(false)}
            className="md:hidden text-white/50 hover:text-white transition-colors"
            aria-label="إغلاق القائمة"
          >
            <X size={20} />
          </button>
        </div>

        <div className="h-px bg-white/10 mx-6" />

        <nav className="flex-1 px-4 py-5 space-y-1">
          {NAV.map(({ href, label, icon: Icon }) => {
            const active = pathname?.startsWith(href);
            return (
              <Link
                key={href}
                href={href}
                className={`flex items-center gap-3 px-3.5 py-3 rounded-xl text-sm font-bold transition-colors ${
                  active
                    ? "bg-white/10 text-white"
                    : "text-white/55 hover:text-white hover:bg-white/5"
                }`}
              >
                <span
                  className={`w-1 h-4 rounded-full shrink-0 transition-colors ${
                    active ? "bg-brand-light" : "bg-transparent"
                  }`}
                />
                <Icon size={17} strokeWidth={2.25} />
                {label}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-white/10">
          <LogoutButton />
        </div>
      </aside>

      <div className="flex-1 flex flex-col min-w-0">
        <header className="md:hidden flex items-center justify-between px-4 py-3.5 border-b border-ink/10 bg-white">
          <button
            onClick={() => setMobileOpen(true)}
            className="text-ink/60 hover:text-ink transition-colors"
            aria-label="فتح القائمة"
          >
            <Menu size={22} />
          </button>
          <div className="flex items-center gap-2">
            <span className="font-black text-sm text-ink">لوحة التحكم</span>
            <Image
              src="/logo.png"
              alt="شعار الموقع"
              width={26}
              height={26}
              className="rounded-md object-contain bg-brand-soft p-1"
            />
          </div>
          <span className="w-[22px]" />
        </header>

        <main className="flex-1 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}