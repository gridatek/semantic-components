import { Directive, computed, input } from '@angular/core';
import { cn } from '../../utils';

/** A group's title (a `button`, to open and close a collapsible group). Fades out when collapsed to icons. */
@Directive({
  selector: 'div[scSidebarGroupLabel], button[scSidebarGroupLabel]',
  host: {
    'data-slot': 'sidebar-group-label',
    '[class]': 'class()',
  },
})
export class ScSidebarGroupLabel {
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn(
      'flex h-8 shrink-0 items-center rounded-md px-2 text-xs font-medium text-sidebar-foreground/70 ring-sidebar-ring outline-hidden transition-[margin,opacity] duration-200 ease-linear group-data-[collapsible=icon]:-mt-8 group-data-[collapsible=icon]:opacity-0 focus-visible:ring-2 [&>svg]:size-4 [&>svg]:shrink-0',
      this.classInput(),
    ),
  );
}
