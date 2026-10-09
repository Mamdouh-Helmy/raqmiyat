// lib/useIsClient.js
import { useSyncExternalStore } from "react";

const subscribe = () => () => {};

// false على السيرفر وأثناء الـ hydration، true على الكلينت بعدها.
// بديل نضيف لـ useState + useEffect(() => setMounted(true), [])
export function useIsClient() {
  return useSyncExternalStore(
    subscribe,
    () => true,
    () => false
  );
}