import { Directive, computed, input } from '@angular/core';
import { cn } from '../../utils';

@Directive({
  selector: 'div[sc-sidebar-group-label]',
  host: {
    'data-slot': 'sidebar-group-label',
    '[class]': 'class()',
  },
})
export class ScSidebarGroupLabel {
  readonly classInput = input<string>('', { alias: 'class' });

  readonly asChild = input<boolean>(false);

  protected readonly class = computed(() =>
    cn(
      'flex h-8 shrink-0 items-center rounded-md px-2 text-xs font-medium text-sidebar-foreground/70 outline-none ring-sidebar-ring transition-[margin,opa] duration-200 ease-linear focus-visible:ring-2 [&>svg]:size-4 [&>svg]:shrink-0',
      'group-data-[collapsible=icon]:-mt-8 group-data-[collapsible=icon]:opacity-0',
      this.classInput(),
    ),
  );
}
