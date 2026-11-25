import { Directive, computed, input } from '@angular/core';
import { cn } from 'cn';
import { injectStyle } from '../../config/style';

/** Your text when no option is rendered: shown by the popup, beside the list. */
@Directive({
  selector: 'div[scComboboxEmpty]',
  host: {
    'data-slot': 'combobox-empty',
    '[class]': 'class()',
  },
})
export class ScComboboxEmpty {
  private readonly styles = injectStyle().combobox;

  readonly classInput = input<string>('', { alias: 'class' });

  private readonly class = computed(() =>
    cn(this.styles.empty, this.classInput()),
  );
}
