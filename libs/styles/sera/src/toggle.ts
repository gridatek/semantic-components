import { cva } from 'class-variance-authority';

// shadcn's toggle in sera (shadcn-reference/presets/sera/toggle.tsx): its toggleVariants.
export const toggle = cva(
  "group/toggle inline-flex items-center justify-center gap-1.5 rounded-none text-xs font-semibold tracking-widest whitespace-nowrap uppercase transition-colors outline-none hover:bg-muted hover:text-foreground focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/30 disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 aria-pressed:bg-muted dark:aria-invalid:ring-destructive/40 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-3.5",
  {
    variants: {
      variant: {
        default: 'bg-transparent',
        outline: 'border border-input bg-transparent hover:bg-muted',
      },
      size: {
        default:
          'h-10 min-w-10 px-6 has-data-[icon=inline-end]:pe-4 has-data-[icon=inline-start]:ps-4',
        sm: 'h-9 min-w-9 px-4 has-data-[icon=inline-end]:pe-3 has-data-[icon=inline-start]:ps-3',
        lg: 'h-11 min-w-11 px-8 has-data-[icon=inline-end]:pe-5 has-data-[icon=inline-start]:ps-5',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
);
