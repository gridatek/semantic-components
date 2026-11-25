import type { ScColorPickerStyles } from '@semantic-components/styles';

// Our colour picker in rhea: corners only — the area as rhea's popover, the
// swatch and presets as its toggles, the thumbs and the sliders' tracks as its slider.
export const colorPicker: ScColorPickerStyles = {
  area: 'rounded-3xl',
  thumb: 'rounded-2xl',
  slider:
    'rounded-2xl [&::-webkit-slider-thumb]:rounded-2xl [&::-moz-range-thumb]:rounded-2xl',
  swatch: 'size-8 rounded-2xl',
  option: 'rounded-2xl',
};
