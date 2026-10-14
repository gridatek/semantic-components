import { FocusTrapFactory } from '@angular/cdk/a11y';
import {
  DOCUMENT,
  DestroyRef,
  Directive,
  ElementRef,
  afterNextRender,
  inject,
} from '@angular/core';

/**
 * Traps focus in an overlay: focuses its first element once rendered, keeps
 * Tab inside, and on the way out gives focus back to where it was — only if
 * it is still in the overlay (or lost to the page). Unlike `cdkTrapFocus`,
 * which always gives it back: focus that moved on (into a dialog opened
 * from a popover, say) is left where it is.
 */
@Directive({ selector: '[scFocusTrap]' })
export class ScFocusTrap {
  constructor() {
    const element = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;
    const document = inject(DOCUMENT);
    // Before the overlay takes focus.
    const previous = document.activeElement as HTMLElement | null;
    const trap = inject(FocusTrapFactory).create(element, true);

    afterNextRender(() => {
      trap.attachAnchors();
      trap.focusInitialElementWhenReady();
    });

    inject(DestroyRef).onDestroy(() => {
      trap.destroy();
      const active = document.activeElement;
      const kept =
        !active || active === document.body || element.contains(active);
      if (kept && previous && previous !== document.body) previous.focus();
    });
  }
}
