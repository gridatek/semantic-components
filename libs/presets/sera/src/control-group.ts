import { cva } from 'class-variance-authority';

// shadcn's button group in sera (shadcn-reference/presets/sera/button-group.tsx), adapted:
// children by position (`:first-child`, `:last-child`), not by `data-slot`;
// `[data-slot=button]` for shadcn's `[data-variant=outline]`, `[data-slot=control]`
// for its `[data-slot=input]`; a select's trigger reached through its root
// (`[data-slot=select]`), which fits its value in a group (`min-w-0`).
export const controlGroup = cva(
  'group/control-group flex w-fit items-stretch *:focus-visible:relative *:focus-visible:z-10 has-[>[data-slot=control-group]]:gap-2 *:data-[slot=control]:px-4 has-[>[data-slot=button]]:*:data-[slot=input-group]:border-border has-[>[data-slot=button]]:*:data-[slot=input-group]:px-2.5 has-[>[data-slot=button]]:[&>[data-slot=select]>[data-slot=select-trigger]]:border-border has-[>[data-slot=button]]:*:[[role=combobox]]:px-2.5 has-[>[data-slot=button]]:[&>[data-slot=input-group]:has(:focus-visible)]:border-ring has-[>[data-slot=button]]:[&>[data-slot=select]>[data-slot=select-trigger]:focus-visible]:border-ring [&>[data-slot=select]]:min-w-0 [&>[data-slot=select]:has(:focus-visible)]:z-10 [&>input]:flex-1 has-[>[data-slot=button]]:[&>input]:border-border has-[>[data-slot=button]]:[&>input:focus-visible]:border-ring',
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

/** Text beside the buttons: `[scControlGroupText]`. */
export const controlGroupText =
  "flex items-center gap-2 border border-transparent border-b-input bg-transparent px-2.5 text-xs font-semibold uppercase group-has-[>[data-slot=button]]/control-group:border-border [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-3.5";
