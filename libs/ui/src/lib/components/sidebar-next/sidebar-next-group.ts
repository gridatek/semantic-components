import { Directive, computed, input } from '@angular/core';
import { injectPreset } from '../../config/preset';
import { cn } from '../../utils';

/** A section of the content: a label, an action, its menu. */
@Directive({
  selector: 'div[scSidebarNextGroup]',
  host: {
    'data-slot': 'sidebar-group',
    '[class]': 'class()',
  },
})
export class ScSidebarNextGroup {
  private readonly styles = injectPreset().sidebar;
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn(this.styles.group, this.classInput()),
  );
}
