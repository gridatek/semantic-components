import { Directive, computed, input } from '@angular/core';
import { injectPreset } from '../../config/preset';
import { cn } from '../../utils';

/** A chip: one of the selected values (`value`), its label written inside. */
@Directive({
  selector: 'span[scComboboxChip]',
  host: {
    'data-slot': 'combobox-chip',
    '[class]': 'class()',
  },
})
export class ScComboboxChip<T = unknown> {
  private readonly styles = injectPreset().combobox;

  readonly classInput = input<string>('', { alias: 'class' });
  /** The value it shows: what its remove button removes. */
  readonly value = input.required<T>();

  protected readonly class = computed(() =>
    cn(this.styles.chip, this.classInput()),
  );
}
