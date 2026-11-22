import type { ScColorPickerStyles } from '@semantic-components/styles';

// Our colour picker in vega: corners only — the area as vega's popover, the
// swatch and presets as its toggles, the thumbs and the sliders' tracks as its slider.
export const colorPicker: ScColorPickerStyles = {
  area: 'rounded-md',
  thumb: 'rounded-full',
  slider:
    'rounded-full [&::-webkit-slider-thumb]:rounded-full [&::-moz-range-thumb]:rounded-full',
  swatch: 'size-9 rounded-md',
  option: 'rounded-md',
};
