import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  computed,
  input,
} from '@angular/core';

import { cn } from '@semantic-components/utils';
import { VariantProps, cva } from 'class-variance-authority';

export const flexLayoutVariants = cva('flex', {
  variants: {
    direction: {
      row: 'flex-row',
      'row-reverse': 'flex-row-reverse',
      col: 'flex-col',
      'col-reverse': 'flex-col-reverse',
    },
    wrap: {
      nowrap: 'flex-nowrap',
      wrap: 'flex-wrap',
      'wrap-reverse': 'flex-wrap-reverse',
    },
    justify: {
      start: 'justify-start',
      end: 'justify-end',
      center: 'justify-center',
      between: 'justify-between',
      around: 'justify-around',
      evenly: 'justify-evenly',
    },
    align: {
      start: 'items-start',
      end: 'items-end',
      center: 'items-center',
      baseline: 'items-baseline',
      stretch: 'items-stretch',
    },
    gap: {
      '0': 'gap-0',
      '1': 'gap-1',
      '2': 'gap-2',
      '3': 'gap-3',
      '4': 'gap-4',
      '5': 'gap-5',
      '6': 'gap-6',
      '8': 'gap-8',
      '10': 'gap-10',
      '12': 'gap-12',
      '16': 'gap-16',
    },
    smDirection: {
      row: 'sm:flex-row',
      'row-reverse': 'sm:flex-row-reverse',
      col: 'sm:flex-col',
      'col-reverse': 'sm:flex-col-reverse',
    },
    mdDirection: {
      row: 'md:flex-row',
      'row-reverse': 'md:flex-row-reverse',
      col: 'md:flex-col',
      'col-reverse': 'md:flex-col-reverse',
    },
    lgDirection: {
      row: 'lg:flex-row',
      'row-reverse': 'lg:flex-row-reverse',
      col: 'lg:flex-col',
      'col-reverse': 'lg:flex-col-reverse',
    },
    xlDirection: {
      row: 'xl:flex-row',
      'row-reverse': 'xl:flex-row-reverse',
      col: 'xl:flex-col',
      'col-reverse': 'xl:flex-col-reverse',
    },
    basis: {
      auto: 'basis-auto',
      '0': 'basis-0',
      '1': 'basis-1',
      full: 'basis-full',
    },
  },
});

export type FlexLayoutVariants = VariantProps<typeof flexLayoutVariants>;

@Component({
  selector: 'div[sc-flex-layout]',
  imports: [],
  template: `
    <ng-content />
  `,
  host: {
    '[class]': 'class()',
  },
  styles: ``,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScFlexLayout {
  readonly classInput = input<string>('', {
    alias: 'class',
  });

  // Flex configuration inputs
  readonly direction = input<FlexLayoutVariants['direction']>('row');
  readonly wrap = input<FlexLayoutVariants['wrap']>();
  readonly justify = input<FlexLayoutVariants['justify']>();
  readonly align = input<FlexLayoutVariants['align']>('center');
  readonly gap = input<FlexLayoutVariants['gap']>('2');
  readonly smDirection = input<FlexLayoutVariants['smDirection']>();
  readonly mdDirection = input<FlexLayoutVariants['mdDirection']>();
  readonly lgDirection = input<FlexLayoutVariants['lgDirection']>();
  readonly xlDirection = input<FlexLayoutVariants['xlDirection']>();
  readonly basis = input<FlexLayoutVariants['basis']>();
  readonly grow = input<boolean>(false);
  readonly shrink = input<boolean>(false);

  protected readonly class = computed(() =>
    cn(
      flexLayoutVariants({
        direction: this.direction(),
        wrap: this.wrap(),
        justify: this.justify(),
        align: this.align(),
        gap: this.gap(),
        smDirection: this.smDirection(),
        mdDirection: this.mdDirection(),
        lgDirection: this.lgDirection(),
        xlDirection: this.xlDirection(),
        basis: this.basis(),
      }),
      // Grow
      this.grow() && 'grow',
      // Shrink
      this.shrink() && 'shrink',
      this.classInput(),
    ),
  );
}
