import type { ScTimeClockStyles } from '@semantic-components/styles';

// Ours (shadcn has no time clock), in rhea: the face's size and the text
// sizes, as the style's controls are sized (its select items, its inputs).
export const timeClock: ScTimeClockStyles = {
  face: 'size-56 bg-muted',
  number: 'text-sm',
  numberInner: 'text-xs',
  time: 'text-3xl font-medium',
};
