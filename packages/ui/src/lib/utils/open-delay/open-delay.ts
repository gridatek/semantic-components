import { DestroyRef, type WritableSignal, inject } from '@angular/core';

/** The pointer's grace to cross from a trigger onto its overlay (ms). */
export const SC_HOVER_BRIDGE = 100;

/**
 * Opening and closing after a delay — an overlay opened by hover (Tooltip,
 * a Popover's `openOnHover`): open after `delay`, close after `closeDelay`
 * (at least the hover bridge, time to reach the overlay), held open while the
 * pointer is on it. Shared by the overlays. In an injection context.
 */
export class ScOpenDelay {
  private timer: ReturnType<typeof setTimeout> | undefined;

  constructor(private readonly open: WritableSignal<boolean>) {
    inject(DestroyRef).onDestroy(() => this.cancel());
  }

  /** Opens after `delay` ms — at once for 0. */
  openSoon(delay: number): void {
    this.cancel();
    if (delay <= 0) this.open.set(true);
    else this.timer = setTimeout(() => this.open.set(true), delay);
  }

  /** Closes after `closeDelay` ms, or the hover bridge if longer. */
  closeSoon(closeDelay: number): void {
    this.cancel();
    if (!this.open()) return;
    this.timer = setTimeout(
      () => this.open.set(false),
      Math.max(closeDelay, SC_HOVER_BRIDGE),
    );
  }

  /** The pointer is on the overlay: whatever was coming, isn't. */
  cancel(): void {
    clearTimeout(this.timer);
  }
}
