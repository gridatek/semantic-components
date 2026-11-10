import type { ScOtpFieldStyles } from '@semantic-components/presets';

// shadcn's input OTP in vega (shadcn-reference/presets/vega/input-otp.tsx): a group (one
// chunk, a joined box), an input (shadcn's slot is a div with a fake caret; ours a real input —
// its data-[active=true]: is :focus), the separator.
export const otpField: ScOtpFieldStyles = {
  group:
    'flex items-center rounded-md has-aria-invalid:border-destructive has-aria-invalid:ring-3 has-aria-invalid:ring-destructive/20 dark:has-aria-invalid:ring-destructive/40',
  input:
    'relative flex size-9 items-center justify-center border-y border-e border-input text-sm shadow-xs transition-all outline-none first:rounded-s-md first:border-s last:rounded-e-md aria-invalid:border-destructive focus:z-10 focus:border-ring focus:ring-3 focus:ring-ring/50 focus:aria-invalid:border-destructive focus:aria-invalid:ring-destructive/20 dark:bg-input/30 dark:focus:aria-invalid:ring-destructive/40',
  separator: "flex items-center [&_svg:not([class*='size-'])]:size-4",
};
