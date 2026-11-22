import type { ScListboxStyles } from '@semantic-components/styles';

// Ours (shadcn has no listbox), in mira: the box as the style's textarea
// (corners, border, background); its options are the combobox's.
export const listbox: ScListboxStyles = {
  root: 'rounded-md border border-input bg-input/20 p-1 dark:bg-input/30',
};
