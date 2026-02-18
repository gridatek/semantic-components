import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  model,
  ViewEncapsulation,
} from '@angular/core';
import type { FormValueControl } from '@angular/forms/signals';
import { cn } from '@semantic-components/ui';
import { ScProgressIndicator } from './progress-indicator';

@Component({
  selector: '[scProgress]',
  imports: [ScProgressIndicator],
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
    <div scProgressIndicator></div>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScProgress implements FormValueControl<number | null> {
  readonly classInput = input<string>('', { alias: 'class' });
  readonly value = model<number | null>(null);
  readonly max = input<number | undefined>(100);

  readonly percentage = computed(() => {
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
      'bg-muted relative flex h-1 w-full items-center overflow-x-hidden rounded-full',
      this.classInput(),
    ),
  );
}
