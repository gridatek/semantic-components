import type { ScCodeBlockStyles } from '@semantic-components/presets';
import { cva } from 'class-variance-authority';

// shadcn's code block in mira (shadcn-reference/presets/mira/code-block.tsx).
export const codeBlock: ScCodeBlockStyles = {
  root: cva(
    'group/code-block relative flex w-full min-w-0 flex-col overflow-hidden rounded-md text-sm has-[>[data-slot=code-block-content]:focus-visible]:ring-2 has-[>[data-slot=code-block-content]:focus-visible]:ring-ring/30 data-[size=sm]:text-xs',
    {
      variants: {
        variant: {
          default:
            'border border-input text-foreground has-[>[data-slot=code-block-content]:focus-visible]:border-ring dark:bg-input/30',
          destructive:
            'border border-destructive/30 text-destructive dark:border-destructive/40',
        },
      },
      defaultVariants: { variant: 'default' },
    },
  ),
  header:
    'flex min-w-0 shrink-0 items-center gap-2 px-3 pt-3 text-muted-foreground group-data-[size=sm]/code-block:px-2 group-data-[size=sm]/code-block:pt-2 group-data-[variant=destructive]/code-block:text-destructive *:has-[>[data-slot=code-block-title]]:min-w-0',
  title:
    "min-w-0 truncate font-sans text-xs font-medium text-foreground group-data-[variant=destructive]/code-block:text-destructive [&_svg]:pointer-events-none [&_svg]:inline-block [&_svg]:align-middle [&_svg:not([class*='size-'])]:size-3.5 *:[svg]:me-1.5",
  actions:
    '-my-1 ms-auto -me-1.5 flex shrink-0 items-center gap-1 [[data-slot=code-block]>&]:absolute [[data-slot=code-block]>&]:end-2 [[data-slot=code-block]>&]:top-2 [[data-slot=code-block]>&]:z-10 [[data-slot=code-block]>&]:m-0 [[data-slot=code-block]>&]:opacity-0 [[data-slot=code-block]>&]:transition-opacity [[data-slot=code-block]>&]:group-focus-within/code-block:opacity-100 [[data-slot=code-block]>&]:group-hover/code-block:opacity-100 group-data-[size=sm]/code-block:[[data-slot=code-block]>&]:end-1.5 group-data-[size=sm]/code-block:[[data-slot=code-block]>&]:top-1.5 [[data-slot=code-block]>&]:pointer-coarse:opacity-100 [[data-slot=code-block]>&]:*:[button]:bg-background [[data-slot=code-block]>&]:*:[button]:ring-1 [[data-slot=code-block]>&]:*:[button]:ring-foreground/10',
  content:
    'min-h-0 min-w-0 scroll-fade-x scrollbar-thin overflow-auto px-3 py-3 text-start font-mono leading-relaxed outline-none group-has-data-[slot=code-block-footer]/code-block:pb-2 group-has-data-[slot=code-block-header]/code-block:pt-2 group-data-[size=sm]/code-block:px-2 group-data-[size=sm]/code-block:py-2 group-data-[size=sm]/code-block:group-has-data-[slot=code-block-header]/code-block:pt-1.5 data-wrap:scroll-fade-y data-wrap:wrap-break-word data-wrap:whitespace-pre-wrap',
  code: 'grid min-h-lh min-w-max content-start in-data-numbered:grid-cols-[auto_1fr] in-data-wrap:min-w-0',
  line: cva(
    "relative -mx-3 block min-h-lh px-3 group-data-[size=sm]/code-block:-mx-2 group-data-[size=sm]/code-block:px-2 before:min-w-6 before:text-end before:text-muted-foreground after:absolute after:start-1 after:top-0 after:text-muted-foreground after:select-none in-data-numbered:col-span-2 in-data-numbered:grid in-data-numbered:grid-cols-subgrid in-data-numbered:gap-x-3 in-data-numbered:[counter-increment:line] in-data-numbered:before:content-[counter(line)] in-data-numbered:before:select-none in-data-numbered:supports-[content:counter(line)_/_'']:before:content-[counter(line)_/_'']",
    {
      variants: {
        variant: {
          default: '',
          added: "bg-muted after:content-['+']",
          removed:
            "bg-destructive/10 after:text-destructive after:content-['−']",
          highlighted: 'bg-muted',
        },
      },
      defaultVariants: { variant: 'default' },
    },
  ),
  footer:
    'flex min-w-0 shrink-0 items-center gap-2 px-3 pb-3 text-muted-foreground group-data-[size=sm]/code-block:px-2 group-data-[size=sm]/code-block:pb-2',
};
