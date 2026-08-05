import { Directive, computed, inject, input } from '@angular/core';
import { ScDateRange, cn } from '@semantic-components/ui';
import { ScDateRangePicker } from './date-range-picker';

@Directive({
  selector: 'button[scDateRangePickerPreset]',
  host: {
    type: 'button',
    '[class]': 'class()',
    '(click)': 'selectPreset()',
  },
})
export class ScDateRangePickerPreset {
  private readonly picker = inject(ScDateRangePicker);

  readonly classInput = input<string>('', { alias: 'class' });
  readonly value = input.required<ScDateRange>();

  private readonly isActive = computed(() => {
    const current = this.picker.value();
    const preset = this.value();
    if (!current.from || !current.to || !preset.from || !preset.to)
      return false;
    return current.from.equals(preset.from) && current.to.equals(preset.to);
  });

  protected readonly class = computed(() =>
    cn(
      'text-start px-3 py-2 text-sm rounded-md',
      'hover:bg-accent hover:text-accent-foreground',
      this.isActive() && 'bg-accent text-accent-foreground',
      this.classInput(),
    ),
  );

  protected selectPreset(): void {
    this.picker.onValueChange({ ...this.value() });
  }
}
