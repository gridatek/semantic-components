import type { ScColorPickerStyles } from '@semantic-components/styles';

// Our colour picker in sera: corners only — the area as sera's popover, the
// swatch and presets as its toggles, the thumbs and the sliders' tracks as its slider.
export const colorPicker: ScColorPickerStyles = {
  area: 'rounded-none',
  thumb: 'rounded-none',
  slider:
    'rounded-none [&::-webkit-slider-thumb]:rounded-none [&::-moz-range-thumb]:rounded-none',
  swatch: 'size-10 rounded-none',
  option: 'rounded-none',
};
