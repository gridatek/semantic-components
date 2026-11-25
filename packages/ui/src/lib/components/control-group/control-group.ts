import { Directive, computed, input } from '@angular/core';
import type { ScControlGroupOrientation } from '@semantic-components/styles';
import { cn } from 'cn';
import { injectStyle } from '../../config/style';

/**
 * Buttons (and inputs, selects, text) joined into one: shared borders, the
 * outer corners rounded. Its classes are the style's; a `group`, named by the
 * consumer (`aria-label`). Tab goes through each button — for arrow keys
 * between them, a Toolbar; for buttons that toggle a state, a Toggle Group.
 */
@Directive({
  selector: 'div[scControlGroup]',
  host: {
    // Read by the button's xs and sm sizes, and by a group nested in it.
    'data-slot': 'control-group',
    role: 'group',
    '[attr.data-orientation]': 'orientation()',
    '[class]': 'class()',
  },
})
export class ScControlGroup {
  private readonly styles = injectStyle().controlGroup;

  readonly classInput = input<string>('', { alias: 'class' });
  readonly orientation = input<ScControlGroupOrientation>('horizontal');

  private readonly class = computed(() =>
    cn(this.styles({ orientation: this.orientation() }), this.classInput()),
  );
}
