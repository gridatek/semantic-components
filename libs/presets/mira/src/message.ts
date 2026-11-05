import type { ScMessageStyles } from '@semantic-components/presets';

// shadcn's message in mira (shadcn-reference/presets/mira/message.tsx).
export const message: ScMessageStyles = {
  group: 'flex min-w-0 flex-col gap-1.5',
  root: 'group/message relative flex w-full min-w-0 gap-1.5 text-xs/relaxed data-[align=end]:flex-row-reverse',
  content:
    'flex w-full min-w-0 flex-col gap-2 wrap-break-word group-data-[align=end]/message:*:data-slot:self-end',
  header:
    'flex max-w-full min-w-0 items-center px-2.5 text-[0.625rem] font-medium text-muted-foreground group-has-data-[variant=ghost]/message:px-0',
  footer:
    'flex max-w-full min-w-0 items-center px-2.5 text-[0.625rem] font-medium text-muted-foreground group-has-data-[variant=ghost]/message:px-0 group-data-[align=end]/message:justify-end',
};
