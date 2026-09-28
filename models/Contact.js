// models/Contact.js
import mongoose from "mongoose";

// كل سؤال في الـ planner = label (السؤال) + values (اللي المستخدم اختاره)
const DetailSchema = new mongoose.Schema(
  {
    label: { type: String, required: true, trim: true },
    values: { type: [String], default: [] },
  },
  { _id: false }
);

const ContactSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true },
    phone: { type: String, trim: true },
    company: { type: String, trim: true },
    message: { type: String, required: true },
    subject: {
      type: String,
      enum: ["استشارة مجانية", "التحدث مع خبير تقني", "فحص أمني", "مناقشة مشروع", "عام"],
      default: "عام",
    },
    details: { type: [DetailSchema], default: [] },
  },
  { timestamps: true }
);

export default mongoose.models.Contact ||
  mongoose.model("Contact", ContactSchema);