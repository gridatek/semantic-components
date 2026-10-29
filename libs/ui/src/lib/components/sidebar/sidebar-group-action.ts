import { Directive, computed, input } from '@angular/core';
import { cn } from '../../utils';

/** A button at a group's end (add…): your icon and its name (`sr-only`). */
@Directive({
  selector: 'button[scSidebarGroupAction]',
  host: {
    'data-slot': 'sidebar-group-action',
    type: 'button',
    '[class]': 'class()',
  },
})
export class ScSidebarGroupAction {
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn(
      'absolute top-3.5 end-3 flex aspect-square w-5 items-center justify-center rounded-md p-0 text-sidebar-foreground ring-sidebar-ring outline-hidden transition-transform group-data-[collapsible=icon]:hidden after:absolute after:-inset-2 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 md:after:hidden [&>svg]:size-4 [&>svg]:shrink-0',
      this.classInput(),
    ),
  );
}
