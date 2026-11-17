import type { ScScrollAreaStyles } from '@semantic-components/presets';

// shadcn's scroll area in vega (shadcn-reference/presets/vega/scroll-area.tsx):
// the thumb, whose corners change from style to style.
export const scrollArea: ScScrollAreaStyles = {
  thumb: 'relative flex-1 rounded-full bg-border',
};
