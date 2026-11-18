import { Directive, computed, input } from '@angular/core';
import { cn } from 'cn';
import { injectStyle } from '../../config/style';

/** The top of the sidebar: a team switcher, a search… */
@Directive({
  selector: 'div[scSidebarHeader]',
  host: {
    'data-slot': 'sidebar-header',
    '[class]': 'class()',
  },
})
export class ScSidebarHeader {
  private readonly styles = injectStyle().sidebar;
  readonly classInput = input<string>('', { alias: 'class' });

  private readonly class = computed(() =>
    cn(this.styles.header, this.classInput()),
  );
}
