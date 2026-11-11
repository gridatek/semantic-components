import type { ScToastStyles } from '@semantic-components/presets';

// shadcn's toast in mira (shadcn-reference/presets/mira/toast.tsx): the toast's look — its
// corners are all that change between styles — and the same corners on the stack's focus ring.
export const toast: ScToastStyles = {
  toast: 'rounded-md border bg-popover text-popover-foreground shadow-lg',
  list: 'rounded-md',
};
