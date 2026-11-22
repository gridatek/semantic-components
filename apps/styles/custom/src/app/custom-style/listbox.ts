import type { ScListboxStyles } from '@semantic-components/styles';

// Ours (shadcn has no listbox), in nova: the box as the style's textarea
// (corners, border, background); its options are the combobox's.
export const listbox: ScListboxStyles = {
  root: 'rounded-lg border border-input bg-transparent p-1 dark:bg-input/30',
};
