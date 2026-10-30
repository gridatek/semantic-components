import { Directive, computed, input } from '@angular/core';
import type { ScButtonGroupOrientation } from '@semantic-components/presets';
import { injectPreset } from '../../config/preset';
import { cn } from '../../utils';

/**
 * Buttons (and inputs, selects, text) joined into one: shared borders, the
 * outer corners rounded. Its classes are the preset's; a `group`, named by the
 * consumer (`aria-label`). Tab goes through each button — for arrow keys
 * between them, a Toolbar; for buttons that toggle a state, a Toggle Group.
 */
@Directive({
  selector: 'div[scButtonGroup]',
  host: {
    // Read by the button's xs and sm sizes, and by a group nested in it.
    'data-slot': 'button-group',
    role: 'group',
    '[attr.data-orientation]': 'orientation()',
    '[class]': 'class()',
  },
})
export class ScButtonGroup {
  private readonly styles = injectPreset().buttonGroup;

  readonly classInput = input<string>('', { alias: 'class' });
  readonly orientation = input<ScButtonGroupOrientation>('horizontal');

  protected readonly class = computed(() =>
    cn(this.styles({ orientation: this.orientation() }), this.classInput()),
  );
}
