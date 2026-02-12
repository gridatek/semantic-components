import { Directive, computed, input } from '@angular/core';
import { cn } from '../../utils';

@Directive({
  selector: 'div[sc-sidebar-content]',
  host: {
    'data-slot': 'sidebar-content',
    '[class]': 'class()',
  },
})
export class ScSidebarContent {
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn(
      'flex min-h-0 flex-1 flex-col gap-0 overflow-auto group-data-[collapsible=icon]:overflow-hidden',
      this.classInput(),
    ),
  );
}
