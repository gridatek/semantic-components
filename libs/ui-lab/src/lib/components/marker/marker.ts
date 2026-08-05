import { Directive, computed, input } from '@angular/core';
import { cn } from '@semantic-components/ui';
import { type VariantProps, cva } from 'class-variance-authority';

export const markerVariants = cva(
  "group/marker relative flex min-h-4 w-full items-center gap-2 text-sm text-muted-foreground text-start [a]:underline [a]:underline-offset-3 [a]:hover:text-foreground [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default: '',
        separator:
          'before:h-px before:min-w-0 before:flex-1 before:bg-border before:me-1 after:h-px after:min-w-0 after:flex-1 after:bg-border after:ms-1',
        border: 'border-b border-border pb-2',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
);

export type ScMarkerVariants = VariantProps<typeof markerVariants>;

@Directive({
  // `a` is included so the `[a]:*` variants above can match: a marker is
  // sometimes a link back to the thing it marks.
  selector: 'div[scMarker], a[scMarker]',
  host: {
    'data-slot': 'marker',
    '[attr.data-variant]': 'variant()',
    '[class]': 'class()',
  },
})
export class ScMarker {
  readonly classInput = input<string>('', { alias: 'class' });
  readonly variant = input<ScMarkerVariants['variant']>('default');

  protected readonly class = computed(() =>
    cn(markerVariants({ variant: this.variant() }), this.classInput()),
  );
}
