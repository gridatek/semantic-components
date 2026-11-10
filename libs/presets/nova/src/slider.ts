import type { ScSliderStyles } from '@semantic-components/presets';

// shadcn's slider in nova (shadcn-reference/presets/nova/slider.tsx): our slider is a native
// range — the track and thumb classes on the browser's parts (::-webkit-slider-*,
// ::-moz-range-*), sizes logical (block = thickness, inline = along the track) for a vertical one;
// hover, focus and active from the input. Chrome's thumb is moved onto the track
// (margin-block-start); its size (--sc-slider-thumb) places the fill under its centre.
export const slider: ScSliderStyles = {
  root: 'block-3 [--sc-slider-thumb:12px]',
  track:
    '[&::-webkit-slider-runnable-track]:rounded-full [&::-moz-range-track]:rounded-full [&::-moz-range-progress]:rounded-full [&::-webkit-slider-runnable-track]:bg-muted [&::-moz-range-track]:bg-muted [&::-webkit-slider-runnable-track]:block-1 [&::-moz-range-track]:block-1 [&::-moz-range-progress]:block-1',
  thumb:
    '[&::-webkit-slider-thumb]:size-3 [&::-moz-range-thumb]:size-3 [&::-webkit-slider-thumb]:rounded-full [&::-moz-range-thumb]:rounded-full [&::-webkit-slider-thumb]:border [&::-moz-range-thumb]:border [&::-webkit-slider-thumb]:border-ring [&::-moz-range-thumb]:border-ring [&::-webkit-slider-thumb]:bg-white [&::-moz-range-thumb]:bg-white [&::-webkit-slider-thumb]:ring-ring/50 [&::-moz-range-thumb]:ring-ring/50 [&::-webkit-slider-thumb]:transition-[color,box-shadow] [&::-moz-range-thumb]:transition-[color,box-shadow] [&:hover::-webkit-slider-thumb]:ring-3 [&:hover::-moz-range-thumb]:ring-3 [&:focus-visible::-webkit-slider-thumb]:ring-3 [&:focus-visible::-moz-range-thumb]:ring-3 [&:active::-webkit-slider-thumb]:ring-3 [&:active::-moz-range-thumb]:ring-3 [&::-webkit-slider-thumb]:[margin-block-start:-4px]',
};
