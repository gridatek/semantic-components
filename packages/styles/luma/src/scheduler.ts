import type { ScSchedulerStyles } from '@semantic-components/styles';

// Ours (shadcn has no scheduler), in luma: the day's number as its
// calendar's days (round), the events' corners as its badges'.
export const scheduler: ScSchedulerStyles = {
  day: 'rounded-full',
  event: 'rounded-lg',
};
