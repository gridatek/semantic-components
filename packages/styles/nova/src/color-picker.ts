import type { ScColorPickerStyles } from '@semantic-components/styles';

// Our colour picker in nova: corners only — the area as nova's popover, the
// swatch and presets as its toggles, the thumbs and the sliders' tracks as its slider.
export const colorPicker: ScColorPickerStyles = {
  area: 'rounded-lg',
  thumb: 'rounded-full',
  slider:
    'rounded-full [&::-webkit-slider-thumb]:rounded-full [&::-moz-range-thumb]:rounded-full',
  swatch: 'size-8 rounded-lg',
  option: 'rounded-lg',
};
