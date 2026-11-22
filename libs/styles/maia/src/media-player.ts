import type { ScMediaPlayerStyles } from '@semantic-components/styles';

// Ours (shadcn has no media player), in maia: the frame as the Card's (frame.ts),
// the audio card's padding and text as the Card's at size sm, the controls'
// padding clear of the frame's corner, the preview's corners as the Tooltip's,
// a caption's as frameXs.
export const mediaPlayer: ScMediaPlayerStyles = {
  frame: 'rounded-2xl ring-1 ring-foreground/10',
  audio: 'p-4 text-sm',
  controls: 'px-4 pb-3',
  preview: 'rounded-2xl',
  cue: 'rounded-sm',
};
