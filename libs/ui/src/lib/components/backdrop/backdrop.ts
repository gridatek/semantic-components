import { Component, ViewEncapsulation, computed, input } from '@angular/core';
import { injectPreset } from '../../config/preset';
import { cn } from '../../utils';

/**
 * A dimmed, blurred layer behind an overlay. It fades in when shown and out
 * when it goes: Angular removes it once that animation ends.
 */
@Component({
  selector: 'div[scBackdrop]',
  template: '',
  host: {
    '[class]': 'class()',
    'animate.enter': 'animate-in fade-in-0',
    'animate.leave': 'animate-out fade-out-0',
  },
  encapsulation: ViewEncapsulation.None,
})
export class ScBackdrop {
  // Its shade and blur: the preset's, the same behind every overlay.
  private readonly backdrop = injectPreset().backdrop;

  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn(
      'pointer-events-none fixed inset-0 -z-50 duration-100',
      this.backdrop,
      this.classInput(),
    ),
  );
}
