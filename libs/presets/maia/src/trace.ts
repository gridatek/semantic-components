import type { ScTraceStyles } from '@semantic-components/presets';

// shadcn's trace in maia (shadcn-reference/presets/maia/trace.tsx). Ours: a
// pending step dims only its icon (contrast); the content's text is the line's size.
export const trace: ScTraceStyles = {
  root: 'flex w-full min-w-0 flex-col gap-3 *:has-[>[data-slot=trace-line]]:flex *:has-[>[data-slot=trace-line]]:w-fit *:has-[>[data-slot=trace-line]]:max-w-full *:has-[>[data-slot=trace-line]]:min-w-0 *:has-[>[data-slot=trace-line]]:rounded-lg *:has-[>[data-slot=trace-line]]:text-start *:has-[>[data-slot=trace-line]]:outline-none *:has-[>[data-slot=trace-line]]:focus-visible:ring-[3px] *:has-[>[data-slot=trace-line]]:focus-visible:ring-ring/50',
  line: 'flex w-fit max-w-full min-w-0 items-center gap-2 text-sm text-muted-foreground transition-colors in-[a,button]:cursor-pointer in-[a:hover,button:hover]:text-foreground data-[status=error]:text-destructive data-[status=error]:in-[a:hover,button:hover]:text-destructive data-[status=pending]:*:data-[slot=trace-icon]:opacity-60 data-[status=running]:*:data-[slot=trace-title]:shimmer',
  icon: 'flex size-4 shrink-0 items-center justify-center [&_svg]:pointer-events-none [&_svg:not([class*=size-])]:size-4 [[data-slot=trace-title]~&]:-ms-1',
  collapsibleIcon:
    'flex size-4 shrink-0 items-center justify-center [&_svg]:pointer-events-none [&_svg:not([class*=size-])]:size-4 transition-transform group-aria-expanded/trace-collapsible-trigger:rotate-90 rtl:group-not-aria-expanded/trace-collapsible-trigger:-scale-x-100',
  collapsibleTrigger:
    'group/trace-collapsible-trigger flex w-fit max-w-full min-w-0 cursor-pointer items-center gap-1 rounded-lg text-start text-muted-foreground transition-colors outline-none hover:text-foreground focus-visible:ring-[3px] focus-visible:ring-ring/50 has-[[data-status=error]]:text-destructive',
  collapsibleContent:
    'mt-2.5 mb-1 ms-[calc(--spacing(2)-1px)] min-w-0 border-s pe-1 ps-4 leading-relaxed wrap-break-word text-muted-foreground text-sm',
};
