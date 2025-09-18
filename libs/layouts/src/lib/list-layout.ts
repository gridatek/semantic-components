import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  computed,
  input,
} from '@angular/core';

import { cn } from '@semantic-components/utils';
import { VariantProps, cva } from 'class-variance-authority';

export const listLayoutVariants = cva('space-y-0', {
  variants: {
    variant: {
      undefined: '',
      basic: 'divide-y divide-border',
      card: 'space-y-4',
      compact: 'space-y-1',
      loose: 'space-y-6',
    },
    itemPadding: {
      undefined: '',
      none: '[&>*]:p-0',
      sm: '[&>*]:p-2',
      md: '[&>*]:p-4',
      lg: '[&>*]:p-6',
      xl: '[&>*]:p-8',
    },
    hover: {
      undefined: '',
      true: '[&>*]:hover:bg-muted/50 [&>*]:transition-colors',
      false: '',
    },
    rounded: {
      undefined: '',
      none: '[&>*]:rounded-none',
      sm: '[&>*]:rounded-sm',
      md: '[&>*]:rounded-md',
      lg: '[&>*]:rounded-lg',
    },
    border: {
      undefined: '',
      true: '[&>*]:border [&>*]:border-border',
      false: '',
    },
    shadow: {
      undefined: '',
      none: '[&>*]:shadow-none',
      sm: '[&>*]:shadow-sm',
      md: '[&>*]:shadow-md',
      lg: '[&>*]:shadow-lg',
    },
  },
});

export type ListLayoutVariants = VariantProps<typeof listLayoutVariants>;

@Component({
  selector: 'div[sc-list-layout]',
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
export class ScListLayout {
  readonly classInput = input<string>('', {
    alias: 'class',
  });

  readonly variant = input<ListLayoutVariants['variant']>('basic');
  readonly itemPadding = input<ListLayoutVariants['itemPadding']>('md');
  readonly hover = input<ListLayoutVariants['hover']>();
  readonly rounded = input<ListLayoutVariants['rounded']>();
  readonly border = input<ListLayoutVariants['border']>();
  readonly shadow = input<ListLayoutVariants['shadow']>();

  protected readonly class = computed(() =>
    cn(
      listLayoutVariants({
        variant: this.variant(),
        itemPadding: this.itemPadding(),
        hover: this.hover(),
        rounded: this.rounded(),
        border: this.border(),
        shadow: this.shadow(),
      }),
      this.classInput(),
    ),
  );
}
