import type { ScOtpFieldStyles } from '@semantic-components/presets';

// shadcn's input OTP in sera (shadcn-reference/presets/sera/input-otp.tsx): a group (one
// chunk, a joined box), an input (shadcn's slot is a div with a fake caret; ours a real input —
// its data-[active=true]: is :focus), the separator.
export const otpField: ScOtpFieldStyles = {
  group:
    'flex items-center gap-1 rounded-none has-aria-invalid:border-b-destructive dark:has-aria-invalid:border-b-destructive/50',
  input:
    'relative flex size-10 items-center justify-center border border-transparent border-b-input bg-transparent text-sm transition-[color,border-color] outline-none first:rounded-none last:rounded-none aria-invalid:border-b-destructive focus:z-10 focus:border-b-ring dark:aria-invalid:border-b-destructive/50',
  separator: "flex items-center [&_svg:not([class*='size-'])]:size-3.5",
};
