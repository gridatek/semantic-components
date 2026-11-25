import type { ScScrollAreaStyles } from '@semantic-components/styles';

// shadcn's scroll area in mira (shadcn-reference/presets/mira/scroll-area.tsx):
// the thumb, whose corners change from style to style. Not shadcn's colour:
// muted-foreground, not border (1.3:1, hard to see; 3:1 for WCAG 1.4.11).
export const scrollArea: ScScrollAreaStyles = {
  thumb: 'relative flex-1 rounded-full bg-muted-foreground',
};
