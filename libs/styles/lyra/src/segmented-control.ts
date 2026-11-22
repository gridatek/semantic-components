import type { ScSegmentedControlStyles } from '@semantic-components/styles';

// Ours (shadcn has no segmented control), in lyra: as the style's tabs —
// the root its tab list's bar, an item its tab, the indicator its selected
// tab's raised look (sliding to the checked item).
export const segmentedControl: ScSegmentedControlStyles = {
  root: 'inline-flex w-fit items-center justify-center rounded-none p-[3px] text-muted-foreground data-[orientation=horizontal]:h-8 data-[orientation=vertical]:h-fit data-[orientation=vertical]:flex-col bg-muted',
  item: "relative inline-flex h-[calc(100%-1px)] flex-1 items-center justify-center gap-1.5 rounded-none border border-transparent px-1.5 py-0.5 text-xs font-medium whitespace-nowrap text-foreground/60 transition-all group-data-[orientation=vertical]/segmented:w-full group-data-[orientation=vertical]/segmented:justify-start group-data-[orientation=vertical]/segmented:py-[calc(--spacing(1.25))] hover:text-foreground focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 focus-visible:outline-1 focus-visible:outline-ring disabled:pointer-events-none disabled:opacity-50 has-data-[icon=inline-end]:pe-1 has-data-[icon=inline-start]:ps-1 aria-disabled:pointer-events-none aria-disabled:opacity-50 dark:text-muted-foreground dark:hover:text-foreground [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 aria-checked:text-foreground dark:aria-checked:text-foreground",
  indicator:
    'rounded-none border border-transparent bg-background dark:border-input dark:bg-input/30',
};
