import { useSyncExternalStore } from "react";
import { getAll, subscribe } from "./store";

export function useStore() {
  return useSyncExternalStore(
    subscribe,
    () => getAll(),
    () => getAll(),
  );
}
