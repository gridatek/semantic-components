import type { ScScrollAreaStyles } from '@semantic-components/presets';

// shadcn's scroll area in maia (shadcn-reference/presets/maia/scroll-area.tsx):
// the thumb, whose corners change from style to style — drawn, or the browser's.
export const scrollArea: ScScrollAreaStyles = {
  thumb: 'relative flex-1 rounded-full bg-border',
  nativeThumb:
    '[&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-border',
};
