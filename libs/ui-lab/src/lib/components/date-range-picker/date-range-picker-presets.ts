import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  computed,
  input,
} from '@angular/core';
import { cn } from '@semantic-components/ui';

@Component({
  selector: 'div[scDateRangePickerPresets]',
  template: `
    <ng-content />
  `,
  host: {
    'data-slot': 'date-range-picker-presets',
    '[class]': 'class()',
  },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScDateRangePickerPresets {
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn('flex min-w-[140px] flex-col gap-1 border-r p-3', this.classInput()),
  );
}
