import type { ScColorPickerStyles } from '@semantic-components/styles';

// Our colour picker in mira: corners only — the area as mira's popover, the
// swatch and presets as its toggles, the thumbs and the sliders' tracks as its slider.
export const colorPicker: ScColorPickerStyles = {
  area: 'rounded-lg',
  thumb: 'rounded-md',
  slider:
    'rounded-md [&::-webkit-slider-thumb]:rounded-md [&::-moz-range-thumb]:rounded-md',
  swatch: 'rounded-md',
  option: 'rounded-md',
};
