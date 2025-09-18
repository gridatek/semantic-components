import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  booleanAttribute,
  computed,
  input,
} from '@angular/core';

import { cn } from '@semantic-components/utils';
import { VariantProps, cva } from 'class-variance-authority';

export const dashboardLayoutVariants = cva('grid gap-4', {
  variants: {
    layout: {
      undefined: '',
      'two-column': 'grid-cols-1 lg:grid-cols-2',
      'three-column': 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
      'four-column': 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4',
      'sidebar-main': 'grid-cols-1 lg:grid-cols-[300px_1fr]',
      'main-sidebar': 'grid-cols-1 lg:grid-cols-[1fr_300px]',
      'auto-fit': 'grid-cols-[repeat(auto-fit,minmax(300px,1fr))]',
      'auto-fill': 'grid-cols-[repeat(auto-fill,minmax(300px,1fr))]',
    },
    gap: {
      undefined: '',
      '0': 'gap-0',
      '2': 'gap-2',
      '3': 'gap-3',
      '4': 'gap-4',
      '6': 'gap-6',
      '8': 'gap-8',
    },
    padding: {
      undefined: '',
      '0': 'p-0',
      '4': 'p-4',
      '6': 'p-6',
      '8': 'p-8',
    },
    // dense: {
    //   undefined: '',
    //   true: 'auto-rows-auto grid-flow-row-dense',
    //   false: '',
    // },
  },
});

export type DashboardLayoutVariants = VariantProps<typeof dashboardLayoutVariants>;

@Component({
  selector: 'div[sc-dashboard-layout]',
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
export class ScDashboardLayout {
  readonly classInput = input<string>('', {
    alias: 'class',
  });

  readonly layout = input<DashboardLayoutVariants['layout']>('auto-fit');
  readonly gap = input<DashboardLayoutVariants['gap']>('4');
  readonly padding = input<DashboardLayoutVariants['padding']>();

  // readonly dense = input<DashboardLayoutVariants['dense']>();

  readonly dense = input<boolean, unknown>(false, {
    transform: booleanAttribute,
  });

  protected readonly class = computed(() =>
    cn(
      dashboardLayoutVariants({
        layout: this.layout(),
        gap: this.gap(),
        padding: this.padding(),
        // dense: this.dense(),
      }),
      this.dense() && 'auto-rows-auto grid-flow-row-dense',
      this.classInput(),
    ),
  );
}
