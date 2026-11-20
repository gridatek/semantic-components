import type { ScTimelineStyles } from '@semantic-components/styles';

// Ours (shadcn has no timeline), in sera: editorial — square markers, a light rule, uppercase titles (as its Item’s): titles and descriptions as its
// Item's text, markers and rings as its badges and focus rings.
export const timeline: ScTimelineStyles = {
  root: '[--sc-timeline-line:1rem]',
  item: 'rounded-none focus-visible:ring-1 focus-visible:ring-ring',
  gap: 'pb-8',
  marker: 'rounded-none',
  markerRing: 'ring-1',
  connector: 'bg-foreground/15',
  title: 'text-xs font-semibold uppercase',
  time: 'text-xs text-muted-foreground',
  description:
    'text-sm leading-relaxed text-muted-foreground [&>a]:underline [&>a]:underline-offset-4 [&>a:hover]:text-primary',
};
