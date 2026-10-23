import { type VariantProps, cva } from 'class-variance-authority';

/** A button's size in an input group: its corners follow the group's. With the preset's button (`injectPreset().button({ variant })`). */
export const inputGroupButtonVariants = cva(
  'flex items-center gap-2 text-sm shadow-none',
  {
    variants: {
      size: {
        xs: "h-6 gap-1 rounded-[calc(var(--radius)-3px)] px-1.5 [&>svg:not([class*='size-'])]:size-3.5",
        sm: '',
        'icon-xs':
          'size-6 rounded-[calc(var(--radius)-3px)] p-0 has-[>svg]:p-0',
        'icon-sm': 'size-8 p-0 has-[>svg]:p-0',
      },
    },
    defaultVariants: {
      size: 'xs',
    },
  },
);

export type ScInputGroupButtonVariants = VariantProps<
  typeof inputGroupButtonVariants
>;
