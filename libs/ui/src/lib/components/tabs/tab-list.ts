import { TabList } from '@angular/aria/tabs';
import {
  Component,
  HostAttributeToken,
  ViewEncapsulation,
  computed,
  inject,
  input,
} from '@angular/core';
import { type VariantProps, cva } from 'class-variance-authority';
import { bindInput, cn } from '../../utils';
import { ScTabs } from './tabs';

export const tabsListVariants = cva(
  'rounded-lg p-[3px] group-data-[orientation=horizontal]/tabs:h-8 data-[variant=line]:rounded-none group/tab-list text-muted-foreground inline-flex w-fit items-center justify-center group-data-[orientation=vertical]/tabs:h-fit group-data-[orientation=vertical]/tabs:flex-col',
  {
    variants: {
      variant: {
        default: 'bg-muted',
        line: 'gap-1 bg-transparent',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
);

type ScTabListVariant = VariantProps<typeof tabsListVariants>['variant'];

@Component({
  selector: '[scTabList]',
  encapsulation: ViewEncapsulation.None,
  hostDirectives: [
    {
      directive: TabList,
      inputs: [
        'selectedTab',
        'selectionMode',
        'orientation',
        'disabled',
        'wrap',
        'focusMode',
      ],
      outputs: ['selectedTabChange'],
    },
  ],
  host: {
    '[class]': 'class()',
    '[attr.data-variant]': 'variant()',
  },
  template: ` <ng-content /> `,
})
export class ScTabList {
  readonly classInput = input<string>('', { alias: 'class' });
  readonly variant = input<ScTabListVariant>('default');
  readonly class = computed(() =>
    cn(tabsListVariants({ variant: this.variant() }), this.classInput()),
  );

  constructor() {
    // Arrow keys follow the layout: unless the list sets its own
    // `orientation`, use the one given to `scTabs` (vertical tabs use ↑/↓).
    const tabs = inject(ScTabs, { optional: true });
    const own = inject(new HostAttributeToken('orientation'), {
      optional: true,
    });
    if (tabs && own === null) {
      bindInput(inject(TabList).orientation, tabs.orientation);
    }
  }
}
