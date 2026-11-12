import { Directive, computed, input } from '@angular/core';
import { injectPreset } from '../../config/preset';
import { cn } from '../../utils';

/** A list of menu items. */
@Directive({
  selector: 'ul[scSidebarNextMenu]',
  host: {
    'data-slot': 'sidebar-menu',
    '[class]': 'class()',
  },
})
export class ScSidebarNextMenu {
  private readonly styles = injectPreset().sidebar;
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn(this.styles.menu, this.classInput()),
  );
}
