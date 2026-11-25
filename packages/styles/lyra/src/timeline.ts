import type { ScTimelineStyles } from '@semantic-components/styles';

// Ours (shadcn has no timeline), in lyra: boxy and sharp — square markers, thin rings (as its badges and focus rings): titles and descriptions as its
// Item's text, markers and rings as its badges and focus rings.
export const timeline: ScTimelineStyles = {
  root: '[--sc-timeline-line:1rem]',
  item: 'rounded-none focus-visible:ring-1 focus-visible:ring-ring/50',
  gap: 'pb-6',
  marker: 'rounded-none',
  markerRing: 'ring-1',
  connector: 'bg-border',
  title: 'text-xs font-medium',
  time: 'text-xs text-muted-foreground',
  description:
    'text-xs/relaxed text-muted-foreground [&>a]:underline [&>a]:underline-offset-4 [&>a:hover]:text-primary',
};
