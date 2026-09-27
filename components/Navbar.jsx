import Link from "next/link";
import Image from "next/image";
import { ChevronDown } from "lucide-react";

export default function Navbar() {
  return (
    <header className="container-x pt-6 relative z-50">
      <nav className="flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5">
          {/* حط ملف اللوجو في public/raqmiyat.png (أو غيّر الامتداد هنا لو svg/webp) */}
          <Image
            src="/raqmiyat.png"
            alt="شعار رقميات"
            width={36}
            height={36}
            className="rounded-lg object-contain"
            priority
          />
          <span className="font-heading text-3xl text-brand">رقميات</span>
        </Link>
        <ul className="hidden md:flex items-center gap-8 text-sm text-ink/70 font-medium">
          <li>
            <Link href="/" className="hover:text-brand transition-colors">
              الرئيسية
            </Link>
          </li>
          <li className="relative group">
            <button className="flex items-center gap-1 hover:text-brand transition-colors">
              الخدمات <ChevronDown size={14} />
            </button>
            <div className="absolute top-full right-0 pt-3 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50">
              <div className="bg-white rounded-xl shadow-xl border border-ink/5 p-2 w-52">
                <Link
                  href="/software"
                  className="block px-4 py-2.5 rounded-lg hover:bg-brand-soft text-ink/80 hover:text-brand text-sm"
                >
                  الحلول البرمجية
                </Link>
                <Link
                  href="/security"
                  className="block px-4 py-2.5 rounded-lg hover:bg-brand-soft text-ink/80 hover:text-brand text-sm"
                >
                  أنظمة الأمان
                </Link>
              </div>
            </div>
          </li>
          <li>
            <Link href="/#contact" className="hover:text-brand transition-colors">
              تواصل معنا
            </Link>
          </li>
        </ul>
        <Link href="/#contact" className="hidden md:block btn-primary !py-2.5 !px-5 text-xs">
          اطلب استشارة
        </Link>
      </nav>
    </header>
  );
}