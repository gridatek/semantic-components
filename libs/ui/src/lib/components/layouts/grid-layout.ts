import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  computed,
  input,
} from '@angular/core';

import { cn } from '@semantic-components/utils';
import { type VariantProps, cva } from 'class-variance-authority';

export const gridLayoutVariants = cva('grid', {
  variants: {
    cols: {
      '1': 'grid-cols-1',
      '2': 'grid-cols-2',
      '3': 'grid-cols-3',
      '4': 'grid-cols-4',
      '5': 'grid-cols-5',
      '6': 'grid-cols-6',
      '7': 'grid-cols-7',
      '8': 'grid-cols-8',
      '9': 'grid-cols-9',
      '10': 'grid-cols-10',
      '11': 'grid-cols-11',
      '12': 'grid-cols-12',
    },
    colSizing: {
      auto: 'grid-cols-[auto]',
      min: 'grid-cols-[min-content]',
      max: 'grid-cols-[max-content]',
      fr: 'grid-cols-[1fr]',
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
    align: {
      start: 'items-start',
      center: 'items-center',
      end: 'items-end',
      stretch: 'items-stretch',
      baseline: 'items-baseline',
    },
    justify: {
      start: 'justify-start',
      center: 'justify-center',
      end: 'justify-end',
      between: 'justify-between',
      around: 'justify-around',
      evenly: 'justify-evenly',
    },
    smCols: {
      '1': 'sm:grid-cols-1',
      '2': 'sm:grid-cols-2',
      '3': 'sm:grid-cols-3',
      '4': 'sm:grid-cols-4',
      '5': 'sm:grid-cols-5',
      '6': 'sm:grid-cols-6',
      '7': 'sm:grid-cols-7',
      '8': 'sm:grid-cols-8',
      '9': 'sm:grid-cols-9',
      '10': 'sm:grid-cols-10',
      '11': 'sm:grid-cols-11',
      '12': 'sm:grid-cols-12',
    },
    mdCols: {
      '1': 'md:grid-cols-1',
      '2': 'md:grid-cols-2',
      '3': 'md:grid-cols-3',
      '4': 'md:grid-cols-4',
      '5': 'md:grid-cols-5',
      '6': 'md:grid-cols-6',
      '7': 'md:grid-cols-7',
      '8': 'md:grid-cols-8',
      '9': 'md:grid-cols-9',
      '10': 'md:grid-cols-10',
      '11': 'md:grid-cols-11',
      '12': 'md:grid-cols-12',
    },
    lgCols: {
      '1': 'lg:grid-cols-1',
      '2': 'lg:grid-cols-2',
      '3': 'lg:grid-cols-3',
      '4': 'lg:grid-cols-4',
      '5': 'lg:grid-cols-5',
      '6': 'lg:grid-cols-6',
      '7': 'lg:grid-cols-7',
      '8': 'lg:grid-cols-8',
      '9': 'lg:grid-cols-9',
      '10': 'lg:grid-cols-10',
      '11': 'lg:grid-cols-11',
      '12': 'lg:grid-cols-12',
    },
    xlCols: {
      '1': 'xl:grid-cols-1',
      '2': 'xl:grid-cols-2',
      '3': 'xl:grid-cols-3',
      '4': 'xl:grid-cols-4',
      '5': 'xl:grid-cols-5',
      '6': 'xl:grid-cols-6',
      '7': 'xl:grid-cols-7',
      '8': 'xl:grid-cols-8',
      '9': 'xl:grid-cols-9',
      '10': 'xl:grid-cols-10',
      '11': 'xl:grid-cols-11',
      '12': 'xl:grid-cols-12',
    },
    rows: {
      '1': 'grid-rows-1',
      '2': 'grid-rows-2',
      '3': 'grid-rows-3',
      '4': 'grid-rows-4',
      '5': 'grid-rows-5',
      '6': 'grid-rows-6',
      '7': 'grid-rows-7',
      '8': 'grid-rows-8',
      '9': 'grid-rows-9',
      '10': 'grid-rows-10',
      '11': 'grid-rows-11',
      '12': 'grid-rows-12',
    },
    rowSizing: {
      auto: 'grid-rows-[auto]',
      min: 'grid-rows-[min-content]',
      max: 'grid-rows-[max-content]',
      fr: 'grid-rows-[1fr]',
    },
    flow: {
      row: 'grid-flow-row',
      col: 'grid-flow-col',
      dense: 'grid-flow-dense',
      'row-dense': 'grid-flow-row-dense',
      'col-dense': 'grid-flow-col-dense',
    },
  },
});

export type GridLayoutVariants = VariantProps<typeof gridLayoutVariants>;

@Component({
  selector: 'div[sc-grid-layout]',
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
export class ScGridLayout {
  readonly classInput = input<string>('', {
    alias: 'class',
  });

  // Grid configuration inputs
  readonly cols = input<GridLayoutVariants['cols']>('1');
  readonly colSizing = input<GridLayoutVariants['colSizing']>();
  readonly gap = input<GridLayoutVariants['gap']>('6');
  readonly rows = input<GridLayoutVariants['rows']>();
  readonly rowSizing = input<GridLayoutVariants['rowSizing']>();
  readonly flow = input<GridLayoutVariants['flow']>();
  readonly smCols = input<GridLayoutVariants['smCols']>();
  readonly mdCols = input<GridLayoutVariants['mdCols']>();
  readonly lgCols = input<GridLayoutVariants['lgCols']>();
  readonly xlCols = input<GridLayoutVariants['xlCols']>();

  // Alignment options
  readonly align = input<GridLayoutVariants['align']>('stretch');
  readonly justify = input<GridLayoutVariants['justify']>('start');

  protected readonly class = computed(() =>
    cn(
      gridLayoutVariants({
        cols: this.cols(),
        colSizing: this.colSizing(),
        gap: this.gap(),
        rows: this.rows(),
        rowSizing: this.rowSizing(),
        flow: this.flow(),
        align: this.align(),
        justify: this.justify(),
        smCols: this.smCols(),
        mdCols: this.mdCols(),
        lgCols: this.lgCols(),
        xlCols: this.xlCols(),
      }),
      this.classInput(),
    ),
  );
}
