import type { ScTimelineStyles } from '@semantic-components/styles';

// Ours (shadcn has no timeline), in luma: rounded geometry, breathable layouts: titles and descriptions as its
// Item's text, markers and rings as its badges and focus rings.
export const timeline: ScTimelineStyles = {
  root: '[--sc-timeline-line:1.25rem]',
  item: 'rounded-xl focus-visible:ring-3 focus-visible:ring-ring/50',
  gap: 'pb-8',
  marker: 'rounded-full',
  markerRing: 'ring-2',
  connector: 'bg-border',
  title: 'text-sm font-medium',
  time: 'text-xs text-muted-foreground',
  description:
    'text-sm text-muted-foreground [&>a]:underline [&>a]:underline-offset-4 [&>a:hover]:text-primary',
};
