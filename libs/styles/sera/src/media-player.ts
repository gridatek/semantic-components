import type { ScMediaPlayerStyles } from '@semantic-components/styles';

// Ours (shadcn has no media player), in sera: the frame as the Card's (frame.ts),
// the audio card's padding and text as the Card's at size sm, the controls'
// padding clear of the frame's corner, the preview's corners as the Tooltip's,
// a caption's as frameXs, the waveform's box as frameSm (its bars round, or square).
export const mediaPlayer: ScMediaPlayerStyles = {
  frame: 'rounded-none shadow-sm ring-1 ring-foreground/5',
  audio: 'p-5 text-sm',
  controls: 'px-3 pb-2',
  preview: 'rounded-none',
  cue: 'rounded-none',
  waveform: 'rounded-none [&_span]:rounded-none',
};
