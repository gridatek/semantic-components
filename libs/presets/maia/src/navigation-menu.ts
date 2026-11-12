import type { ScNavigationMenuStyles } from '@semantic-components/presets';

// shadcn's navigation menu in maia (shadcn-reference/presets/maia/navigation-menu.tsx):
// Base UI's open state as aria-expanded, the in-panel link classes resolved.
export const navigationMenu: ScNavigationMenuStyles = {
  trigger:
    'inline-flex h-9 w-max items-center justify-center rounded-2xl px-4.5 py-2.5 text-sm font-medium transition-all outline-none hover:bg-muted focus:bg-muted focus-visible:ring-[3px] focus-visible:ring-ring/50 focus-visible:outline-1 disabled:pointer-events-none disabled:opacity-50 aria-expanded:bg-muted/50 aria-expanded:hover:bg-muted',
  link: "flex items-center gap-1.5 p-3 text-sm transition-all outline-none hover:bg-muted focus:bg-muted focus-visible:ring-[3px] focus-visible:ring-ring/50 focus-visible:outline-1 rounded-xl data-[active=true]:bg-muted/50 data-[active=true]:hover:bg-muted data-[active=true]:focus:bg-muted [&_svg:not([class*='size-'])]:size-4",
  content: 'p-2.5 pe-3',
  popup:
    'rounded-2xl bg-popover text-popover-foreground shadow ring-1 ring-foreground/5',
};
