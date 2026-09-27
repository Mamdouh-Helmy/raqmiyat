"use client";

import { useEffect, useState } from "react";
import { Plus, Pencil, Trash2, X, ShieldCheck, UserRound } from "lucide-react";

function Modal({ title, onClose, children }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div onClick={onClose} className="absolute inset-0 bg-black/40" />
      <div className="relative bg-white rounded-2xl w-full max-w-sm p-6 shadow-2xl">
        <div className="flex items-center justify-between mb-5">
          <h2 className="font-black text-ink text-base">{title}</h2>
          <button
            onClick={onClose}
            className="text-ink/40 hover:text-ink transition-colors"
            aria-label="إغلاق"
          >
            <X size={18} />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}

export default function AdminsPage() {
  const [admins, setAdmins] = useState([]);
  const [status, setStatus] = useState("loading"); // loading | idle | error

  const [createOpen, setCreateOpen] = useState(false);
  const [newAdmin, setNewAdmin] = useState({ username: "", password: "" });
  const [creating, setCreating] = useState(false);
  const [createError, setCreateError] = useState("");

  const [editTarget, setEditTarget] = useState(null); // admin object or null
  const [editForm, setEditForm] = useState({ username: "", password: "" });
  const [saving, setSaving] = useState(false);
  const [editError, setEditError] = useState("");

  const [deleteTarget, setDeleteTarget] = useState(null); // admin object or null
  const [deleting, setDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState("");

  async function fetchAdmins() {
    setStatus("loading");
    try {
      const res = await fetch("/api/admin/admins");
      if (!res.ok) throw new Error();
      const data = await res.json();
      setAdmins(data.admins || []);
      setStatus("idle");
    } catch {
      setStatus("error");
    }
  }

  useEffect(() => {
    fetchAdmins();
  }, []);

  function openCreate() {
    setNewAdmin({ username: "", password: "" });
    setCreateError("");
    setCreateOpen(true);
  }

  async function handleCreate(e) {
    e.preventDefault();
    setCreateError("");
    setCreating(true);
    try {
      const res = await fetch("/api/admin/admins", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newAdmin),
      });
      const data = await res.json();
      if (!res.ok) {
        setCreateError(data.error || "حدث خطأ.");
        return;
      }
      setCreateOpen(false);
      fetchAdmins();
    } catch {
      setCreateError("حدث خطأ أثناء الإنشاء.");
    } finally {
      setCreating(false);
    }
  }

  function openEdit(admin) {
    setEditTarget(admin);
    setEditForm({ username: admin.username, password: "" });
    setEditError("");
  }

  async function handleSaveEdit(e) {
    e.preventDefault();
    setSaving(true);
    setEditError("");
    try {
      const payload = { username: editForm.username };
      if (editForm.password) payload.password = editForm.password;

      const res = await fetch(`/api/admin/admins/${editTarget._id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) {
        setEditError(data.error || "حدث خطأ.");
        return;
      }
      setEditTarget(null);
      fetchAdmins();
    } catch {
      setEditError("حدث خطأ أثناء التحديث.");
    } finally {
      setSaving(false);
    }
  }

  async function handleConfirmDelete() {
    setDeleting(true);
    setDeleteError("");
    try {
      const res = await fetch(`/api/admin/admins/${deleteTarget._id}`, { method: "DELETE" });
      const data = await res.json();
      if (!res.ok) {
        setDeleteError(data.error || "حدث خطأ.");
        return;
      }
      setDeleteTarget(null);
      fetchAdmins();
    } catch {
      setDeleteError("حدث خطأ أثناء الحذف.");
    } finally {
      setDeleting(false);
    }
  }

  return (
    <div className="container-x py-6 sm:py-10">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6 sm:mb-8">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-ink">إدارة الأدمن</h1>
          <p className="text-ink/45 text-sm mt-1">حسابات الدخول للوحة التحكم وصلاحياتها.</p>
        </div>
        <button
          onClick={openCreate}
          className="flex items-center gap-2 justify-center bg-brand text-white font-bold text-sm px-4 sm:px-5 py-2.5 rounded-xl hover:bg-brand-dark transition-colors"
        >
          <Plus size={16} /> إضافة أدمن
        </button>
      </div>

      {status === "loading" ? (
        <div className="border border-ink/10 rounded-2xl p-14 text-center text-ink/45 text-sm">
          جارِ التحميل...
        </div>
      ) : status === "error" ? (
        <div className="border border-red-100 bg-red-50 rounded-2xl p-14 text-center text-red-600 text-sm">
          تعذر تحميل القائمة.
        </div>
      ) : admins.length === 0 ? (
        <div className="border border-ink/10 rounded-2xl p-16 text-center">
          <UserRound size={26} className="mx-auto text-ink/20 mb-3" />
          <p className="text-ink/40 text-sm">لا يوجد حسابات أدمن حتى الآن.</p>
        </div>
      ) : (
        <div className="border border-ink/10 rounded-2xl divide-y divide-ink/5 bg-white overflow-hidden">
          {admins.map((admin) => (
            <div
              key={admin._id}
              className="p-4 sm:p-5 flex flex-wrap items-center gap-x-4 gap-y-3"
            >
              <div className="w-9 h-9 rounded-full bg-brand-soft text-brand font-black flex items-center justify-center text-xs shrink-0">
                {admin.username?.slice(0, 1).toUpperCase()}
              </div>

              <div className="flex-1 min-w-[140px]">
                <p className="font-bold text-ink text-sm">{admin.username}</p>
                <p className="text-xs text-ink/40 mt-0.5">
                  {admin.lastLoginAt
                    ? `آخر دخول ${new Date(admin.lastLoginAt).toLocaleString("ar-SA")}`
                    : "لسه ما دخلش"}
                </p>
              </div>

              <span className="inline-flex items-center gap-1.5 text-xs font-bold text-brand bg-brand-soft px-2.5 py-1 rounded-full shrink-0">
                <ShieldCheck size={12} /> {admin.role}
              </span>

              <div className="flex items-center gap-3 shrink-0 ms-auto">
                <button
                  onClick={() => openEdit(admin)}
                  className="text-ink/40 hover:text-brand transition-colors"
                  aria-label="تعديل"
                >
                  <Pencil size={16} />
                </button>
                <button
                  onClick={() => {
                    setDeleteError("");
                    setDeleteTarget(admin);
                  }}
                  className="text-ink/40 hover:text-red-600 transition-colors"
                  aria-label="حذف"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {createOpen && (
        <Modal title="إضافة أدمن جديد" onClose={() => !creating && setCreateOpen(false)}>
          <form onSubmit={handleCreate} className="space-y-4">
            <div>
              <label className="text-xs text-ink/50 mb-1.5 block font-bold">اسم المستخدم</label>
              <input
                autoFocus
                value={newAdmin.username}
                onChange={(e) => setNewAdmin((f) => ({ ...f, username: e.target.value }))}
                className="w-full rounded-xl border border-ink/10 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand/20 focus:border-brand/30 transition-colors"
                placeholder="اسم مستخدم جديد"
              />
            </div>
            <div>
              <label className="text-xs text-ink/50 mb-1.5 block font-bold">كلمة المرور</label>
              <input
                type="password"
                value={newAdmin.password}
                onChange={(e) => setNewAdmin((f) => ({ ...f, password: e.target.value }))}
                className="w-full rounded-xl border border-ink/10 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand/20 focus:border-brand/30 transition-colors"
                placeholder="8 أحرف على الأقل"
              />
            </div>
            {createError && <p className="text-red-600 text-xs">{createError}</p>}
            <button
              type="submit"
              disabled={creating}
              className="w-full bg-brand text-white font-bold text-sm py-2.5 rounded-xl hover:bg-brand-dark transition-colors disabled:opacity-50"
            >
              {creating ? "جارِ الإضافة..." : "إضافة"}
            </button>
          </form>
        </Modal>
      )}

      {editTarget && (
        <Modal title="تعديل الأدمن" onClose={() => !saving && setEditTarget(null)}>
          <form onSubmit={handleSaveEdit} className="space-y-4">
            <div>
              <label className="text-xs text-ink/50 mb-1.5 block font-bold">اسم المستخدم</label>
              <input
                autoFocus
                value={editForm.username}
                onChange={(e) => setEditForm((f) => ({ ...f, username: e.target.value }))}
                className="w-full rounded-xl border border-ink/10 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand/20 focus:border-brand/30 transition-colors"
              />
            </div>
            <div>
              <label className="text-xs text-ink/50 mb-1.5 block font-bold">
                كلمة المرور الجديدة
              </label>
              <input
                type="password"
                value={editForm.password}
                onChange={(e) => setEditForm((f) => ({ ...f, password: e.target.value }))}
                placeholder="سيبها فاضية لو مش هتغيرها"
                className="w-full rounded-xl border border-ink/10 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand/20 focus:border-brand/30 transition-colors"
              />
            </div>
            {editError && <p className="text-red-600 text-xs">{editError}</p>}
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setEditTarget(null)}
                className="flex-1 border border-ink/10 text-ink/60 font-bold text-sm py-2.5 rounded-xl hover:bg-paper transition-colors"
              >
                إلغاء
              </button>
              <button
                type="submit"
                disabled={saving}
                className="flex-1 bg-brand text-white font-bold text-sm py-2.5 rounded-xl hover:bg-brand-dark transition-colors disabled:opacity-50"
              >
                {saving ? "جارِ الحفظ..." : "حفظ"}
              </button>
            </div>
          </form>
        </Modal>
      )}

      {deleteTarget && (
        <Modal title="حذف الأدمن" onClose={() => !deleting && setDeleteTarget(null)}>
          <p className="text-sm text-ink/60 mb-6 leading-relaxed">
            متأكد إنك عايز تمسح{" "}
            <span className="font-bold text-ink">{deleteTarget.username}</span>؟ الإجراء ده
            مش هينفع يتراجع فيه.
          </p>
          {deleteError && <p className="text-red-600 text-xs mb-4">{deleteError}</p>}
          <div className="flex gap-3">
            <button
              onClick={() => setDeleteTarget(null)}
              disabled={deleting}
              className="flex-1 border border-ink/10 text-ink/60 font-bold text-sm py-2.5 rounded-xl hover:bg-paper transition-colors disabled:opacity-50"
            >
              إلغاء
            </button>
            <button
              onClick={handleConfirmDelete}
              disabled={deleting}
              className="flex-1 bg-red-600 text-white font-bold text-sm py-2.5 rounded-xl hover:bg-red-700 transition-colors disabled:opacity-50"
            >
              {deleting ? "جارِ الحذف..." : "حذف"}
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
}