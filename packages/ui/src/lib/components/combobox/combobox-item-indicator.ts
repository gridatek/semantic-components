import { Option } from '@angular/aria/listbox';
import { Directive, computed, inject, input } from '@angular/core';
import { cn } from 'cn';
import { injectStyle } from '../../config/style';

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
  private readonly styles = injectStyle().combobox;

  readonly classInput = input<string>('', { alias: 'class' });

  private readonly class = computed(() =>
    cn(
      this.styles.itemIndicator,
      !this.option.selected() && 'invisible',
      this.classInput(),
    ),
  );
}
