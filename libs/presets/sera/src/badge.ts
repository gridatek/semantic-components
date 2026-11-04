import { cva } from 'class-variance-authority';

// shadcn's badge in sera (shadcn-reference/presets/sera/badge.tsx).
export const badge = cva(
  'group/badge inline-flex w-fit shrink-0 items-center justify-center gap-1.5 overflow-hidden rounded-none border-0 bg-transparent px-0 py-0 text-[0.625rem] font-semibold tracking-widest whitespace-nowrap uppercase transition-colors focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 has-data-[icon=inline-end]:pe-0 has-data-[icon=inline-start]:ps-0 aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 [&>svg]:pointer-events-none [&>svg]:size-3!',
  {
    variants: {
      variant: {
        default: 'text-foreground [a]:hover:text-foreground/70',
        secondary: 'text-muted-foreground [a]:hover:text-foreground',
        destructive:
          'text-destructive focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 [a]:hover:text-destructive/70',
        outline: 'text-foreground [a]:hover:text-foreground/70',
        ghost: 'text-muted-foreground hover:text-foreground',
        link: 'text-foreground underline-offset-4 hover:underline',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
);
