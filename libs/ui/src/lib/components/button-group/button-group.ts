import { computed, Directive, input } from '@angular/core';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../utils';

export const buttonGroupVariants = cva(
  "has-[>[data-slot=button-group]]:gap-2 has-[select[aria-hidden=true]:last-child]:[&>[data-slot=select-trigger]:last-of-type]:rounded-r-lg flex w-fit items-stretch *:focus-visible:z-10 *:focus-visible:relative [&>[data-slot=select-trigger]:not([class*='w-'])]:w-fit [&>input]:flex-1",
  {
    variants: {
      orientation: {
        horizontal:
          '[&>[data-slot]:not(:has(~[data-slot]))]:rounded-r-lg! [&>*:not(:first-child)]:rounded-l-none [&>*:not(:first-child)]:border-l-0 [&>*:not(:last-child)]:rounded-r-none',
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
  selector: 'div[sc-button-group]',
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
