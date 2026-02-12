import { Directive, computed, input } from '@angular/core';
import { cn } from '../../utils';

const sizeStyles: Record<'sm' | 'md', string> = {
  sm: 'text-xs',
  md: 'text-sm',
};

@Directive({
  selector: 'a[sc-sidebar-menu-sub-button], button[sc-sidebar-menu-sub-button]',
  host: {
    'data-slot': 'sidebar-menu-sub-button',
    '[class]': 'class()',
    '[attr.data-active]': 'isActive() || null',
    '[attr.data-size]': 'size()',
  },
})
export class ScSidebarMenuSubButton {
  readonly classInput = input<string>('', { alias: 'class' });

  readonly size = input<'sm' | 'md'>('md');
  readonly isActive = input<boolean>(false);

  protected readonly class = computed(() => {
    const size = this.size();
    return cn(
      'flex h-7 min-w-0 -translate-x-px items-center gap-2 overflow-hidden rounded-md px-2 text-sidebar-foreground outline-none ring-sidebar-ring hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 active:bg-sidebar-accent active:text-sidebar-accent-foreground disabled:pointer-events-none disabled:opacity-50 aria-disabled:pointer-events-none aria-disabled:opacity-50 [&>span:last-child]:truncate [&>svg]:size-4 [&>svg]:shrink-0 [&>svg]:text-sidebar-accent-foreground',
      'data-[active=true]:bg-sidebar-accent data-[active=true]:text-sidebar-accent-foreground',
      sizeStyles[size],
      this.classInput(),
    );
  });
}
