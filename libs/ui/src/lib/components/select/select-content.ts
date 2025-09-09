import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  computed,
  input,
} from '@angular/core';

import { cn } from '@semantic-components/utils';

@Component({
  selector: 'div[sc-select-content]',
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
export class ScSelectContent {
  readonly classInput = input<string>('', {
    alias: 'class',
  });

  protected readonly class = computed(() => cn('max-h-60 overflow-y-auto p-1', this.classInput()));
}
