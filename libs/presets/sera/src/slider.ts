import type { ScSliderStyles } from '@semantic-components/presets';

// shadcn's slider in sera (shadcn-reference/presets/sera/slider.tsx): our slider is a native
// range — the track and thumb classes on the browser's parts (::-webkit-slider-*,
// ::-moz-range-*), sizes logical (block = thickness, inline = along the track) for a vertical one;
// hover, focus and active from the input. Chrome's thumb is moved onto the track
// (margin-block-start); its size (--sc-slider-thumb) places the fill under its centre.
export const slider: ScSliderStyles = {
  root: 'block-3 [--sc-slider-thumb:12px]',
  track:
    '[&::-webkit-slider-runnable-track]:bg-input/50 [&::-moz-range-track]:bg-input/50 [&::-webkit-slider-runnable-track]:block-0.5 [&::-moz-range-track]:block-0.5 [&::-moz-range-progress]:block-0.5',
  thumb:
    '[&::-webkit-slider-thumb]:size-3 [&::-moz-range-thumb]:size-3 [&::-webkit-slider-thumb]:border-none [&::-moz-range-thumb]:border-none [&::-webkit-slider-thumb]:bg-primary [&::-moz-range-thumb]:bg-primary [&::-webkit-slider-thumb]:transition-colors [&::-moz-range-thumb]:transition-colors [&:hover::-webkit-slider-thumb]:ring-2 [&:hover::-moz-range-thumb]:ring-2 [&:hover::-webkit-slider-thumb]:ring-ring/30 [&:hover::-moz-range-thumb]:ring-ring/30 [&:focus-visible::-webkit-slider-thumb]:ring-2 [&:focus-visible::-moz-range-thumb]:ring-2 [&:focus-visible::-webkit-slider-thumb]:ring-ring/30 [&:focus-visible::-moz-range-thumb]:ring-ring/30 [&::-webkit-slider-thumb]:[margin-block-start:-5px]',
};
