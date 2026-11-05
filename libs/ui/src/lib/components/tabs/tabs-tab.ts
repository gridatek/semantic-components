import { Tab } from '@angular/aria/tabs';
import { Directive, computed, input } from '@angular/core';
import { injectPreset } from '../../config/preset';
import { cn } from '../../utils';

/**
 * A tab (role tab), on your button: its text and icons are yours. A disabled
 * tab is reached by the arrows but not selected.
 */
@Directive({
  selector: 'button[scTabsTab]',
  exportAs: 'scTabsTab',
  hostDirectives: [{ directive: Tab, inputs: ['value', 'disabled', 'id'] }],
  host: {
    type: 'button',
    // A disabled tab is still reached by the arrows (aria-disabled, Aria's
    // way): a native disabled button could not take focus.
    '[attr.disabled]': 'null',
    '[class]': 'class()',
  },
})
export class ScTabsTab {
  private readonly styles = injectPreset().tabs;

  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn(this.styles.trigger, this.classInput()),
  );
}
