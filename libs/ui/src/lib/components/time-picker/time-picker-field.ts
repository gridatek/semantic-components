import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  computed,
  input,
  model,
} from '@angular/core';

import { cn } from '@semantic-components/utils';

import { ScInputNumber } from '../input-number/input-number';

@Component({
  selector: 'div[sc-time-picker-field]',
  imports: [ScInputNumber],
  template: `
    <div
      [(value)]="value"
      [class]="class()"
      [min]="min()"
      [max]="max()"
      [disabled]="disabled()"
      [showControls]="showControls()"
      [step]="step()"
      sc-input-number
    ></div>
  `,
  host: {
    'data-slot': 'time-picker-field',
  },
  styles: ``,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScTimePickerField {
  readonly value = model<number>(0);
  readonly min = input<number>(0);
  readonly max = input<number>(59);
  readonly step = input<number>(1);
  readonly disabled = input<boolean>(false);
  readonly showControls = input<boolean>(true);
  readonly classInput = input<string>('w-16', { alias: 'class' });

  protected readonly class = computed(() => cn(this.classInput()));
}
