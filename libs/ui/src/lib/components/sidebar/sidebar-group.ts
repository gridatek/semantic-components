import { Directive, computed, input } from '@angular/core';
import { cn } from 'cn';
import { injectPreset } from '../../config/preset';

/** A section of the content: a label, an action, its menu. */
@Directive({
  selector: 'div[scSidebarGroup]',
  host: {
    'data-slot': 'sidebar-group',
    '[class]': 'class()',
  },
})
export class ScSidebarGroup {
  private readonly styles = injectPreset().sidebar;
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn(this.styles.group, this.classInput()),
  );
}
