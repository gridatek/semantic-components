import { Directive, computed, input } from '@angular/core';
import { injectPreset } from '../../config/preset';
import { cn } from '../../utils';

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
  private readonly styles = injectPreset().combobox;

  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn(this.styles.separator, this.classInput()),
  );
}
