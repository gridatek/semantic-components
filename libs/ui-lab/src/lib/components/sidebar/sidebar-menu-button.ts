import { computed, Directive, input } from '@angular/core';
import { cva, VariantProps } from 'class-variance-authority';
import { cn } from '../../utils';

const sidebarMenuButtonVariants = cva(
  'ring-sidebar-ring hover:bg-sidebar-accent hover:text-sidebar-accent-foreground active:bg-sidebar-accent active:text-sidebar-accent-foreground data-active:bg-sidebar-accent data-active:text-sidebar-accent-foreground data-open:hover:bg-sidebar-accent data-open:hover:text-sidebar-accent-foreground gap-2 rounded-md p-2 text-left text-sm transition-[width,height,padding] group-has-data-[sidebar=menu-action]/menu-item:pr-8 group-data-[collapsible=icon]:size-8! group-data-[collapsible=icon]:p-2! focus-visible:ring-2 data-active:font-medium peer/menu-button flex w-full items-center overflow-hidden outline-hidden group/menu-button disabled:pointer-events-none disabled:opacity-50 aria-disabled:pointer-events-none aria-disabled:opacity-50 [&>span:last-child]:truncate [&_svg]:size-4 [&_svg]:shrink-0',
  {
    variants: {
      variant: {
        default: 'hover:bg-sidebar-accent hover:text-sidebar-accent-foreground',
        outline:
          'bg-background hover:bg-sidebar-accent hover:text-sidebar-accent-foreground shadow-[0_0_0_1px_hsl(var(--sidebar-border))] hover:shadow-[0_0_0_1px_hsl(var(--sidebar-accent))]',
      },
      size: {
        default: 'h-8 text-sm',
        sm: 'h-7 text-xs',
        lg: 'h-12 text-sm group-data-[collapsible=icon]:p-0!',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
);

export type ScSidebarMenuButtonVariants = VariantProps<
  typeof sidebarMenuButtonVariants
>;

@Directive({
  selector: 'button[sc-sidebar-menu-button], a[sc-sidebar-menu-button]',
  host: {
    'data-slot': 'sidebar-menu-button',
    '[class]': 'class()',
    '[attr.data-active]': 'isActive() || null',
    '[attr.data-size]': 'size()',
  },
})
export class ScSidebarMenuButton {
  readonly classInput = input<string>('', { alias: 'class' });

  readonly variant = input<ScSidebarMenuButtonVariants['variant']>('default');
  readonly size = input<ScSidebarMenuButtonVariants['size']>('default');
  readonly isActive = input<boolean>(false);
  readonly tooltip = input<string>();

  protected readonly class = computed(() => {
    const size = this.size();
    return cn(
      sidebarMenuButtonVariants({ variant: this.variant(), size }),
      this.classInput(),
    );
  });
}
