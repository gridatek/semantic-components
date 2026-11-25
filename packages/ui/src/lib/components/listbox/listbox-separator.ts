import { Directive, computed, input } from '@angular/core';
import { cn } from 'cn';
import { injectStyle } from '../../config/style';

/** A line between groups: the style's combobox separator; hidden from screen readers. */
@Directive({
  selector: '[scListboxSeparator]',
  host: {
    'data-slot': 'listbox-separator',
    'aria-hidden': 'true',
    '[class]': 'class()',
  },
})
export class ScListboxSeparator {
  private readonly styles = injectStyle().combobox;

  readonly classInput = input<string>('', { alias: 'class' });

  private readonly class = computed(() =>
    cn(this.styles.separator, 'shrink-0', this.classInput()),
  );
}
