import type { ScMediaPlayerStyles } from '@semantic-components/styles';

// Ours (shadcn has no media player), in rhea: the frame as the Card's (frame.ts),
// the audio card's padding and text as the Card's at size sm, the controls'
// padding clear of the frame's corner, the preview's corners as the Tooltip's,
// a caption's as frameXs, the waveform's box as frameSm (its bars round, or square).
export const mediaPlayer: ScMediaPlayerStyles = {
  frame:
    'rounded-[min(var(--radius-4xl),24px)] shadow-sm ring-1 ring-foreground/5 dark:ring-foreground/10',
  audio: 'p-4 text-sm',
  controls: 'px-5 pb-3',
  preview: 'rounded-xl',
  cue: 'rounded-sm',
  waveform: 'rounded-md [&_span]:rounded-full',
};
