import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  model,
  ViewEncapsulation,
} from '@angular/core';
import type { FormValueControl } from '@angular/forms/signals';
import { cn } from '../../utils';

@Component({
  selector: 'div[sc-progress]',
  host: {
    role: 'progressbar',
    'data-slot': 'progress',
    '[class]': 'class()',
    '[attr.aria-valuemin]': '0',
    '[attr.aria-valuemax]': 'max()',
    '[attr.aria-valuenow]': 'value()',
    '[attr.data-state]': 'state()',
  },
  template: `
    <div
      data-slot="progress-indicator"
      [class]="indicatorClass()"
      [style.transform]="'translateX(-' + (100 - percentage()) + '%)'"
    ></div>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScProgress implements FormValueControl<number | null> {
  readonly classInput = input<string>('', { alias: 'class' });
  readonly value = model<number | null>(null);
  readonly max = input<number | undefined>(100);

  protected readonly percentage = computed(() => {
    const val = this.value();
    const maxVal = this.max() ?? 100;
    if (val === null || maxVal === 0) return 0;
    return Math.min(Math.max((val / maxVal) * 100, 0), 100);
  });

  protected readonly state = computed(() => {
    const val = this.value();
    const maxVal = this.max() ?? 100;
    if (val === null) return 'indeterminate';
    return val >= maxVal ? 'complete' : 'loading';
  });

  protected readonly class = computed(() =>
    cn(
      'relative h-2 w-full overflow-hidden rounded-full bg-primary/20',
      this.classInput(),
    ),
  );

  protected readonly indicatorClass = computed(() =>
    cn('h-full w-full flex-1 bg-primary transition-all'),
  );
}
