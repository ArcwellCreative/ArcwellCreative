import type { MouseEvent } from "react";

// Lets any component (e.g. a hero card) tell the Services accordion which
// panel to open, without lifting that state up through the whole tree.
export const OPEN_SERVICE_EVENT = "arcwell:open-service";

export function dispatchOpenService(index: number) {
  window.dispatchEvent(new CustomEvent<number>(OPEN_SERVICE_EVENT, { detail: index }));
}

export function handleHashLinkClick(
  event: MouseEvent<HTMLAnchorElement>,
  href: string,
) {
  if (!href.startsWith("#")) return;

  const id = href.slice(1);
  const el = document.getElementById(id);
  if (!el) return;

  event.preventDefault();
  el.scrollIntoView({ behavior: "smooth", block: "start" });

  // Keep the hash in the URL (for deep-linking/back-button) without
  // triggering the browser's own jump, which we've already done smoothly.
  history.pushState(null, "", href);
}
