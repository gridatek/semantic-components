import type { ScTimePickerStyles } from '@semantic-components/styles';

// Ours (shadcn has no time picker), in luma: a column's option as the style's
// select item (select.ts) — its corners, its padding, its text.
export const timePicker: ScTimePickerStyles = {
  option: 'px-2 rounded-2xl py-2 text-sm',
};
