import { Directive, computed, input } from '@angular/core';
import { cn } from '../../utils';

@Directive({
  selector: 'div[sc-sidebar-group]',
  host: {
    'data-slot': 'sidebar-group',
    '[class]': 'class()',
  },
})
export class ScSidebarGroup {
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn('relative flex w-full min-w-0 flex-col p-2', this.classInput()),
  );
}
