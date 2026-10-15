import { Directive, computed, input } from '@angular/core';
import { cn } from '@semantic-components/ui';

/** The popover's footer: its cancel and apply buttons, at the end. */
@Directive({
  selector: 'div[scDateRangePickerFooter]',
  host: {
    'data-slot': 'date-range-picker-footer',
    '[class]': 'class()',
  },
})
export class ScDateRangePickerFooter {
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn(
      'mt-3 flex items-center justify-end gap-2 border-t pt-3',
      this.classInput(),
    ),
  );
}
