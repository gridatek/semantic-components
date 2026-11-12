import type { ScNavigationMenuStyles } from '@semantic-components/presets';

// shadcn's navigation menu in lyra (shadcn-reference/presets/lyra/navigation-menu.tsx):
// Base UI's open state as aria-expanded, the in-panel link classes resolved.
export const navigationMenu: ScNavigationMenuStyles = {
  trigger:
    'inline-flex h-9 w-max items-center justify-center rounded-none px-2.5 py-1.5 text-xs font-medium transition-all outline-none hover:bg-muted focus:bg-muted focus-visible:ring-1 focus-visible:ring-ring/50 focus-visible:outline-1 disabled:pointer-events-none disabled:opacity-50 aria-expanded:bg-muted/50 aria-expanded:hover:bg-muted',
  link: "flex items-center gap-2 p-2 text-xs transition-all outline-none hover:bg-muted focus:bg-muted focus-visible:ring-1 focus-visible:ring-ring/50 focus-visible:outline-1 rounded-none data-[active=true]:bg-muted/50 data-[active=true]:hover:bg-muted data-[active=true]:focus:bg-muted [&_svg:not([class*='size-'])]:size-4",
  content: 'p-1',
  popup:
    'rounded-none bg-popover text-popover-foreground shadow ring-1 ring-foreground/10',
};
