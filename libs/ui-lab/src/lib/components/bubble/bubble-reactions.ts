import { Directive, computed, input } from '@angular/core';
import { cn } from '@semantic-components/ui';
import { type VariantProps, cva } from 'class-variance-authority';

export const bubbleReactionsVariants = cva(
  'absolute z-10 flex w-fit shrink-0 items-center justify-center gap-1 rounded-full bg-muted px-1.5 py-0.5 text-sm ring-3 ring-card has-[button]:p-0',
  {
    variants: {
      side: {
        top: 'top-0 -translate-y-3/4',
        bottom: 'bottom-0 translate-y-3/4',
      },
      align: {
        start: 'start-3',
        end: 'end-3',
      },
    },
    defaultVariants: {
      side: 'bottom',
      align: 'start',
    },
  },
);

export type ScBubbleReactionsVariants = VariantProps<
  typeof bubbleReactionsVariants
>;

@Directive({
  selector: 'div[scBubbleReactions]',
  host: {
    'data-slot': 'bubble-reactions',
    '[class]': 'class()',
  },
})
export class ScBubbleReactions {
  readonly classInput = input<string>('', { alias: 'class' });
  readonly side = input<ScBubbleReactionsVariants['side']>('bottom');
  readonly align = input<ScBubbleReactionsVariants['align']>('start');

  protected readonly class = computed(() =>
    cn(
      bubbleReactionsVariants({ side: this.side(), align: this.align() }),
      this.classInput(),
    ),
  );
}
