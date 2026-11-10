import type { ScSliderStyles } from '@semantic-components/presets';

// shadcn's slider in rhea (shadcn-reference/presets/rhea/slider.tsx): our slider is a native
// range — the track and thumb classes on the browser's parts (::-webkit-slider-*,
// ::-moz-range-*), sizes logical (block = thickness, inline = along the track) for a vertical one;
// hover, focus and active from the input. Chrome's thumb is moved onto the track
// (margin-block-start); its size (--sc-slider-thumb) places the fill under its centre.
export const slider: ScSliderStyles = {
  root: 'block-4 [--sc-slider-thumb:16px]',
  track:
    '[&::-webkit-slider-runnable-track]:rounded-2xl [&::-moz-range-track]:rounded-2xl [&::-moz-range-progress]:rounded-2xl [&::-webkit-slider-runnable-track]:bg-input/90 [&::-moz-range-track]:bg-input/90 [&::-webkit-slider-runnable-track]:block-1 [&::-moz-range-track]:block-1 [&::-moz-range-progress]:block-1',
  thumb:
    '[&::-webkit-slider-thumb]:size-4 [&::-moz-range-thumb]:size-4 [&::-webkit-slider-thumb]:rounded-2xl [&::-moz-range-thumb]:rounded-2xl [&::-webkit-slider-thumb]:bg-white [&::-moz-range-thumb]:bg-white [&::-webkit-slider-thumb]:shadow-md [&::-moz-range-thumb]:shadow-md [&::-webkit-slider-thumb]:ring-1 [&::-moz-range-thumb]:ring-1 [&::-webkit-slider-thumb]:ring-black/10 [&::-moz-range-thumb]:ring-black/10 [&::-webkit-slider-thumb]:transition-[color,box-shadow] [&::-moz-range-thumb]:transition-[color,box-shadow] [&::-webkit-slider-thumb]:duration-200 [&::-moz-range-thumb]:duration-200 not-dark:[&::-webkit-slider-thumb]:bg-clip-padding not-dark:[&::-moz-range-thumb]:bg-clip-padding [&:hover::-webkit-slider-thumb]:ring-4 [&:hover::-moz-range-thumb]:ring-4 [&:hover::-webkit-slider-thumb]:ring-ring/30 [&:hover::-moz-range-thumb]:ring-ring/30 [&:focus-visible::-webkit-slider-thumb]:ring-4 [&:focus-visible::-moz-range-thumb]:ring-4 [&:focus-visible::-webkit-slider-thumb]:ring-ring/30 [&:focus-visible::-moz-range-thumb]:ring-ring/30 [&::-webkit-slider-thumb]:[margin-block-start:-6px]',
};
