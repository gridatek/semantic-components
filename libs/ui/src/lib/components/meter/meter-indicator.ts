import { Directive, computed, inject, input } from '@angular/core';
import { cn } from 'cn';
import { ScMeter } from './meter';

/** The bar filled to the value: from the line's start (the right, right to left). */
@Directive({
  selector: 'div[scMeterIndicator]',
  host: {
    'data-slot': 'meter-indicator',
    '[style.width.%]': 'meter.percent()',
    '[class]': 'class()',
  },
})
export class ScMeterIndicator {
  private readonly meter = inject(ScMeter);

  readonly classInput = input<string>('', { alias: 'class' });

  private readonly class = computed(() =>
    cn('bg-primary h-full transition-[width]', this.classInput()),
  );
}
