// components/CategoryIcon.jsx
// نستخدم /dist/ssr لأن نسخة الأيقونات العادية تعتمد على Context ولا تعمل داخل Server Components.
// نسخة ssr تشتغل في الاتنين (سيرفر وكلاينت) من غير مشاكل.
import {
  Bank,
  Camera,
  Cube,
  DeviceMobile,
  Flask,
  Gauge,
  MagnifyingGlass,
  ShieldCheck,
  Sparkle,
} from "@phosphor-icons/react/dist/ssr";

const MAP = {
  landmark: Bank,
  sparkles: Sparkle,
  shield: ShieldCheck,
  camera: Camera,
  boxes: Cube,
  smartphone: DeviceMobile,
  gauge: Gauge,
  search: MagnifyingGlass,
  flask: Flask,
};

export default function CategoryIcon({ name, size = 20, weight = "duotone", className }) {
  const Icon = MAP[name] || Sparkle;
  return <Icon size={size} weight={weight} className={className} aria-hidden="true" />;
}