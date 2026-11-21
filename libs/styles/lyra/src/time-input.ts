import type { ScTimeInputStyles } from '@semantic-components/styles';

// Ours (shadcn has no time input), in lyra: its input (input.ts) drawn round
// the parts — focus, disabled and invalid read from the group (a part focused,
// data-disabled, data-invalid); a part's highlight with square corners.
export const timeInput: ScTimeInputStyles = {
  root: 'flex items-center h-8 w-full min-w-0 rounded-none border border-input bg-transparent px-2.5 py-1 text-xs transition-colors outline-none has-[:focus-visible]:border-ring has-[:focus-visible]:ring-1 has-[:focus-visible]:ring-ring/50 data-disabled:pointer-events-none data-disabled:cursor-not-allowed data-disabled:bg-input/50 data-disabled:opacity-50 data-invalid:border-destructive data-invalid:ring-1 data-invalid:ring-destructive/20 md:text-xs dark:bg-input/30 dark:data-disabled:bg-input/80 dark:data-invalid:border-destructive/50 dark:data-invalid:ring-destructive/40',
  segment: 'rounded-none',
};
