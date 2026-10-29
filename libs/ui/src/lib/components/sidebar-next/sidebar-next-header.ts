import { Directive, computed, input } from '@angular/core';
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
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn('flex flex-col gap-2 p-2', this.classInput()),
  );
}
