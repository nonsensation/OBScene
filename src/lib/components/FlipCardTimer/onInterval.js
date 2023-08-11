import { onDestroy } from "svelte";

export const onInterval = (cb, timer) => {
  const interval = setInterval(cb, timer);

  onDestroy(() => clearInterval(interval));
};