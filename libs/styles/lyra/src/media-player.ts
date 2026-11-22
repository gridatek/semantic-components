import type { ScMediaPlayerStyles } from '@semantic-components/styles';

// Ours (shadcn has no media player), in lyra: the frame as the Card's (frame.ts),
// the audio card's padding and text as the Card's at size sm, the controls'
// padding clear of the frame's corner, the preview's corners as the Tooltip's,
// a caption's as frameXs.
export const mediaPlayer: ScMediaPlayerStyles = {
  frame: 'rounded-none ring-1 ring-foreground/10',
  audio: 'p-3 text-xs/relaxed',
  controls: 'px-3 pb-2',
  preview: 'rounded-none',
  cue: 'rounded-none',
};
