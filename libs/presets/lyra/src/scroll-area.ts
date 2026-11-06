import type { ScScrollAreaStyles } from '@semantic-components/presets';

// shadcn's scroll area in lyra (shadcn-reference/presets/lyra/scroll-area.tsx):
// the thumb, whose corners change from style to style — drawn, or the browser's.
export const scrollArea: ScScrollAreaStyles = {
  thumb: 'relative flex-1 rounded-none bg-border',
  nativeThumb:
    '[&::-webkit-scrollbar-thumb]:rounded-none [&::-webkit-scrollbar-thumb]:bg-border',
};
