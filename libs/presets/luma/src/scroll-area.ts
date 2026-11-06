import type { ScScrollAreaStyles } from '@semantic-components/presets';

// shadcn's scroll area in luma (shadcn-reference/presets/luma/scroll-area.tsx):
// the thumb, whose corners change from style to style.
export const scrollArea: ScScrollAreaStyles = {
  thumb: 'relative flex-1 rounded-full bg-border',
};
