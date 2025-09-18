import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  computed,
  input,
} from '@angular/core';

import { cn } from '@semantic-components/utils';
import { VariantProps, cva } from 'class-variance-authority';

export const sidebarLayoutVariants = cva('flex', {
  variants: {
    direction: {
      undefined: '',
      left: 'flex-row',
      right: 'flex-row-reverse',
    },
    sidebarWidth: {
      undefined: '',
      xs: '[&>*:first-child]:w-48',
      sm: '[&>*:first-child]:w-64',
      md: '[&>*:first-child]:w-72',
      lg: '[&>*:first-child]:w-80',
      xl: '[&>*:first-child]:w-96',
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
    collapsible: {
      undefined: '',
      true: '[&>*:first-child]:transition-all [&>*:first-child]:duration-300',
      false: '',
    },
  },
});

export type SidebarLayoutVariants = VariantProps<typeof sidebarLayoutVariants>;

@Component({
  selector: 'div[sc-sidebar-layout]',
  imports: [],
  template: `
    <div class="sidebar">
      <ng-content select="[slot=sidebar]" />
    </div>
    <main class="flex-1 min-w-0">
      <ng-content />
    </main>
  `,
  host: {
    '[class]': 'class()',
  },
  styles: ``,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScSidebarLayout {
  readonly classInput = input<string>('', {
    alias: 'class',
  });

  readonly direction = input<SidebarLayoutVariants['direction']>('left');
  readonly sidebarWidth = input<SidebarLayoutVariants['sidebarWidth']>('md');
  readonly gap = input<SidebarLayoutVariants['gap']>();
  readonly collapsible = input<SidebarLayoutVariants['collapsible']>();

  protected readonly class = computed(() =>
    cn(
      sidebarLayoutVariants({
        direction: this.direction(),
        sidebarWidth: this.sidebarWidth(),
        gap: this.gap(),
        collapsible: this.collapsible(),
      }),
      this.classInput(),
    ),
  );
}
