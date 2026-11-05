import type { ScTabsStyles } from '@semantic-components/presets';
import { cva } from 'class-variance-authority';

// shadcn's tabs in vega (shadcn-reference/presets/vega/tabs.tsx), in our
// states: the root's data-orientation for data-horizontal / data-vertical,
// aria-selected for data-active.
export const tabs: ScTabsStyles = {
  root: 'group/tabs flex gap-2 data-[orientation=horizontal]:flex-col',
  list: cva(
    'group/tabs-list inline-flex w-fit items-center justify-center rounded-lg p-[3px] text-muted-foreground group-data-[orientation=horizontal]/tabs:h-9 group-data-[orientation=vertical]/tabs:h-fit group-data-[orientation=vertical]/tabs:flex-col data-[variant=line]:rounded-none',
    {
      variants: {
        variant: {
          default: 'bg-muted',
          line: 'gap-1 bg-transparent',
        },
      },
      defaultVariants: { variant: 'default' },
    },
  ),
  trigger:
    "relative inline-flex h-[calc(100%-1px)] flex-1 items-center justify-center gap-1.5 rounded-md border border-transparent px-2 py-1 text-sm font-medium whitespace-nowrap text-foreground/60 transition-all group-data-[orientation=vertical]/tabs:w-full group-data-[orientation=vertical]/tabs:justify-start hover:text-foreground focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 focus-visible:outline-1 focus-visible:outline-ring disabled:pointer-events-none disabled:opacity-50 has-data-[icon=inline-end]:pe-1.5 has-data-[icon=inline-start]:ps-1.5 aria-disabled:pointer-events-none aria-disabled:opacity-50 dark:text-muted-foreground dark:hover:text-foreground group-data-[variant=default]/tabs-list:aria-selected:shadow-sm group-data-[variant=line]/tabs-list:aria-selected:shadow-none [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 group-data-[variant=line]/tabs-list:bg-transparent group-data-[variant=line]/tabs-list:aria-selected:bg-transparent dark:group-data-[variant=line]/tabs-list:aria-selected:border-transparent dark:group-data-[variant=line]/tabs-list:aria-selected:bg-transparent aria-selected:bg-background aria-selected:text-foreground dark:aria-selected:border-input dark:aria-selected:bg-input/30 dark:aria-selected:text-foreground after:absolute after:bg-foreground after:opacity-0 after:transition-opacity group-data-[orientation=horizontal]/tabs:after:inset-x-0 group-data-[orientation=horizontal]/tabs:after:bottom-[-5px] group-data-[orientation=horizontal]/tabs:after:h-0.5 group-data-[orientation=vertical]/tabs:after:inset-y-0 group-data-[orientation=vertical]/tabs:after:-end-1 group-data-[orientation=vertical]/tabs:after:w-0.5 group-data-[variant=line]/tabs-list:aria-selected:after:opacity-100",
  panel: 'flex-1 text-sm outline-none',
};
