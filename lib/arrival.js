// lib/arrival.js
// كشف الوصول من دومين شقيق (www ← security ← software).
// السكريبت بيشتغل قبل أول رسم عشان اللودر ما يومّضش والستارة هي اللي تفتح.
import { ORIGINS } from "@/lib/site";

const ATTR = "data-arrival";
const PENDING = "pending"; // الصفحة مخفية لحد ما الستارة تتركّب
const DONE = "done"; // الستارة اتركّبت، اللودر لسه ممنوع
const FAILSAFE_MS = 3000; // لو الـ JS وقع، ما نسيبش الصفحة مخفية

// لون brand-dark بتاعك: بيظهر لحظة قبل ما الستارة تتركّب
const BACKGROUND = "#0b2e26";

export const ARRIVAL_SCRIPT = `(function(){try{
var el=document.documentElement;
var origins=${JSON.stringify(Object.values(ORIGINS))};
var ref=document.referrer?new URL(document.referrer).origin:"";
var nav=performance.getEntriesByType("navigation")[0];
var fresh=!nav||nav.type==="navigate";
var calm=matchMedia("(prefers-reduced-motion: reduce)").matches;
if(fresh&&!calm&&ref!==location.origin&&origins.indexOf(ref)>-1){
el.setAttribute("${ATTR}","${PENDING}");
setTimeout(function(){el.setAttribute("${ATTR}","${DONE}")},${FAILSAFE_MS});
}
}catch(e){}})();`;

export const ARRIVAL_CSS = [
  `html[${ATTR}="${PENDING}"]{background:${BACKGROUND}}`,
  `html[${ATTR}="${PENDING}"] body{visibility:hidden}`,
  `html[${ATTR}] #site-loader{display:none!important}`,
].join("");

export const isArrival = () =>
  document.documentElement.hasAttribute(ATTR);

export const finishArrival = () =>
  document.documentElement.setAttribute(ATTR, DONE);