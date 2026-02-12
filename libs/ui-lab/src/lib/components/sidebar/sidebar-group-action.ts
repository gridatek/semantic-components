import { Directive, computed, input } from '@angular/core';
import { cn } from '../../utils';

@Directive({
  selector: 'button[sc-sidebar-group-action]',
  host: {
    'data-slot': 'sidebar-group-action',
    '[class]': 'class()',
  },
})
export class ScSidebarGroupAction {
  readonly classInput = input<string>('', { alias: 'class' });

  readonly asChild = input<boolean>(false);

  protected readonly class = computed(() =>
    cn(
      'absolute right-3 top-3.5 flex aspect-square w-5 items-center justify-center rounded-md p-0 text-sidebar-foreground outline-none ring-sidebar-ring transition-transform hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 [&>svg]:size-4 [&>svg]:shrink-0',
      'after:absolute after:-inset-2 after:md:hidden',
      'group-data-[collapsible=icon]:hidden',
      this.classInput(),
    ),
  );
}
