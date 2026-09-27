"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Mail, Phone, RefreshCw, Inbox } from "lucide-react";

function initials(name) {
  if (!name) return "؟";
  return name.trim().slice(0, 1);
}

function isSameDay(a, b) {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

export default function AdminLeadsPage() {
  const router = useRouter();
  const [leads, setLeads] = useState([]);
  const [status, setStatus] = useState("loading"); // loading | idle | error

  async function fetchLeads() {
    setStatus("loading");
    try {
      const res = await fetch("/api/contact");
      if (res.status === 401) {
        router.push("/admin/login");
        return;
      }
      if (!res.ok) throw new Error();
      const data = await res.json();
      setLeads(data.contacts || []);
      setStatus("idle");
    } catch {
      setStatus("error");
    }
  }

  useEffect(() => {
    fetchLeads();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const stats = useMemo(() => {
    const now = new Date();
    const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    const today = leads.filter((l) => isSameDay(new Date(l.createdAt), now)).length;
    const week = leads.filter((l) => new Date(l.createdAt) >= weekAgo).length;
    return [
      { label: "إجمالي الطلبات", value: leads.length },
      { label: "آخر ٧ أيام", value: week },
      { label: "اليوم", value: today },
    ];
  }, [leads]);

  return (
    <div className="container-x py-10">
      <div className="flex flex-wrap items-end justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-black text-ink">طلبات التواصل</h1>
          <p className="text-ink/45 text-sm mt-1">كل الرسائل الواردة من نماذج الموقع.</p>
        </div>
        <button
          onClick={fetchLeads}
          className="flex items-center gap-2 text-sm font-bold text-brand border border-brand/20 hover:bg-brand-soft px-4 py-2.5 rounded-xl transition-colors"
        >
          <RefreshCw size={15} /> تحديث
        </button>
      </div>

      <div className="grid grid-cols-3 gap-3 mb-8 max-w-lg">
        {stats.map((s) => (
          <div key={s.label} className="border border-ink/10 rounded-2xl px-4 py-3.5 bg-white">
            <p className="text-2xl font-black text-ink tabular-nums">{s.value}</p>
            <p className="text-[11px] text-ink/40 font-bold mt-0.5">{s.label}</p>
          </div>
        ))}
      </div>

      {status === "error" ? (
        <div className="border border-red-100 bg-red-50 rounded-2xl p-14 text-center text-red-600 text-sm">
          تعذر تحميل الطلبات، حاول تعمل تحديث.
        </div>
      ) : leads.length === 0 ? (
        <div className="border border-ink/10 rounded-2xl p-16 text-center">
          <Inbox size={28} className="mx-auto text-ink/20 mb-3" />
          <p className="text-ink/40 text-sm">
            {status === "loading" ? "جارِ التحميل..." : "لا يوجد طلبات حتى الآن."}
          </p>
        </div>
      ) : (
        <div className="border border-ink/10 rounded-2xl divide-y divide-ink/5 bg-white overflow-hidden">
          {leads.map((lead) => (
            <div key={lead._id} className="p-6 flex flex-col md:flex-row md:items-start gap-4">
              <div className="w-11 h-11 rounded-full bg-brand-soft text-brand font-black flex items-center justify-center shrink-0 text-sm">
                {initials(lead.name)}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-2 mb-1.5">
                  <span className="font-black text-ink">{lead.name}</span>
                  <span className="text-[11px] font-bold text-brand bg-brand-soft px-2.5 py-1 rounded-full">
                    {lead.subject}
                  </span>
                </div>
                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-ink/45 mb-3">
                  <span className="flex items-center gap-1.5">
                    <Mail size={13} /> {lead.email}
                  </span>
                  {lead.phone && (
                    <span className="flex items-center gap-1.5">
                      <Phone size={13} /> {lead.phone}
                    </span>
                  )}
                </div>
                <p className="text-sm text-ink/70 leading-relaxed">{lead.message}</p>
              </div>

              <p className="text-xs text-ink/30 shrink-0 md:pt-1">
                {new Date(lead.createdAt).toLocaleString("ar-SA")}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}