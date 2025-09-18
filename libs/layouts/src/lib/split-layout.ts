import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  computed,
  input,
} from '@angular/core';

import { cn } from '@semantic-components/utils';
import { VariantProps, cva } from 'class-variance-authority';

export const splitLayoutVariants = cva('flex', {
  variants: {
    direction: {
      undefined: '',
      horizontal: 'flex-row',
      vertical: 'flex-col',
    },
    ratio: {
      undefined: '',
      '50-50': '[&>*:first-child]:flex-1 [&>*:last-child]:flex-1',
      '60-40': '[&>*:first-child]:flex-[3] [&>*:last-child]:flex-[2]',
      '70-30': '[&>*:first-child]:flex-[7] [&>*:last-child]:flex-[3]',
      '80-20': '[&>*:first-child]:flex-[4] [&>*:last-child]:flex-1',
      '40-60': '[&>*:first-child]:flex-[2] [&>*:last-child]:flex-[3]',
      '30-70': '[&>*:first-child]:flex-[3] [&>*:last-child]:flex-[7]',
      '20-80': '[&>*:first-child]:flex-1 [&>*:last-child]:flex-[4]',
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
    },
    divider: {
      undefined: '',
      true: 'divide-x divide-border',
      false: '',
    },
    resizable: {
      undefined: '',
      true: '[&>*]:resize [&>*]:overflow-auto',
      false: '',
    },
  },
});

export type SplitLayoutVariants = VariantProps<typeof splitLayoutVariants>;

@Component({
  selector: 'div[sc-split-layout]',
  imports: [],
  template: `
    <div class="panel-1">
      <ng-content select="[slot=panel-1]" />
    </div>
    <div class="panel-2">
      <ng-content select="[slot=panel-2]" />
    </div>
  `,
  host: {
    '[class]': 'class()',
  },
  styles: ``,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScSplitLayout {
  readonly classInput = input<string>('', {
    alias: 'class',
  });

  readonly direction = input<SplitLayoutVariants['direction']>('horizontal');
  readonly ratio = input<SplitLayoutVariants['ratio']>('50-50');
  readonly gap = input<SplitLayoutVariants['gap']>();
  readonly divider = input<SplitLayoutVariants['divider']>();
  readonly resizable = input<SplitLayoutVariants['resizable']>();

  protected readonly class = computed(() =>
    cn(
      splitLayoutVariants({
        direction: this.direction(),
        ratio: this.ratio(),
        gap: this.gap(),
        divider: this.divider(),
        resizable: this.resizable(),
      }),
      this.classInput(),
    ),
  );
}
