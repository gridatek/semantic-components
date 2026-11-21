import type { ScTimePickerStyles } from '@semantic-components/styles';

// Ours (shadcn has no time picker), in mira: a column's option as the style's
// select item (select.ts) — its corners, its padding, its text.
export const timePicker: ScTimePickerStyles = {
  option: 'px-2 rounded-md py-1 text-xs/relaxed',
};
