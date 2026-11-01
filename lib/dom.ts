/** True when a key event comes from a text field, so global shortcuts must stay out of the way. */
export function isTyping(el: EventTarget | null) {
  return (
    el instanceof HTMLElement &&
    (el.isContentEditable || ["INPUT", "TEXTAREA", "SELECT"].includes(el.tagName)) &&
    // A field in a dialog that just closed may keep focus until the async `close` event runs.
    !el.closest("dialog:not([open])")
  );
}

/** Returns focus after a dialog closes. With no real opener (shortcut from <body>), drop focus so it can't stay on a hidden field. */
export function restoreFocus(opener: HTMLElement | null) {
  if (opener && opener !== document.body && opener.isConnected) opener.focus();
  else (document.activeElement as HTMLElement | null)?.blur();
}
