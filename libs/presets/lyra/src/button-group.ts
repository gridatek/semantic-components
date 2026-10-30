import { cva } from 'class-variance-authority';

// shadcn's button group in lyra (shadcn-reference/presets/lyra/button-group.tsx), adapted:
// children by position (`:first-child`, `:last-child`), not by `data-slot`;
// `[data-slot=button]` for shadcn's `[data-variant=outline]`, `[data-slot=control]`
// for its `[data-slot=input]`; a select's trigger reached through its root
// (`[data-slot=select]`), which fits its value in a group (`min-w-0`).
export const buttonGroup = cva(
  'flex w-fit items-stretch rounded-none *:focus-visible:relative *:focus-visible:z-10 has-[>[data-slot=button-group]]:gap-2 [&>[data-slot=select]]:min-w-0 [&>[data-slot=select]:has(:focus-visible)]:z-10 [&>input]:flex-1',
  {
    variants: {
      orientation: {
        horizontal:
          '[&>*:not(:last-child)]:rounded-e-none [&>*:not(:first-child)]:rounded-s-none [&>*:not(:first-child)]:border-s-0 [&>[data-slot=select]:not(:last-child)>[data-slot=select-trigger]]:rounded-e-none [&>[data-slot=select]:not(:first-child)>[data-slot=select-trigger]]:rounded-s-none [&>[data-slot=select]:not(:first-child)>[data-slot=select-trigger]]:border-s-0',
        vertical:
          'flex-col [&>*:not(:last-child)]:rounded-b-none [&>*:not(:first-child)]:rounded-t-none [&>*:not(:first-child)]:border-t-0 [&>[data-slot=select]:not(:last-child)>[data-slot=select-trigger]]:rounded-b-none [&>[data-slot=select]:not(:first-child)>[data-slot=select-trigger]]:rounded-t-none [&>[data-slot=select]:not(:first-child)>[data-slot=select-trigger]]:border-t-0',
      },
    },
    defaultVariants: { orientation: 'horizontal' },
  },
);

/** Text beside the buttons: `[scButtonGroupText]`. */
export const buttonGroupText =
  "flex items-center gap-2 rounded-none border bg-muted px-2.5 text-xs font-medium [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4";
