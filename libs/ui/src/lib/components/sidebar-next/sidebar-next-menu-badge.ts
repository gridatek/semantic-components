import { Directive, computed, input } from '@angular/core';
import { injectPreset } from '../../config/preset';
import { cn } from '../../utils';

/** A count at an item's end. Hidden when collapsed to icons. */
@Directive({
  selector: 'div[scSidebarNextMenuBadge]',
  host: {
    'data-slot': 'sidebar-menu-badge',
    '[class]': 'class()',
  },
})
export class ScSidebarNextMenuBadge {
  private readonly styles = injectPreset().sidebar;
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn(this.styles.menuBadge, this.classInput()),
  );
}
