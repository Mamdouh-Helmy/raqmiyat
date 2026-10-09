/** @type {import('next').NextConfig} */

const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  // من غير includeSubDomains عشان أي subdomain تاني (بريد مثلاً) ما يتأثرش
  { key: "Strict-Transport-Security", value: "max-age=31536000" },
];

const nextConfig = {
  poweredByHeader: false,

  images: {
    // الجودات المسموحة لـ next/image (Next 16 بيسمح بـ 75 بس لو ما اتحددش).
    // 60 مستخدمة في صورة الهيرو
    qualities: [60, 75],

    // الصور كلها محلية من public/. لو احتجت صور من دومين خارجي، ضيفه هنا بالاسم بدل "**":
    // remotePatterns: [{ protocol: "https", hostname: "res.cloudinary.com" }],
  },

  experimental: {
    // بيحط الـ CSS جوه الـ HTML بدل ملفات بتحجب العرض (بيحسّن FCP وLCP).
    // لو الـ build اشتكى منه، شيله
    inlineCss: true,
  },

  async headers() {
    return [
      { source: "/:path*", headers: securityHeaders },
      // لوحة التحكم ما تظهرش في نتايج البحث
      {
        source: "/admin/:path*",
        headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow" }],
      },
    ];
  },
};

module.exports = nextConfig;