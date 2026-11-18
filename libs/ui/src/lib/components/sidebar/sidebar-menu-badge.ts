import { Directive, computed, input } from '@angular/core';
import { cn } from 'cn';
import { injectStyle } from '../../config/style';

/** A count at an item's end. Hidden when collapsed to icons. */
@Directive({
  selector: 'div[scSidebarMenuBadge]',
  host: {
    'data-slot': 'sidebar-menu-badge',
    '[class]': 'class()',
  },
})
export class ScSidebarMenuBadge {
  private readonly styles = injectStyle().sidebar;
  readonly classInput = input<string>('', { alias: 'class' });

  private readonly class = computed(() =>
    cn(this.styles.menuBadge, this.classInput()),
  );
}
