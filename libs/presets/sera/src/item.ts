import type { ScItemStyles } from '@semantic-components/presets';
import { cva } from 'class-variance-authority';

// shadcn's item in sera (shadcn-reference/presets/sera/item.tsx); its
// dropdown-menu-content slot is our menu's (`menu`).
export const item: ScItemStyles = {
  root: cva(
    'group/item flex w-full flex-wrap items-center rounded-none border text-sm transition-colors duration-100 outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 [a]:transition-colors [a]:hover:bg-muted',
    {
      variants: {
        variant: {
          default: 'border-transparent',
          outline: 'border-border',
          muted: 'border-transparent bg-muted/50',
        },
        size: {
          default: 'gap-3.5 px-4 py-3.5',
          sm: 'gap-3.5 px-3.5 py-3',
          xs: 'gap-2.5 px-3 py-2.5 in-data-[slot=menu]:p-0',
        },
      },
      defaultVariants: { variant: 'default', size: 'default' },
    },
  ),
  media: cva(
    'flex shrink-0 items-center justify-center gap-2 group-has-data-[slot=item-description]/item:translate-y-0.5 group-has-data-[slot=item-description]/item:self-start [&_svg]:pointer-events-none',
    {
      variants: {
        variant: {
          default: 'bg-transparent',
          icon: '[&_svg:not([class*=size-])]:size-4',
          image:
            'size-10 overflow-hidden rounded-none group-data-[size=sm]/item:size-8 group-data-[size=xs]/item:size-6 group-data-[size=xs]/item:rounded-none [&_img]:size-full [&_img]:object-cover',
        },
      },
      defaultVariants: { variant: 'default' },
    },
  ),
  body: 'flex flex-1 flex-col gap-1 group-data-[size=xs]/item:gap-0.5 [&+[data-slot=item-body]]:flex-none',
  title:
    'line-clamp-1 flex w-fit items-center gap-2 text-xs leading-snug font-semibold uppercase underline-offset-4',
  description:
    'line-clamp-2 text-start text-sm leading-relaxed font-normal text-muted-foreground [&>a]:underline [&>a]:underline-offset-4 [&>a:hover]:text-primary',
};
