import type { ScSchedulerStyles } from '@semantic-components/styles';

// Ours (shadcn has no scheduler), in sera: the day's number as its
// calendar's days (square), the events' corners as its badges'.
export const scheduler: ScSchedulerStyles = {
  day: 'rounded-none',
  event: 'rounded-none',
};
