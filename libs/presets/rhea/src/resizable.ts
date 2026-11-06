import type { ScResizableStyles } from '@semantic-components/presets';

// shadcn's resizable in rhea (shadcn-reference/presets/rhea/resizable.tsx): the
// handle's grip (its withHandle div).
export const resizable: ScResizableStyles = {
  grip: 'z-10 flex h-6 w-1 shrink-0 rounded-lg bg-border',
};
