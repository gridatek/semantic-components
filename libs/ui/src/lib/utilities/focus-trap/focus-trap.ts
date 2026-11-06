import { FocusTrapFactory } from '@angular/cdk/a11y';
import {
  Platform,
  _getFocusedElementPierceShadowDom,
} from '@angular/cdk/platform';
import {
  DOCUMENT,
  DestroyRef,
  Directive,
  ElementRef,
  afterNextRender,
  booleanAttribute,
  effect,
  inject,
  input,
} from '@angular/core';

/**
 * Traps focus in an overlay: focuses its first element once rendered, keeps
 * Tab inside, and on the way out gives focus back to where it was — only if
 * it is still in the overlay (or lost to the page), as the CDK's Dialog does.
 * `cdkTrapFocus` always gives it back: focus that moved on (into a dialog
 * opened from a popover, say) would be taken out of it.
 *
 * `[scFocusTrap]="false"`: focus still moves in and comes back, but Tab may
 * leave (a non-modal popover).
 */
@Directive({ selector: '[scFocusTrap]' })
export class ScFocusTrap {
  /** Keeps Tab inside (on by default). */
  readonly trapped = input(true, {
    alias: 'scFocusTrap',
    transform: (value: unknown) => value === '' || booleanAttribute(value),
  });

  constructor() {
    if (!inject(Platform).isBrowser) return;
    const element = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;
    const document = inject(DOCUMENT);
    // Before the overlay takes focus.
    const previous = _getFocusedElementPierceShadowDom();
    const trap = inject(FocusTrapFactory).create(element, true);

    effect(() => {
      trap.enabled = this.trapped();
    });

    afterNextRender(() => {
      trap.attachAnchors();
      trap.focusInitialElementWhenReady();
    });

    inject(DestroyRef).onDestroy(() => {
      trap.destroy();
      const active = _getFocusedElementPierceShadowDom();
      const kept =
        !active || active === document.body || element.contains(active);
      if (kept && previous && previous !== document.body) previous.focus();
    });
  }
}
