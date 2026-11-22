import type { ScListboxStyles } from '@semantic-components/styles';

// Ours (shadcn has no listbox), in vega: the box as the style's textarea
// (corners, border, background); its options are the combobox's.
export const listbox: ScListboxStyles = {
  root: 'rounded-md border border-input bg-transparent p-1 shadow-xs dark:bg-input/30',
};
