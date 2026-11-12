import { TabPanel } from '@angular/aria/tabs';
import { Directive, computed, input } from '@angular/core';
import { cn } from 'cn';
import { injectPreset } from '../../config/preset';

/**
 * A tab's panel (role tabpanel), named by its tab, shown while its tab is
 * selected. Its content goes in an `ng-template scTabsContent` (Angular
 * Aria's way): created when the panel is shown.
 */
@Directive({
  selector: '[scTabsPanel]',
  exportAs: 'scTabsPanel',
  hostDirectives: [{ directive: TabPanel, inputs: ['value', 'id'] }],
  host: {
    '[class]': 'class()',
  },
})
export class ScTabsPanel {
  private readonly styles = injectPreset().tabs;

  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    // Aria makes a hidden panel inert; it is not shown either.
    cn(this.styles.panel, '[[inert]]:hidden', this.classInput()),
  );
}
