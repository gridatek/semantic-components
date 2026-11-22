import { DestroyRef, Directive, computed, inject, input } from '@angular/core';
import { cn } from 'cn';
import { injectStyle } from '../../config/style';
import { ScMeter } from './meter';

let nextId = 0;

/** The meter's visible name: the style's progress label. */
@Directive({
  selector: '[scMeterLabel]',
  host: {
    'data-slot': 'meter-label',
    '[attr.id]': 'id',
    '[class]': 'class()',
  },
})
export class ScMeterLabel {
  private readonly styles = injectStyle().progress;
  private readonly meter = inject(ScMeter);

  readonly classInput = input<string>('', { alias: 'class' });

  private readonly id = `sc-meter-label-${nextId++}`;

  private readonly class = computed(() =>
    cn(this.styles.label, this.classInput()),
  );

  constructor() {
    this.meter.labelId.set(this.id);
    inject(DestroyRef).onDestroy(() => {
      if (this.meter.labelId() === this.id) this.meter.labelId.set(null);
    });
  }
}
