import { Directive, computed, inject, input } from '@angular/core';
import { cn } from '@semantic-components/ui';
import { ScSpeedDialNext } from './speed-dial-next';

/** Dims what is behind while open; a click on it closes the dial. */
@Directive({
  selector: 'div[scSpeedDialNextBackdrop]',
  host: {
    'data-slot': 'speed-dial-backdrop',
    'aria-hidden': 'true',
    '[attr.data-open]': 'dial.open() || null',
    '[class]': 'class()',
    '(click)': 'dial.close()',
  },
})
export class ScSpeedDialNextBackdrop {
  protected readonly dial = inject(ScSpeedDialNext);

  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn(
      'fixed inset-0 -z-10 bg-black/40 transition-opacity duration-200',
      !this.dial.open() && 'pointer-events-none opacity-0',
      this.classInput(),
    ),
  );
}
