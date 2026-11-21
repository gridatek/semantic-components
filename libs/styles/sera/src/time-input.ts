import type { ScTimeInputStyles } from '@semantic-components/styles';

// Ours (shadcn has no time input), in sera: its input (input.ts) drawn round
// the parts — focus, disabled and invalid read from the group (a part focused,
// data-disabled, data-invalid); a part's highlight with square corners.
export const timeInput: ScTimeInputStyles = {
  root: 'flex items-center h-10 w-full min-w-0 border border-transparent border-b-input bg-transparent px-0 py-1 text-base transition-[color,border-color] outline-none has-[:focus-visible]:border-b-ring data-disabled:pointer-events-none data-disabled:cursor-not-allowed data-disabled:opacity-50 data-invalid:border-b-destructive md:text-sm dark:data-invalid:border-b-destructive/50',
  segment: 'rounded-none',
};
