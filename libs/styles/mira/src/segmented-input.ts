import type { ScSegmentedInputStyles } from '@semantic-components/styles';

// Ours (shadcn has no segmented input: the time and date inputs), in mira: its input (input.ts) drawn round
// the parts — focus, disabled and invalid read from the group (a part focused,
// data-disabled, data-invalid); a part's highlight with small corners.
export const segmentedInput: ScSegmentedInputStyles = {
  root: 'flex items-center h-7 w-full min-w-0 rounded-md border border-input bg-input/20 px-2 py-0.5 text-sm transition-colors outline-none has-[:focus-visible]:border-ring has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-ring/30 data-disabled:pointer-events-none data-disabled:cursor-not-allowed data-disabled:opacity-50 data-invalid:border-destructive data-invalid:ring-2 data-invalid:ring-destructive/20 md:text-xs/relaxed dark:bg-input/30 dark:data-invalid:border-destructive/50 dark:data-invalid:ring-destructive/40',
  segment: 'rounded-sm',
};
