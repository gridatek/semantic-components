import type { ScListboxStyles } from '@semantic-components/styles';

// Ours (shadcn has no listbox), in luma: the box as the style's textarea
// (corners, border, background); its options are the combobox's.
export const listbox: ScListboxStyles = {
  root: 'rounded-2xl border border-input bg-input/50 p-1.5',
};
