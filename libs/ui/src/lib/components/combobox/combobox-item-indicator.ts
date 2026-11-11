import { Option } from '@angular/aria/listbox';
import { Directive, computed, inject, input } from '@angular/core';
import { injectPreset } from '../../config/preset';
import { cn } from '../../utils';

/** Round your check icon, in an option: shown only on a selected one. */
@Directive({
  selector: 'span[scComboboxItemIndicator]',
  host: {
    'aria-hidden': 'true',
    '[class]': 'class()',
  },
})
export class ScComboboxItemIndicator {
  private readonly option = inject<Option<unknown>>(Option);
  private readonly styles = injectPreset().combobox;

  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn(
      this.styles.itemIndicator,
      !this.option.selected() && 'invisible',
      this.classInput(),
    ),
  );
}
