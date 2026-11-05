import type { ScBubbleStyles } from '@semantic-components/presets';

// shadcn's bubble in sera (shadcn-reference/presets/sera/bubble.tsx):
// the parts that change from style to style.
export const bubble: ScBubbleStyles = {
  content:
    'w-fit max-w-full min-w-0 overflow-hidden rounded-none border border-transparent px-4 py-3 text-sm leading-relaxed wrap-break-word group-data-[align=end]/bubble:self-end [button]:text-start [button,a]:transition-colors [button,a]:outline-none [button,a]:focus-visible:border-ring [button,a]:focus-visible:ring-2 [button,a]:focus-visible:ring-ring/30',
  reactions:
    'absolute z-10 flex w-fit shrink-0 items-center justify-center gap-1 rounded-none bg-muted px-2 py-0.5 text-sm ring-3 ring-card has-[button]:p-0',
};
