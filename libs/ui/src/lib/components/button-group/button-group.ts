import { Directive, computed, input } from '@angular/core';
import { type VariantProps, cva } from 'class-variance-authority';
import { cn } from '../../utils';

export const buttonGroupVariants = cva(
  "has-[>[data-slot=button-group]]:gap-2 has-[select[aria-hidden=true]:last-child]:[&>[data-slot=select-input-group]:last-of-type]:rounded-e-lg flex w-fit items-stretch *:focus-visible:z-10 *:focus-visible:relative [&>[data-slot=select-input-group]:not([class*='w-'])]:w-fit [&>input]:flex-1",
  {
    variants: {
      orientation: {
        horizontal:
          '[&>[data-slot]:not(:has(~[data-slot]))]:rounded-e-lg! [&>*:not(:first-child)]:rounded-s-none [&>*:not(:first-child)]:border-s-0 [&>*:not(:last-child)]:rounded-e-none',
        vertical:
          '[&>[data-slot]:not(:has(~[data-slot]))]:rounded-b-lg! flex-col [&>*:not(:first-child)]:rounded-t-none [&>*:not(:first-child)]:border-t-0 [&>*:not(:last-child)]:rounded-b-none',
      },
    },
    defaultVariants: {
      orientation: 'horizontal',
    },
  },
);

export type ScButtonGroupVariants = VariantProps<typeof buttonGroupVariants>;

@Directive({
  selector: 'div[scButtonGroup]',
  host: {
    'data-slot': 'button-group',
    role: 'group',
    '[class]': 'class()',
  },
})
export class ScButtonGroup {
  readonly classInput = input<string>('', { alias: 'class' });
  readonly orientation =
    input<ScButtonGroupVariants['orientation']>('horizontal');

  protected readonly class = computed(() =>
    cn(
      buttonGroupVariants({ orientation: this.orientation() }),
      this.classInput(),
    ),
  );
}
