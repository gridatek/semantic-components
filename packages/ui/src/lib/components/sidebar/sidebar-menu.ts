import { Directive, computed, input } from '@angular/core';
import { cn } from 'cn';
import { injectStyle } from '../../config/style';

/** A list of menu items. */
@Directive({
  selector: 'ul[scSidebarMenu]',
  host: {
    'data-slot': 'sidebar-menu',
    '[class]': 'class()',
  },
})
export class ScSidebarMenu {
  private readonly styles = injectStyle().sidebar;
  readonly classInput = input<string>('', { alias: 'class' });

  private readonly class = computed(() =>
    cn(this.styles.menu, this.classInput()),
  );
}
