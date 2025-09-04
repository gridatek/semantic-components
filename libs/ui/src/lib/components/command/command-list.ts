import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  computed,
  input,
} from '@angular/core';

import { cn } from '@semantic-components/utils';

@Component({
  selector: 'sc-command-list',
  imports: [],
  template: `
    <ng-content />
  `,
  host: {
    '[class]': 'classes()',
    '[attr.role]': '"listbox"',
    '[attr.aria-label]': '"Command suggestions"',
  },
  styles: ``,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScCommandList {
  class = input<string>('');

  classes = computed(() =>
    cn('block max-h-[300px] overflow-y-auto overflow-x-hidden', this.class()),
  );
}
