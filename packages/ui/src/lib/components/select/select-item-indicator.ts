import { Option } from '@angular/aria/listbox';
import { Directive, computed, inject, input } from '@angular/core';
import { cn } from 'cn';
import { injectStyle } from '../../config/style';

/** The check on the selected option: shown only on it. */
@Directive({
  selector: 'span[scSelectItemIndicator]',
  host: {
    '[class]': 'class()',
  },
})
export class ScSelectItemIndicator {
  private readonly option = inject<Option<string>>(Option);
  private readonly styles = injectStyle().select;

  readonly classInput = input<string>('', { alias: 'class' });

  private readonly class = computed(() =>
    cn(
      this.styles.itemIndicator,
      !this.option.selected() && 'invisible',
      this.classInput(),
    ),
  );
}
