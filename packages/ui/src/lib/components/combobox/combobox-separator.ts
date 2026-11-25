import { Directive, computed, input } from '@angular/core';
import { cn } from 'cn';
import { injectStyle } from '../../config/style';

/** A line between groups. Decorative: the groups are named. */
@Directive({
  selector: 'div[scComboboxSeparator]',
  host: {
    'data-slot': 'combobox-separator',
    'aria-hidden': 'true',
    '[class]': 'class()',
  },
})
export class ScComboboxSeparator {
  private readonly styles = injectStyle().combobox;

  readonly classInput = input<string>('', { alias: 'class' });

  private readonly class = computed(() =>
    cn(this.styles.separator, this.classInput()),
  );
}
