/** Before a held button repeats, and how often then (as Base UI). */
const REPEAT_DELAY = 400;
const REPEAT_INTERVAL = 60;

/**
 * Press and hold: does `action` at once, then repeatedly while the pointer
 * stays down; stops on release, cancel or leaving the button.
 */
export class ScNumberFieldHold {
  private timeout: ReturnType<typeof setTimeout> | undefined;
  private interval: ReturnType<typeof setInterval> | undefined;
  private release: (() => void) | null = null;
  /** A pointer press happened: the click that follows is already handled. */
  pressed = false;

  start(event: PointerEvent, action: () => boolean): void {
    if (event.button !== 0) return;
    // Focus stays where it is (the input, if it has it).
    event.preventDefault();
    this.stop();
    this.pressed = true;
    if (!action()) return;
    this.timeout = setTimeout(() => {
      this.interval = setInterval(() => {
        if (!action()) this.stop();
      }, REPEAT_INTERVAL);
    }, REPEAT_DELAY);
    const target = event.currentTarget as HTMLElement;
    const stop = () => this.stop();
    target.addEventListener('pointerleave', stop);
    window.addEventListener('pointerup', stop);
    window.addEventListener('pointercancel', stop);
    window.addEventListener('blur', stop);
    this.release = () => {
      target.removeEventListener('pointerleave', stop);
      window.removeEventListener('pointerup', stop);
      window.removeEventListener('pointercancel', stop);
      window.removeEventListener('blur', stop);
    };
  }

  stop(): void {
    clearTimeout(this.timeout);
    clearInterval(this.interval);
    if (this.release) {
      // The click after the release (if any) comes first.
      setTimeout(() => (this.pressed = false));
    }
    this.release?.();
    this.release = null;
  }
}
