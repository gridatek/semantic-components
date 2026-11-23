import type { ScCompareStyles } from '@semantic-components/styles';

// Ours (shadcn has no compare), in sera: the knob square, as the style’s controls; a label's corners as frameSm's.
export const compare: ScCompareStyles = {
  knob: 'after:rounded-none',
  label: 'rounded-none',
};
