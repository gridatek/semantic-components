import { Directive, computed, inject, input } from '@angular/core';
import { cn } from 'cn';
import { injectStyle } from '../../config/style';
import { ScListboxItem } from './listbox-item';

/** Shows its content (a check) while its option is chosen; at the option's end. */
@Directive({
  selector: '[scListboxItemIndicator]',
  host: {
    'data-slot': 'listbox-item-indicator',
    'aria-hidden': 'true',
    '[attr.data-selected]': 'item.option.selected() || null',
    '[class]': 'class()',
  },
})
export class ScListboxItemIndicator {
  private readonly styles = injectStyle().combobox;
  private readonly item = inject(ScListboxItem);

  readonly classInput = input<string>('', { alias: 'class' });

  private readonly class = computed(() =>
    cn(
      this.styles.itemIndicator,
      !this.item.option.selected() && 'invisible',
      this.classInput(),
    ),
  );
}
