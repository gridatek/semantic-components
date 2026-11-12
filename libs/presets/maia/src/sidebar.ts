import type { ScSidebarStyles } from '@semantic-components/presets';
import { cva } from 'class-variance-authority';

// shadcn's sidebar in maia (shadcn-reference/presets/maia/sidebar.tsx): the parts whose
// classes change between styles. Adapted: the menu button reads our data-slot for its action
// (shadcn's data-sidebar); the content's no-scrollbar left out (the part's hideScrollbar).
export const sidebar: ScSidebarStyles = {
  inner:
    'flex size-full flex-col bg-sidebar group-data-[variant=floating]:rounded-lg group-data-[variant=floating]:shadow-sm group-data-[variant=floating]:ring-1 group-data-[variant=floating]:ring-sidebar-border',
  inset:
    'relative flex w-full flex-1 flex-col bg-background md:peer-data-[variant=inset]:m-2 md:peer-data-[variant=inset]:ms-0 md:peer-data-[variant=inset]:rounded-xl md:peer-data-[variant=inset]:shadow-sm md:peer-data-[variant=inset]:peer-data-[state=collapsed]:ms-2',
  input: 'h-8 w-full bg-background shadow-none',
  header: 'flex flex-col gap-2 p-2 [--radius:var(--radius-xl)]',
  content:
    'flex min-h-0 flex-1 flex-col gap-2 overflow-auto [--radius:var(--radius-xl)] group-data-[collapsible=icon]:overflow-hidden',
  group: 'relative flex w-full min-w-0 flex-col p-2',
  groupLabel:
    'flex h-8 shrink-0 items-center rounded-md px-3 text-xs font-medium text-sidebar-foreground/70 ring-sidebar-ring outline-hidden transition-[margin,opacity] duration-200 ease-linear group-data-[collapsible=icon]:-mt-8 group-data-[collapsible=icon]:opacity-0 focus-visible:ring-2 [&>svg]:size-4 [&>svg]:shrink-0',
  groupAction:
    'absolute top-3.5 end-3 flex aspect-square w-5 items-center justify-center rounded-md p-0 text-sidebar-foreground ring-sidebar-ring outline-hidden transition-transform group-data-[collapsible=icon]:hidden after:absolute after:-inset-2 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 md:after:hidden [&>svg]:size-4 [&>svg]:shrink-0',
  groupContent: 'w-full text-sm',
  menu: 'flex w-full min-w-0 flex-col gap-1',
  menuAction:
    'absolute top-1.5 end-1 flex aspect-square w-5 items-center justify-center rounded-md p-0 text-sidebar-foreground ring-sidebar-ring outline-hidden transition-transform group-data-[collapsible=icon]:hidden peer-hover/menu-button:text-sidebar-accent-foreground peer-data-[size=default]/menu-button:top-2 peer-data-[size=lg]/menu-button:top-2.5 peer-data-[size=sm]/menu-button:top-1 after:absolute after:-inset-2 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 md:after:hidden [&>svg]:size-4 [&>svg]:shrink-0',
  menuBadge:
    'pointer-events-none absolute end-1 flex h-5 min-w-5 items-center justify-center rounded-md px-1 text-xs font-medium text-sidebar-foreground tabular-nums select-none group-data-[collapsible=icon]:hidden peer-hover/menu-button:text-sidebar-accent-foreground peer-data-[size=default]/menu-button:top-1.5 peer-data-[size=lg]/menu-button:top-2.5 peer-data-[size=sm]/menu-button:top-1 peer-data-active/menu-button:text-sidebar-accent-foreground',
  menuSkeleton: 'flex h-8 items-center gap-2 rounded-md px-2',
  menuSkeletonIcon: 'size-4 rounded-md',
  menuSubButton:
    'flex h-7 min-w-0 -translate-x-px rtl:translate-x-px items-center gap-2 overflow-hidden rounded-md px-2 text-sidebar-foreground ring-sidebar-ring outline-hidden group-data-[collapsible=icon]:hidden hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 active:bg-sidebar-accent active:text-sidebar-accent-foreground disabled:pointer-events-none disabled:opacity-50 aria-disabled:pointer-events-none aria-disabled:opacity-50 data-[size=md]:text-sm data-[size=sm]:text-xs data-active:bg-sidebar-accent data-active:text-sidebar-accent-foreground [&>span:last-child]:truncate [&>svg]:size-4 [&>svg]:shrink-0 [&>svg]:text-sidebar-accent-foreground',
  menuButton: cva(
    'peer/menu-button group/menu-button flex w-full items-center gap-2 overflow-hidden rounded-lg px-3 py-2 text-start text-sm ring-sidebar-ring outline-hidden transition-[width,height,padding] group-has-data-[slot=sidebar-menu-action]/menu-item:pe-8 group-data-[collapsible=icon]:size-8! group-data-[collapsible=icon]:p-2! hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 active:bg-sidebar-accent active:text-sidebar-accent-foreground disabled:pointer-events-none disabled:opacity-50 aria-disabled:pointer-events-none aria-disabled:opacity-50 data-open:hover:bg-sidebar-accent data-open:hover:text-sidebar-accent-foreground data-active:bg-sidebar-accent data-active:font-medium data-active:text-sidebar-accent-foreground [&_svg]:size-4 [&_svg]:shrink-0 [&>span:last-child]:truncate',
    {
      variants: {
        variant: {
          default:
            'hover:bg-sidebar-accent hover:text-sidebar-accent-foreground',
          outline:
            'bg-background shadow-[0_0_0_1px_var(--sidebar-border)] hover:bg-sidebar-accent hover:text-sidebar-accent-foreground hover:shadow-[0_0_0_1px_var(--sidebar-accent)]',
        },
        size: {
          default: 'h-9 text-sm',
          sm: 'h-8 text-xs',
          lg: 'h-14 px-3 text-sm group-data-[collapsible=icon]:p-0!',
        },
      },
      defaultVariants: { variant: 'default', size: 'default' },
    },
  ),
};
