import type { ScColorPickerStyles } from '@semantic-components/styles';

// Our colour picker in maia: corners only — the area as maia's popover, the
// swatch and presets as its toggles, the thumbs and the sliders' tracks as its slider.
export const colorPicker: ScColorPickerStyles = {
  area: 'rounded-2xl',
  thumb: 'rounded-full',
  slider:
    'rounded-full [&::-webkit-slider-thumb]:rounded-full [&::-moz-range-thumb]:rounded-full',
  swatch: 'rounded-full',
  option: 'rounded-full',
};
