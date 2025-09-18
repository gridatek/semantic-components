import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  computed,
  input,
} from '@angular/core';

import { cn } from '@semantic-components/utils';
import { VariantProps, cva } from 'class-variance-authority';

export const masonryLayoutVariants = cva('columns-1', {
  variants: {
    cols: {
      undefined: '',
      '1': 'columns-1',
      '2': 'columns-2',
      '3': 'columns-3',
      '4': 'columns-4',
      '5': 'columns-5',
      '6': 'columns-6',
      '7': 'columns-7',
      '8': 'columns-8',
      '9': 'columns-9',
      '10': 'columns-10',
      '11': 'columns-11',
      '12': 'columns-12',
    },
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
    smCols: {
      undefined: '',
      '1': 'sm:columns-1',
      '2': 'sm:columns-2',
      '3': 'sm:columns-3',
      '4': 'sm:columns-4',
      '5': 'sm:columns-5',
      '6': 'sm:columns-6',
      '7': 'sm:columns-7',
      '8': 'sm:columns-8',
      '9': 'sm:columns-9',
      '10': 'sm:columns-10',
      '11': 'sm:columns-11',
      '12': 'sm:columns-12',
    },
    mdCols: {
      undefined: '',
      '1': 'md:columns-1',
      '2': 'md:columns-2',
      '3': 'md:columns-3',
      '4': 'md:columns-4',
      '5': 'md:columns-5',
      '6': 'md:columns-6',
      '7': 'md:columns-7',
      '8': 'md:columns-8',
      '9': 'md:columns-9',
      '10': 'md:columns-10',
      '11': 'md:columns-11',
      '12': 'md:columns-12',
    },
    lgCols: {
      undefined: '',
      '1': 'lg:columns-1',
      '2': 'lg:columns-2',
      '3': 'lg:columns-3',
      '4': 'lg:columns-4',
      '5': 'lg:columns-5',
      '6': 'lg:columns-6',
      '7': 'lg:columns-7',
      '8': 'lg:columns-8',
      '9': 'lg:columns-9',
      '10': 'lg:columns-10',
      '11': 'lg:columns-11',
      '12': 'lg:columns-12',
    },
    xlCols: {
      undefined: '',
      '1': 'xl:columns-1',
      '2': 'xl:columns-2',
      '3': 'xl:columns-3',
      '4': 'xl:columns-4',
      '5': 'xl:columns-5',
      '6': 'xl:columns-6',
      '7': 'xl:columns-7',
      '8': 'xl:columns-8',
      '9': 'xl:columns-9',
      '10': 'xl:columns-10',
      '11': 'xl:columns-11',
      '12': 'xl:columns-12',
    },
  },
});

export type MasonryLayoutVariants = VariantProps<typeof masonryLayoutVariants>;

@Component({
  selector: 'div[sc-masonry-layout]',
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
export class ScMasonryLayout {
  readonly classInput = input<string>('', {
    alias: 'class',
  });

  // Masonry configuration inputs
  readonly cols = input<MasonryLayoutVariants['cols']>('1');
  readonly gap = input<MasonryLayoutVariants['gap']>('4');
  readonly smCols = input<MasonryLayoutVariants['smCols']>();
  readonly mdCols = input<MasonryLayoutVariants['mdCols']>();
  readonly lgCols = input<MasonryLayoutVariants['lgCols']>();
  readonly xlCols = input<MasonryLayoutVariants['xlCols']>();

  protected readonly class = computed(() =>
    cn(
      masonryLayoutVariants({
        cols: this.cols(),
        gap: this.gap(),
        smCols: this.smCols(),
        mdCols: this.mdCols(),
        lgCols: this.lgCols(),
        xlCols: this.xlCols(),
      }),
      this.classInput(),
    ),
  );
}
