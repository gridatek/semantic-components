import { Directive, computed, input } from '@angular/core';
import { cn } from '../../utils';

/** The bottom of the sidebar: the user, settings… */
@Directive({
  selector: 'div[scSidebarFooter]',
  host: {
    'data-slot': 'sidebar-footer',
    '[class]': 'class()',
  },
})
export class ScSidebarFooter {
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn('flex flex-col gap-2 p-2', this.classInput()),
  );
}
