import type { ScOtpFieldStyles } from '@semantic-components/presets';

// shadcn's input OTP in lyra (shadcn-reference/presets/lyra/input-otp.tsx): a group (one
// chunk, a joined box), an input (shadcn's slot is a div with a fake caret; ours a real input —
// its data-[active=true]: is :focus), the separator.
export const otpField: ScOtpFieldStyles = {
  group:
    'flex items-center rounded-none has-aria-invalid:border-destructive has-aria-invalid:ring-1 has-aria-invalid:ring-destructive/20 dark:has-aria-invalid:ring-destructive/40',
  input:
    'relative flex size-8 items-center justify-center border-y border-e border-input text-xs transition-all outline-none first:rounded-none first:border-s last:rounded-none aria-invalid:border-destructive focus:z-10 focus:border-ring focus:ring-1 focus:ring-ring/50 focus:aria-invalid:border-destructive focus:aria-invalid:ring-destructive/20 dark:bg-input/30 dark:focus:aria-invalid:ring-destructive/40',
  separator: "flex items-center [&_svg:not([class*='size-'])]:size-4",
};
