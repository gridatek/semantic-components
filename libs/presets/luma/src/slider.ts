import type { ScSliderStyles } from '@semantic-components/presets';

// shadcn's slider in luma (shadcn-reference/presets/luma/slider.tsx): our slider is a native
// range — the track and thumb classes on the browser's parts (::-webkit-slider-*,
// ::-moz-range-*), sizes logical (block = thickness, inline = along the track) for a vertical one;
// hover, focus and active from the input. Chrome's thumb is moved onto the track
// (margin-block-start); its size (--sc-slider-thumb) places the fill under its centre.
export const slider: ScSliderStyles = {
  root: 'block-4 [--sc-slider-thumb:24px]',
  track:
    '[&::-webkit-slider-runnable-track]:rounded-full [&::-moz-range-track]:rounded-full [&::-moz-range-progress]:rounded-full [&::-webkit-slider-runnable-track]:bg-input/90 [&::-moz-range-track]:bg-input/90 [&::-webkit-slider-runnable-track]:block-2 [&::-moz-range-track]:block-2 [&::-moz-range-progress]:block-2',
  thumb:
    '[&::-webkit-slider-thumb]:block-4 [&::-moz-range-thumb]:block-4 [&::-webkit-slider-thumb]:inline-6 [&::-moz-range-thumb]:inline-6 [&::-webkit-slider-thumb]:rounded-full [&::-moz-range-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-moz-range-thumb]:bg-white [&::-webkit-slider-thumb]:shadow-md [&::-moz-range-thumb]:shadow-md [&::-webkit-slider-thumb]:ring-1 [&::-moz-range-thumb]:ring-1 [&::-webkit-slider-thumb]:ring-black/10 [&::-moz-range-thumb]:ring-black/10 [&::-webkit-slider-thumb]:transition-[color,box-shadow,background-color] [&::-moz-range-thumb]:transition-[color,box-shadow,background-color] not-dark:[&::-webkit-slider-thumb]:bg-clip-padding not-dark:[&::-moz-range-thumb]:bg-clip-padding [&:hover::-webkit-slider-thumb]:ring-4 [&:hover::-moz-range-thumb]:ring-4 [&:hover::-webkit-slider-thumb]:ring-ring/30 [&:hover::-moz-range-thumb]:ring-ring/30 [&:focus-visible::-webkit-slider-thumb]:ring-4 [&:focus-visible::-moz-range-thumb]:ring-4 [&:focus-visible::-webkit-slider-thumb]:ring-ring/30 [&:focus-visible::-moz-range-thumb]:ring-ring/30 [&::-webkit-slider-thumb]:[margin-block-start:-4px]',
};
