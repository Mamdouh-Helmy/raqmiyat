"use client";

import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";

export default function LogoutButton() {
  const router = useRouter();

  async function handleLogout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
  }

  return (
    <button
      onClick={handleLogout}
      className="w-full flex items-center gap-3 px-3.5 py-3 rounded-xl text-sm font-bold text-white/55 hover:text-white hover:bg-white/5 transition-colors"
    >
      <LogOut size={17} strokeWidth={2.25} />
      تسجيل الخروج
    </button>
  );
}