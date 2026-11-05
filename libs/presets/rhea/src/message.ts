import type { ScMessageStyles } from '@semantic-components/presets';

// shadcn's message in rhea (shadcn-reference/presets/rhea/message.tsx).
export const message: ScMessageStyles = {
  group: 'flex min-w-0 flex-col gap-2',
  root: 'group/message relative flex w-full min-w-0 gap-2 text-sm data-[align=end]:flex-row-reverse',
  content:
    'flex w-full min-w-0 flex-col gap-2.5 wrap-break-word group-data-[align=end]/message:*:data-slot:self-end',
  header:
    'flex max-w-full min-w-0 items-center px-3 text-xs font-medium text-muted-foreground group-has-data-[variant=ghost]/message:px-0',
  footer:
    'flex max-w-full min-w-0 items-center px-3 text-xs font-medium text-muted-foreground group-has-data-[variant=ghost]/message:px-0 group-data-[align=end]/message:justify-end',
};
