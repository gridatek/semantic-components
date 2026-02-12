import { Directive, computed, input } from '@angular/core';
import { cn } from '../../utils';

@Directive({
  selector: 'div[sc-sidebar-separator]',
  host: {
    'data-slot': 'sidebar-separator',
    '[class]': 'class()',
  },
})
export class ScSidebarSeparator {
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn(
      'mx-2 h-px w-auto bg-sidebar-border',
      'group-data-[collapsible=icon]:mx-2',
      this.classInput(),
    ),
  );
}
