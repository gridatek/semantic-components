import type { ScCompareStyles } from '@semantic-components/styles';

// Ours (shadcn has no compare), in maia: the knob round; a label's corners as frameSm's.
export const compare: ScCompareStyles = {
  knob: 'after:rounded-full',
  label: 'rounded-md',
};
