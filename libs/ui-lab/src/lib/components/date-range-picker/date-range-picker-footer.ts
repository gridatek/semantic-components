import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  computed,
  inject,
  input,
} from '@angular/core';
import { cn } from '@semantic-components/ui';
import { ScDateRangePicker } from './date-range-picker';

@Component({
  selector: 'div[scDateRangePickerFooter]',
  template: `
    <div class="ml-auto flex gap-2">
      <button
        type="button"
        class="border-input hover:bg-accent inline-flex h-8 items-center justify-center rounded-md border px-3 text-sm font-medium"
        (click)="picker.onCancel()"
      >
        Cancel
      </button>
      <button
        type="button"
        class="bg-primary text-primary-foreground hover:bg-primary/90 inline-flex h-8 items-center justify-center rounded-md px-3 text-sm font-medium disabled:opacity-50"
        [disabled]="!picker.value().from || !picker.value().to"
        (click)="picker.onApply()"
      >
        Apply
      </button>
    </div>
  `,
  host: {
    'data-slot': 'date-range-picker-footer',
    '[class]': 'class()',
  },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScDateRangePickerFooter {
  readonly picker = inject(ScDateRangePicker);
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn(
      'mt-3 flex items-center justify-between border-t pt-3',
      this.classInput(),
    ),
  );
}
