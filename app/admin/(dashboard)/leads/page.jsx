"use client";

// app/admin/leads/page.jsx  (أو المسار اللي عندك للصفحة دي)
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Mail, Phone, RefreshCw, Inbox, Trash2 } from "lucide-react";
import { summarizeDetails } from "@/lib/leadDetails";

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
  const [reloadKey, setReloadKey] = useState(0); // بتتغير عشان نعيد التحميل
  const [confirmId, setConfirmId] = useState(null); // الطلب اللي مستني تأكيد الحذف
  const [deletingId, setDeletingId] = useState(null);
  const [deleteErrorId, setDeleteErrorId] = useState(null);

  // تحميل الطلبات: أول مرة، وكل ما reloadKey يتغير (زر التحديث)
  useEffect(() => {
    let ignore = false;

    async function load() {
      try {
        const res = await fetch("/api/contact");
        if (ignore) return;
        if (res.status === 401) {
          router.push("/admin/login");
          return;
        }
        if (!res.ok) throw new Error();
        const data = await res.json();
        if (ignore) return;
        setLeads(data.contacts || []);
        setStatus("idle");
      } catch {
        if (!ignore) setStatus("error");
      }
    }

    load();
    return () => {
      ignore = true;
    };
  }, [router, reloadKey]);

  function refresh() {
    setStatus("loading");
    setReloadKey((key) => key + 1);
  }

  async function deleteLead(id) {
    setDeletingId(id);
    setDeleteErrorId(null);
    try {
      const res = await fetch(`/api/contact/${id}`, { method: "DELETE" });
      if (res.status === 401) {
        router.push("/admin/login");
        return;
      }
      // 404 معناها اتحذف قبل كده، فبنشيله من القائمة عادي
      if (!res.ok && res.status !== 404) throw new Error();
      setLeads((prev) => prev.filter((l) => l._id !== id));
      setConfirmId(null);
    } catch {
      setDeleteErrorId(id);
    } finally {
      setDeletingId(null);
    }
  }

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
          onClick={refresh}
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
          {leads.map((lead) => {
            const hasDetails = lead.details?.length > 0;
            // لو الرسالة اتكوّنت أوتوماتيك من التفاصيل، منعرضهاش مرتين
            const showMessage =
              lead.message && lead.message !== summarizeDetails(lead.details);
            const confirming = confirmId === lead._id;
            const deleting = deletingId === lead._id;

            return (
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

                  {showMessage && (
                    <p className="text-sm text-ink/70 leading-relaxed whitespace-pre-line">
                      {lead.message}
                    </p>
                  )}

                  {hasDetails && (
                    <div className={showMessage ? "mt-4" : ""}>
                      <p className="text-xs font-black text-ink mb-2">تفاصيل المشروع</p>
                      <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3.5 rounded-xl border border-ink/10 bg-ink/[0.02] p-4">
                        {lead.details.map((d, i) => (
                          <div key={`${d.label}-${i}`}>
                            <dt className="text-[11px] font-bold text-ink/40 mb-1">{d.label}</dt>
                            <dd className="text-sm text-ink">
                              {d.values.length > 1 ? (
                                <span className="flex flex-wrap gap-1.5">
                                  {d.values.map((v, j) => (
                                    <span
                                      key={`${v}-${j}`}
                                      className="text-xs font-bold text-ink/70 bg-white border border-ink/10 px-2.5 py-1 rounded-full"
                                    >
                                      {v}
                                    </span>
                                  ))}
                                </span>
                              ) : (
                                d.values[0]
                              )}
                            </dd>
                          </div>
                        ))}
                      </dl>
                    </div>
                  )}
                </div>

                <div className="shrink-0 flex flex-row md:flex-col items-center md:items-end justify-between gap-3 md:pt-1">
                  <p className="text-xs text-ink/30">
                    {new Date(lead.createdAt).toLocaleString("ar-SA")}
                  </p>

                  {confirming ? (
                    <div className="flex flex-col items-end gap-1.5">
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => deleteLead(lead._id)}
                          disabled={deleting}
                          className="text-xs font-bold text-white bg-red-600 hover:bg-red-700 disabled:opacity-60 px-3.5 py-2 rounded-lg transition-colors"
                        >
                          {deleting ? "جارِ الحذف..." : "تأكيد الحذف"}
                        </button>
                        <button
                          onClick={() => setConfirmId(null)}
                          disabled={deleting}
                          className="text-xs font-bold text-ink/50 hover:text-ink transition-colors"
                        >
                          إلغاء
                        </button>
                      </div>
                      {deleteErrorId === lead._id && (
                        <p className="text-[11px] text-red-600">تعذر الحذف، حاول مرة أخرى.</p>
                      )}
                    </div>
                  ) : (
                    <button
                      onClick={() => {
                        setDeleteErrorId(null);
                        setConfirmId(lead._id);
                      }}
                      aria-label={`حذف طلب ${lead.name}`}
                      className="p-2 rounded-lg text-ink/30 hover:text-red-600 hover:bg-red-50 transition-colors"
                    >
                      <Trash2 size={16} />
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}