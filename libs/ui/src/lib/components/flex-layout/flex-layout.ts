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
      '6': 'gap-6',
      '8': 'gap-8',
    },
    spacing: {
      '0': 'space-x-0',
      '1': 'space-x-1',
      '2': 'space-x-2',
      '3': 'space-x-3',
      '4': 'space-x-4',
      '6': 'space-x-6',
      '8': 'space-x-8',
    },
  },
  defaultVariants: {
    direction: 'row',
    align: 'center',
  },
});

type FlexLayoutVariants = VariantProps<typeof flexLayoutVariants>;

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

  readonly direction = input<FlexLayoutVariants['direction']>('row');
  readonly wrap = input<FlexLayoutVariants['wrap']>();
  readonly justify = input<FlexLayoutVariants['justify']>();
  readonly align = input<FlexLayoutVariants['align']>('center');
  readonly gap = input<FlexLayoutVariants['gap']>();
  readonly spacing = input<FlexLayoutVariants['spacing']>();

  protected readonly class = computed(() =>
    cn(
      flexLayoutVariants({
        direction: this.direction(),
        wrap: this.wrap(),
        justify: this.justify(),
        align: this.align(),
        gap: this.gap(),
        spacing: this.spacing(),
      }),
      this.classInput(),
    ),
  );
}
