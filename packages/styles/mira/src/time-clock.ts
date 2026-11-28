import type { ScTimeClockStyles } from '@semantic-components/styles';

// Ours (shadcn has no time clock), in mira: the face's size and the text
// sizes, as the style's controls are sized (its select items, its inputs).
export const timeClock: ScTimeClockStyles = {
  face: 'size-52 bg-muted',
  number: 'text-xs',
  numberInner: 'text-[0.6875rem]',
  time: 'text-2xl font-medium',
};
