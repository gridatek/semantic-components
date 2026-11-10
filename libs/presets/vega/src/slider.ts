import type { ScSliderStyles } from '@semantic-components/presets';

// shadcn's slider in vega (shadcn-reference/presets/vega/slider.tsx): our slider is a native
// range — the track and thumb classes on the browser's parts (::-webkit-slider-*,
// ::-moz-range-*), sizes logical (block = thickness, inline = along the track) for a vertical one;
// hover, focus and active from the input. Chrome's thumb is moved onto the track
// (margin-block-start); its size (--sc-slider-thumb) places the fill under its centre.
export const slider: ScSliderStyles = {
  root: 'block-4 [--sc-slider-thumb:16px]',
  track:
    '[&::-webkit-slider-runnable-track]:rounded-full [&::-moz-range-track]:rounded-full [&::-moz-range-progress]:rounded-full [&::-webkit-slider-runnable-track]:bg-muted [&::-moz-range-track]:bg-muted [&::-webkit-slider-runnable-track]:block-1.5 [&::-moz-range-track]:block-1.5 [&::-moz-range-progress]:block-1.5',
  thumb:
    '[&::-webkit-slider-thumb]:size-4 [&::-moz-range-thumb]:size-4 [&::-webkit-slider-thumb]:rounded-full [&::-moz-range-thumb]:rounded-full [&::-webkit-slider-thumb]:border [&::-moz-range-thumb]:border [&::-webkit-slider-thumb]:border-primary [&::-moz-range-thumb]:border-primary [&::-webkit-slider-thumb]:bg-white [&::-moz-range-thumb]:bg-white [&::-webkit-slider-thumb]:shadow-sm [&::-moz-range-thumb]:shadow-sm [&::-webkit-slider-thumb]:ring-ring/50 [&::-moz-range-thumb]:ring-ring/50 [&::-webkit-slider-thumb]:transition-[color,box-shadow] [&::-moz-range-thumb]:transition-[color,box-shadow] [&:hover::-webkit-slider-thumb]:ring-4 [&:hover::-moz-range-thumb]:ring-4 [&:focus-visible::-webkit-slider-thumb]:ring-4 [&:focus-visible::-moz-range-thumb]:ring-4 [&::-webkit-slider-thumb]:[margin-block-start:-5px]',
};
