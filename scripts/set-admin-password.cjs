// سكريبت مستقل تشغّله يدوياً مرة من الترمينال، مش جزء من الموقع نفسه.
// بيعمل إنشاء أدمن جديد أو تحديث الباسورد لو الاسم موجود بالفعل (upsert).
//
// الاستخدام:
//   node scripts/set-admin-password.cjs <username> <password>
//
// مثال:
//   node scripts/set-admin-password.cjs admin "Rq2026#Mamdouh!"

require("dotenv").config({ path: ".env.local" });
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const AdminSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    passwordHash: { type: String, required: true },
    role: { type: String, default: "admin" },
    lastLoginAt: { type: Date },
  },
  { timestamps: true }
);

async function main() {
  const [, , usernameArg, password] = process.argv;

  if (!usernameArg || !password) {
    console.error("الاستخدام: node scripts/set-admin-password.cjs <username> <password>");
    process.exit(1);
  }

  if (!process.env.MONGODB_URI) {
    console.error("MONGODB_URI مش موجود في .env.local");
    process.exit(1);
  }

  await mongoose.connect(process.env.MONGODB_URI);

  const Admin = mongoose.models.Admin || mongoose.model("Admin", AdminSchema);
  const username = usernameArg.trim().toLowerCase();
  const passwordHash = await bcrypt.hash(password, 10);

  const admin = await Admin.findOneAndUpdate(
    { username },
    { username, passwordHash },
    { upsert: true, new: true }
  );

  console.log(`تم حفظ الأدمن "${admin.username}" بنجاح (id: ${admin._id}).`);

  await mongoose.disconnect();
}

main().catch((err) => {
  console.error("حصل خطأ:", err.message);
  process.exit(1);
});