import type { ScToastStyles } from '@semantic-components/presets';

// shadcn's toast in nova (shadcn-reference/presets/nova/toast.tsx): the toast's look — its
// corners are all that change between styles — and the same corners on the stack's focus ring.
export const toast: ScToastStyles = {
  toast: 'rounded-2xl border bg-popover text-popover-foreground shadow-lg',
  list: 'rounded-2xl',
};
