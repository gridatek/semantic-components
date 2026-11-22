import type { ScMediaPlayerStyles } from '@semantic-components/styles';

// Ours (shadcn has no media player), in luma: the frame as the Card's (frame.ts),
// the audio card's padding and text as the Card's at size sm, the controls'
// padding clear of the frame's corner, the preview's corners as the Tooltip's,
// a caption's as frameXs.
export const mediaPlayer: ScMediaPlayerStyles = {
  frame:
    'rounded-4xl shadow-md ring-1 ring-foreground/5 dark:ring-foreground/10',
  audio: 'p-4 text-sm',
  controls: 'px-6 pb-4',
  preview: 'rounded-xl',
  cue: 'rounded-sm',
};
