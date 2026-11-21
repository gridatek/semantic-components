import type { ScTimePickerStyles } from '@semantic-components/styles';

// Ours (shadcn has no time picker), in vega: a column's option as the style's
// select item (select.ts) — its corners, its padding, its text.
export const timePicker: ScTimePickerStyles = {
  option: 'px-2 rounded-sm py-1.5 text-sm',
};
