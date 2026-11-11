import { Directive, computed, input } from '@angular/core';
import { injectPreset } from '../../config/preset';
import { cn } from '../../utils';

/** Your text when no option is rendered: shown by the popup, beside the list. */
@Directive({
  selector: 'div[scComboboxNextEmpty]',
  host: {
    'data-slot': 'combobox-empty',
    '[class]': 'class()',
  },
})
export class ScComboboxNextEmpty {
  private readonly styles = injectPreset().combobox;

  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn(this.styles.empty, this.classInput()),
  );
}
