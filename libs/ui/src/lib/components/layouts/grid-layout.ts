import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  computed,
  input,
} from '@angular/core';

import { cn } from '@semantic-components/utils';

@Component({
  selector: 'sc-grid-layout',
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
  readonly cols = input<1 | 2 | 3 | 4 | 5 | 6 | 12>(1);
  readonly gap = input<0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8>(6);
  readonly smCols = input<1 | 2 | 3 | 4 | 5 | 6 | 12 | undefined>(undefined);
  readonly mdCols = input<1 | 2 | 3 | 4 | 5 | 6 | 12 | undefined>(undefined);
  readonly lgCols = input<1 | 2 | 3 | 4 | 5 | 6 | 12 | undefined>(undefined);
  readonly xlCols = input<1 | 2 | 3 | 4 | 5 | 6 | 12 | undefined>(undefined);

  // Alignment options
  readonly alignItems = input<'start' | 'center' | 'end' | 'stretch'>('stretch');
  readonly justifyContent = input<'start' | 'center' | 'end' | 'between' | 'around' | 'evenly'>(
    'start',
  );

  // Static class mappings for Tailwind CSS compilation
  private readonly gridColsMap = {
    1: 'grid-cols-1',
    2: 'grid-cols-2',
    3: 'grid-cols-3',
    4: 'grid-cols-4',
    5: 'grid-cols-5',
    6: 'grid-cols-6',
    12: 'grid-cols-12',
  } as const;

  private readonly smGridColsMap = {
    1: 'sm:grid-cols-1',
    2: 'sm:grid-cols-2',
    3: 'sm:grid-cols-3',
    4: 'sm:grid-cols-4',
    5: 'sm:grid-cols-5',
    6: 'sm:grid-cols-6',
    12: 'sm:grid-cols-12',
  } as const;

  private readonly mdGridColsMap = {
    1: 'md:grid-cols-1',
    2: 'md:grid-cols-2',
    3: 'md:grid-cols-3',
    4: 'md:grid-cols-4',
    5: 'md:grid-cols-5',
    6: 'md:grid-cols-6',
    12: 'md:grid-cols-12',
  } as const;

  private readonly lgGridColsMap = {
    1: 'lg:grid-cols-1',
    2: 'lg:grid-cols-2',
    3: 'lg:grid-cols-3',
    4: 'lg:grid-cols-4',
    5: 'lg:grid-cols-5',
    6: 'lg:grid-cols-6',
    12: 'lg:grid-cols-12',
  } as const;

  private readonly xlGridColsMap = {
    1: 'xl:grid-cols-1',
    2: 'xl:grid-cols-2',
    3: 'xl:grid-cols-3',
    4: 'xl:grid-cols-4',
    5: 'xl:grid-cols-5',
    6: 'xl:grid-cols-6',
    12: 'xl:grid-cols-12',
  } as const;

  private readonly gapMap = {
    0: 'gap-0',
    1: 'gap-1',
    2: 'gap-2',
    3: 'gap-3',
    4: 'gap-4',
    5: 'gap-5',
    6: 'gap-6',
    7: 'gap-7',
    8: 'gap-8',
  } as const;

  private readonly alignItemsMap = {
    start: 'items-start',
    center: 'items-center',
    end: 'items-end',
    stretch: 'items-stretch',
  } as const;

  private readonly justifyContentMap = {
    start: 'justify-start',
    center: 'justify-center',
    end: 'justify-end',
    between: 'justify-between',
    around: 'justify-around',
    evenly: 'justify-evenly',
  } as const;

  // Responsive grid system with static class names for Tailwind CSS
  // Usage: <sc-grid-layout [cols]="2" [mdCols]="3" [lgCols]="4" [gap]="4" alignItems="center" justifyContent="center">
  protected readonly class = computed(() => {
    const baseGrid = `grid ${this.gridColsMap[this.cols()]} ${this.gapMap[this.gap()]}`;

    const alignmentClasses = `${this.alignItemsMap[this.alignItems()]} ${this.justifyContentMap[this.justifyContent()]}`;

    const responsiveClasses = [
      this.smCols() ? this.smGridColsMap[this.smCols()!] : '',
      this.mdCols() ? this.mdGridColsMap[this.mdCols()!] : '',
      this.lgCols() ? this.lgGridColsMap[this.lgCols()!] : '',
      this.xlCols() ? this.xlGridColsMap[this.xlCols()!] : '',
    ]
      .filter(Boolean)
      .join(' ');

    return cn(baseGrid, alignmentClasses, responsiveClasses, this.classInput());
  });
}
