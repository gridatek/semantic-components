import { Component, ViewEncapsulation, computed, input } from '@angular/core';
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
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn(
      'pointer-events-none fixed inset-0 -z-50 bg-black/10 duration-100 supports-backdrop-filter:backdrop-blur-xs',
      this.classInput(),
    ),
  );
}
