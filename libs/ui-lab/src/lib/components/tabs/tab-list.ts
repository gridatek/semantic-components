import { TabList } from '@angular/aria/tabs';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  ViewEncapsulation,
} from '@angular/core';
import { cn } from '../../utils';

@Component({
  selector: 'div[sc-tab-list]',
  hostDirectives: [
    {
      directive: TabList,
      inputs: ['selectedTab', 'selectionMode', 'orientation'],
    },
  ],
  template: `
    <ng-content />
  `,
  host: {
    'data-slot': 'tab-list',
    '[class]': 'class()',
  },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScTabList {
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn(
      'inline-flex h-9 items-center justify-center rounded-lg bg-muted p-1 text-muted-foreground',
      this.classInput(),
    ),
  );
}
