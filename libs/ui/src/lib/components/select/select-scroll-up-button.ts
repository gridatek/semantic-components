import { DestroyRef, Directive, computed, inject, input } from '@angular/core';
import { injectPreset } from '../../config/preset';
import { cn } from '../../utils';
import { ScSelectPopup } from './select-popup';
import { scrollWhileHovered } from './select-scroll';

/**
 * Shown while the list has more above: hovering it scrolls up. Hidden from
 * screen readers, as Base UI's: the keyboard scrolls by moving through items.
 */
@Directive({
  selector: 'div[scSelectScrollUpButton]',
  host: {
    'aria-hidden': 'true',
    '[attr.hidden]': 'popup.canScrollUp() ? null : ""',
    '[class]': 'class()',
    '(pointerenter)': 'start()',
    '(pointerleave)': 'stop()',
  },
})
export class ScSelectScrollUpButton {
  protected readonly popup = inject(ScSelectPopup);
  private readonly styles = injectPreset().select;
  private readonly scroll = scrollWhileHovered(this.popup, -1);

  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn('sticky top-0', this.styles.scrollUpButton, this.classInput()),
  );

  constructor() {
    inject(DestroyRef).onDestroy(() => this.stop());
  }

  protected start(): void {
    this.scroll.start();
  }

  protected stop(): void {
    this.scroll.stop();
  }
}
