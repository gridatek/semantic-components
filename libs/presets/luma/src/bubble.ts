import type { ScBubbleStyles } from '@semantic-components/presets';

// shadcn's bubble in luma (shadcn-reference/presets/luma/bubble.tsx):
// the parts that change from style to style.
export const bubble: ScBubbleStyles = {
  content:
    'w-fit max-w-full min-w-0 overflow-hidden rounded-3xl border border-transparent px-3.5 py-2.5 text-sm leading-relaxed wrap-break-word group-data-[align=end]/bubble:self-end [button]:text-start [button,a]:transition-colors [button,a]:outline-none [button,a]:focus-visible:border-ring [button,a]:focus-visible:ring-3 [button,a]:focus-visible:ring-ring/30',
  reactions:
    'absolute z-10 flex w-fit shrink-0 items-center justify-center gap-1 rounded-full bg-muted px-1.5 py-0.5 text-sm ring-3 ring-card has-[button]:p-0',
};
