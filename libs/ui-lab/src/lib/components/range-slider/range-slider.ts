import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  model,
  ViewEncapsulation,
} from '@angular/core';
import { cn } from '@semantic-components/ui';

@Component({
  selector: 'div[scRangeSlider]',
  host: {
    '[class]': 'class()',
  },
  template: `
    <div class="absolute h-1 w-full rounded-full bg-muted"></div>
    <div
      class="absolute h-1 rounded-full bg-primary"
      [style.left.%]="minPercent()"
      [style.right.%]="rightPercent()"
    ></div>
    <ng-content />
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScRangeSlider {
  readonly classInput = input<string>('', { alias: 'class' });

  readonly minValue = model<number>(0);
  readonly maxValue = model<number>(100);

  readonly min = input<number>(0);
  readonly max = input<number>(100);
  readonly step = input<number>(1);
  readonly disabled = input<boolean>(false);

  protected readonly class = computed(() =>
    cn('relative flex h-3 w-full items-center', this.classInput()),
  );

  readonly minPercent = computed(() => {
    const range = this.max() - this.min();
    return range === 0 ? 0 : ((this.minValue() - this.min()) / range) * 100;
  });

  readonly maxPercent = computed(() => {
    const range = this.max() - this.min();
    return range === 0 ? 0 : ((this.maxValue() - this.min()) / range) * 100;
  });

  protected readonly rightPercent = computed(() => 100 - this.maxPercent());

  clampMin(val: number): number {
    return Math.min(val, this.maxValue());
  }

  clampMax(val: number): number {
    return Math.max(val, this.minValue());
  }
}
