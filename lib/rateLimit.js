// lib/rateLimit.js  (ملف جديد)
// Rate limit بسيط في الذاكرة. بيتصفّر مع كل restart/redeploy، وكل instance له عدّاده.
// مناسب لموقع بزيارات قليلة. لو كبرت أو اشتغلت على أكتر من instance، استبدله بـ Redis.

export function getClientIp(req) {
  const fwd = req.headers.get("x-forwarded-for");
  if (fwd) return fwd.split(",")[0].trim() || "local";
  return req.headers.get("x-real-ip") || "local";
}

export function createLimiter({ max, windowMs }) {
  const map = new Map();

  // تنظيف دوري عشان الـ Map ما تكبرش للأبد
  const prune = (now) => {
    if (map.size < 5000) return;
    for (const [key, entry] of map) {
      if (now - entry.first > windowMs) map.delete(key);
    }
  };

  return {
    isLimited(key) {
      const entry = map.get(key);
      if (!entry) return false;
      if (Date.now() - entry.first > windowMs) {
        map.delete(key);
        return false;
      }
      return entry.count >= max;
    },

    hit(key) {
      const now = Date.now();
      prune(now);
      const entry = map.get(key);
      if (!entry || now - entry.first > windowMs) {
        map.set(key, { count: 1, first: now });
      } else {
        entry.count += 1;
      }
    },

    reset(key) {
      map.delete(key);
    },
  };
}