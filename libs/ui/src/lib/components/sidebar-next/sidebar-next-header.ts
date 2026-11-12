import { Directive, computed, input } from '@angular/core';
import { injectPreset } from '../../config/preset';
import { cn } from '../../utils';

/** The top of the sidebar: a team switcher, a search… */
@Directive({
  selector: 'div[scSidebarNextHeader]',
  host: {
    'data-slot': 'sidebar-header',
    '[class]': 'class()',
  },
})
export class ScSidebarNextHeader {
  private readonly styles = injectPreset().sidebar;
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn(this.styles.header, this.classInput()),
  );
}
