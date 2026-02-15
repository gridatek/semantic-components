import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  ViewEncapsulation,
} from '@angular/core';
import { Tabs } from '@angular/aria/tabs';
import { cn } from '@semantic-components/ui';

@Component({
  selector: '[scTabs]',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  hostDirectives: [
    {
      directive: Tabs,
    },
  ],
  host: {
    'data-slot': 'tabs',
    '[class]': 'class()',
    '[attr.data-orientation]': 'orientation()',
  },
  template: `
    <ng-content />
  `,
})
export class ScTabs {
  readonly classInput = input<string>('', { alias: 'class' });
  readonly orientation = input<'horizontal' | 'vertical'>('horizontal');
  readonly class = computed(() =>
    cn(
      'group/tabs gap-2 flex data-[orientation=horizontal]:flex-col data-[orientation=vertical]:flex-row',
      this.classInput(),
    ),
  );
}
