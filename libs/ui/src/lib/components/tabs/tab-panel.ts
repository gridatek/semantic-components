import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  ViewEncapsulation,
} from '@angular/core';
import { TabPanel } from '@angular/aria/tabs';
import { cn } from '../../utils';

@Component({
  selector: '[scTabPanel]',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  hostDirectives: [
    {
      directive: TabPanel,
      inputs: ['value', 'id'],
    },
  ],
  host: {
    'data-slot': 'tabs-content',
    '[class]': 'class()',
  },
  template: `
    <ng-content />
  `,
})
export class ScTabPanel {
  readonly classInput = input<string>('', { alias: 'class' });
  readonly class = computed(() =>
    cn('text-sm flex-1 outline-none [&[inert]]:hidden', this.classInput()),
  );
}
