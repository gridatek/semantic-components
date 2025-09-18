import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  computed,
  input,
} from '@angular/core';

import { cn } from '@semantic-components/utils';
import { VariantProps, cva } from 'class-variance-authority';

export const stackLayoutVariants = cva('flex flex-col', {
  variants: {
    gap: {
      undefined: '',
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
    align: {
      undefined: '',
      start: 'items-start',
      center: 'items-center',
      end: 'items-end',
      stretch: 'items-stretch',
    },
    justify: {
      undefined: '',
      start: 'justify-start',
      center: 'justify-center',
      end: 'justify-end',
      between: 'justify-between',
      around: 'justify-around',
      evenly: 'justify-evenly',
    },
    padding: {
      undefined: '',
      '0': 'p-0',
      '1': 'p-1',
      '2': 'p-2',
      '3': 'p-3',
      '4': 'p-4',
      '5': 'p-5',
      '6': 'p-6',
      '8': 'p-8',
      '10': 'p-10',
      '12': 'p-12',
    },
  },
});

export type StackLayoutVariants = VariantProps<typeof stackLayoutVariants>;

@Component({
  selector: 'div[sc-stack-layout]',
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
export class ScStackLayout {
  readonly classInput = input<string>('', {
    alias: 'class',
  });

  readonly gap = input<StackLayoutVariants['gap']>('4');
  readonly align = input<StackLayoutVariants['align']>();
  readonly justify = input<StackLayoutVariants['justify']>();
  readonly padding = input<StackLayoutVariants['padding']>();

  protected readonly class = computed(() =>
    cn(
      stackLayoutVariants({
        gap: this.gap(),
        align: this.align(),
        justify: this.justify(),
        padding: this.padding(),
      }),
      this.classInput(),
    ),
  );
}
