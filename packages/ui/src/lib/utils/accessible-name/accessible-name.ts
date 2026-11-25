import {
  ApplicationRef,
  DestroyRef,
  ElementRef,
  afterNextRender,
  inject,
} from '@angular/core';

/**
 * For the library's parts that need a name, which the library never writes:
 * warns, in development, when the consumer gave none — no `aria-label`,
 * `aria-labelledby`, `<label>` or text. Call it in the part's constructor.
 * It looks once, when the app is stable after the part's first render: a
 * field's label and its control are tied a change detection later (the
 * control's id reaches the label's `for`), so looking right after the first
 * render warned about labelled controls. Internal.
 */
export function ɵwarnIfUnnamed(part: string): void {
  if (typeof ngDevMode === 'undefined' || !ngDevMode) return;
  const element = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;
  const app = inject(ApplicationRef);
  let destroyed = false;
  inject(DestroyRef).onDestroy(() => (destroyed = true));
  afterNextRender(() => {
    void app.whenStable().then(() => {
      if (destroyed) return;
      const labels = (element as HTMLElement & { labels?: NodeList | null })
        .labels;
      const named =
        !!element.getAttribute('aria-label')?.trim() ||
        element.hasAttribute('aria-labelledby') ||
        !!labels?.length ||
        !!element.getAttribute('title')?.trim() ||
        !!element.textContent?.trim() ||
        // A named image or element inside names it too.
        !!element.querySelector('img[alt]:not([alt=""]), [aria-label]');
      if (!named) {
        console.warn(
          `${part} has no name: give it aria-label or aria-labelledby.`,
          element,
        );
      }
    });
  });
}
