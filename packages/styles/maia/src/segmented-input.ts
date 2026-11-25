import type { ScSegmentedInputStyles } from '@semantic-components/styles';

// Ours (shadcn has no segmented input: the time and date inputs), in maia: its input (input.ts) drawn round
// the parts — focus, disabled and invalid read from the group (a part focused,
// data-disabled, data-invalid); a part's highlight with small corners.
export const segmentedInput: ScSegmentedInputStyles = {
  root: 'flex items-center h-9 w-full min-w-0 rounded-4xl border border-input bg-input/30 px-3 py-1 text-base transition-colors outline-none has-[:focus-visible]:border-ring has-[:focus-visible]:ring-[3px] has-[:focus-visible]:ring-ring/50 data-disabled:pointer-events-none data-disabled:cursor-not-allowed data-disabled:opacity-50 data-invalid:border-destructive data-invalid:ring-[3px] data-invalid:ring-destructive/20 md:text-sm dark:data-invalid:border-destructive/50 dark:data-invalid:ring-destructive/40',
  segment: 'rounded-sm',
};
