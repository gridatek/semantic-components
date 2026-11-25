import type { ScSegmentedInputStyles } from '@semantic-components/styles';

// Ours (shadcn has no segmented input: the time and date inputs), in nova: its input (input.ts) drawn round
// the parts — focus, disabled and invalid read from the group (a part focused,
// data-disabled, data-invalid); a part's highlight with small corners.
export const segmentedInput: ScSegmentedInputStyles = {
  root: 'flex items-center h-8 w-full min-w-0 rounded-lg border border-input bg-transparent px-2.5 py-1 text-base transition-colors outline-none has-[:focus-visible]:border-ring has-[:focus-visible]:ring-3 has-[:focus-visible]:ring-ring/50 data-disabled:pointer-events-none data-disabled:cursor-not-allowed data-disabled:bg-input/50 data-disabled:opacity-50 data-invalid:border-destructive data-invalid:ring-3 data-invalid:ring-destructive/20 md:text-sm dark:bg-input/30 dark:data-disabled:bg-input/80 dark:data-invalid:border-destructive/50 dark:data-invalid:ring-destructive/40',
  segment: 'rounded-sm',
};
