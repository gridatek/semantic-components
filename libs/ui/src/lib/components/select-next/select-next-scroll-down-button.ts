import { DestroyRef, Directive, computed, inject, input } from '@angular/core';
import { injectPreset } from '../../config/preset';
import { cn } from '../../utils';
import { ScSelectNextPopup } from './select-next-popup';
import { scrollWhileHovered } from './select-next-scroll';

/**
 * Shown while the list has more below: hovering it scrolls down. Hidden from
 * screen readers, as Base UI's: the keyboard scrolls by moving through items.
 */
@Directive({
  selector: 'div[scSelectNextScrollDownButton]',
  host: {
    'aria-hidden': 'true',
    '[attr.hidden]': 'popup.canScrollDown() ? null : ""',
    '[class]': 'class()',
    '(pointerenter)': 'start()',
    '(pointerleave)': 'stop()',
  },
})
export class ScSelectNextScrollDownButton {
  protected readonly popup = inject(ScSelectNextPopup);
  private readonly styles = injectPreset().select;
  private readonly scroll = scrollWhileHovered(this.popup, 1);

  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn('sticky bottom-0', this.styles.scrollDownButton, this.classInput()),
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
