import { Tabs } from '@angular/aria/tabs';
import { Directive, computed, input, model } from '@angular/core';
import { injectPreset } from '../../config/preset';
import { cn } from '../../utils';

export type ScTabsNextOrientation = 'horizontal' | 'vertical';

/**
 * Tabs: a list of tabs and their panels, one shown at a time. Holds the
 * selected tab (`[(value)]`) and the orientation, for the list and the
 * panels.
 */
@Directive({
  selector: '[scTabsNext]',
  exportAs: 'scTabsNext',
  hostDirectives: [Tabs],
  host: {
    '[class]': 'class()',
    '[attr.data-orientation]': 'orientation()',
  },
})
export class ScTabsNext {
  private readonly styles = injectPreset().tabs;

  readonly classInput = input<string>('', { alias: 'class' });
  /** The selected tab's value; `[(value)]`. */
  readonly value = model<string | undefined>(undefined);
  /** The list's direction: its arrow keys, and the panels beside or below. */
  readonly orientation = input<ScTabsNextOrientation>('horizontal');

  protected readonly class = computed(() =>
    cn(this.styles.root, this.classInput()),
  );
}
