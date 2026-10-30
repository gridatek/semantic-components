import { Option } from '@angular/aria/listbox';
import { Directive, computed, inject, input } from '@angular/core';
import { injectPreset } from '../../config/preset';
import { cn } from '../../utils';

/** The check on the selected option: shown only on it. */
@Directive({
  selector: 'span[scSelectNextItemIndicator]',
  host: {
    '[class]': 'class()',
  },
})
export class ScSelectNextItemIndicator {
  private readonly option = inject<Option<string>>(Option);
  private readonly styles = injectPreset().select;

  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn(
      this.styles.itemIndicator,
      !this.option.selected() && 'invisible',
      this.classInput(),
    ),
  );
}
