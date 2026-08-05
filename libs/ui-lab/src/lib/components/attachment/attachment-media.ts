import { Directive, computed, input } from '@angular/core';
import { cn } from '@semantic-components/ui';
import { type VariantProps, cva } from 'class-variance-authority';

export const attachmentMediaVariants = cva(
  "relative flex aspect-square w-10 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-muted text-foreground [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 group-data-[size=sm]/attachment:w-8 group-data-[size=xs]/attachment:w-7 group-data-[size=xs]/attachment:rounded-md group-data-[size=xs]/attachment:[&_svg:not([class*='size-'])]:size-3.5 group-data-[state=error]/attachment:bg-destructive/10 group-data-[state=error]/attachment:text-destructive group-data-[orientation=vertical]/attachment:w-full group-data-[orientation=vertical]/attachment:[&_svg:not([class*='size-'])]:size-6",
  {
    variants: {
      variant: {
        icon: '',
        image:
          'opacity-60 group-data-[state=idle]/attachment:opacity-100 group-data-[state=done]/attachment:opacity-100 *:[img]:aspect-square *:[img]:w-full *:[img]:object-cover',
      },
    },
    defaultVariants: {
      variant: 'icon',
    },
  },
);

export type ScAttachmentMediaVariants = VariantProps<
  typeof attachmentMediaVariants
>;

@Directive({
  selector: 'div[scAttachmentMedia]',
  host: {
    'data-slot': 'attachment-media',
    '[class]': 'class()',
  },
})
export class ScAttachmentMedia {
  readonly classInput = input<string>('', { alias: 'class' });
  readonly variant = input<ScAttachmentMediaVariants['variant']>('icon');

  protected readonly class = computed(() =>
    cn(attachmentMediaVariants({ variant: this.variant() }), this.classInput()),
  );
}
