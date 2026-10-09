"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Lock, User, Eye, EyeOff } from "lucide-react";

export default function AdminLoginPage() {
  const router = useRouter();
  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "بيانات الدخول غير صحيحة.");
        setLoading(false);
        return;
      }
      router.push("/admin/leads");
      router.refresh();
    } catch {
      setError("حدث خطأ، حاول مرة أخرى.");
      setLoading(false);
    }
  }

  return (
    <main dir="rtl" className="min-h-screen bg-paper flex">
      {/* لوحة الهوية - مخفية على الموبايل */}
      <div className="hidden md:flex md:w-[42%] bg-brand-dark text-white flex-col justify-center p-12 relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.06] pointer-events-none"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
            backgroundSize: "22px 22px",
          }}
        />
        <div className="relative flex flex-col items-center text-center">
          {/* حط ملف اللوجو في public/logo.webp (أو غيّر الامتداد هنا لو svg/webp) */}
          <Image
            src="/logo.webp"
            alt="شعار الموقع"
            width={88}
            height={88}
            className="rounded-2xl object-contain bg-white p-3.5 shadow-lg shadow-black/20"
          />
          <p className="text-2xl font-black leading-snug mt-8 mb-3">لوحة تحكم الموقع</p>
          <p className="text-white/50 text-sm leading-relaxed max-w-xs">
            تابع طلبات التواصل الواردة من الزوار، وأدِر حسابات فريق الإدارة من مكان واحد.
          </p>
        </div>
      </div>

      {/* نموذج الدخول */}
      <div className="flex-1 flex items-center justify-center px-4 py-16">
        <form onSubmit={handleSubmit} className="w-full max-w-sm">
          <div className="md:hidden w-20 h-20 rounded-2xl bg-brand-soft flex items-center justify-center mx-auto mb-6 p-3">
            <Image
              src="/logo.webp"
              alt="شعار الموقع"
              width={56}
              height={56}
              className="object-contain w-full h-full"
              priority
            />
          </div>

          <h1 className="text-xl font-black text-ink mb-2 text-center">تسجيل الدخول</h1>
          <p className="text-ink/45 text-sm mb-8 text-center">أدخل بياناتك للوصول للوحة التحكم.</p>

          <div className="space-y-3">
            <div className="relative">
              <User size={18} className="absolute right-4 top-1/2 -translate-y-1/2 text-ink/30" />
              <input
                type="text"
                autoComplete="username"
                placeholder="اسم المستخدم"
                value={form.username}
                onChange={(e) => setForm((f) => ({ ...f, username: e.target.value }))}
                className="w-full rounded-xl border border-ink/10 pr-11 pl-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand/20 focus:border-brand/30 transition-colors"
              />
            </div>

            <div className="relative">
              <Lock size={18} className="absolute right-4 top-1/2 -translate-y-1/2 text-ink/30" />
              <input
                type={showPassword ? "text" : "password"}
                autoComplete="current-password"
                placeholder="كلمة المرور"
                value={form.password}
                onChange={(e) => setForm((f) => ({ ...f, password: e.target.value }))}
                className="w-full rounded-xl border border-ink/10 pr-11 pl-11 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand/20 focus:border-brand/30 transition-colors"
              />
              <button
                type="button"
                onClick={() => setShowPassword((s) => !s)}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-ink/30 hover:text-ink/60 transition-colors"
                aria-label={showPassword ? "إخفاء كلمة المرور" : "إظهار كلمة المرور"}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-6 bg-brand text-white font-bold text-sm py-3 rounded-xl hover:bg-brand-dark transition-colors disabled:opacity-50"
          >
            {loading ? "جارِ التحقق..." : "دخول"}
          </button>

          {error && <p className="text-red-600 text-sm mt-3">{error}</p>}
        </form>
      </div>
    </main>
  );
}