import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  computed,
  input,
} from '@angular/core';

import { cn } from '@semantic-components/utils';
import { VariantProps, cva } from 'class-variance-authority';

export const centerLayoutVariants = cva('flex', {
  variants: {
    strategy: {
      undefined: '',
      'flex-center': 'items-center justify-center',
      'grid-center': 'grid place-items-center',
      'absolute-center':
        'relative [&>*]:absolute [&>*]:top-1/2 [&>*]:left-1/2 [&>*]:-translate-x-1/2 [&>*]:-translate-y-1/2',
    },
    direction: {
      undefined: '',
      row: 'flex-row',
      col: 'flex-col',
    },
    maxWidth: {
      undefined: '',
      sm: 'max-w-sm',
      md: 'max-w-md',
      lg: 'max-w-lg',
      xl: 'max-w-xl',
      '2xl': 'max-w-2xl',
      '3xl': 'max-w-3xl',
      '4xl': 'max-w-4xl',
      '5xl': 'max-w-5xl',
      '6xl': 'max-w-6xl',
      '7xl': 'max-w-7xl',
      full: 'max-w-full',
      none: 'max-w-none',
    },
    height: {
      undefined: '',
      screen: 'min-h-screen',
      full: 'h-full',
      auto: 'h-auto',
    },
    padding: {
      undefined: '',
      '0': 'p-0',
      '4': 'p-4',
      '6': 'p-6',
      '8': 'p-8',
      '12': 'p-12',
      '16': 'p-16',
      '20': 'p-20',
    },
  },
});

export type CenterLayoutVariants = VariantProps<typeof centerLayoutVariants>;

@Component({
  selector: 'div[sc-center-layout]',
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
export class ScCenterLayout {
  readonly classInput = input<string>('', {
    alias: 'class',
  });

  readonly strategy = input<CenterLayoutVariants['strategy']>('flex-center');
  readonly direction = input<CenterLayoutVariants['direction']>();
  readonly maxWidth = input<CenterLayoutVariants['maxWidth']>();
  readonly height = input<CenterLayoutVariants['height']>('screen');
  readonly padding = input<CenterLayoutVariants['padding']>();

  protected readonly class = computed(() =>
    cn(
      centerLayoutVariants({
        strategy: this.strategy(),
        direction: this.direction(),
        maxWidth: this.maxWidth(),
        height: this.height(),
        padding: this.padding(),
      }),
      this.classInput(),
    ),
  );
}
