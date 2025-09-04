import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  computed,
  input,
} from '@angular/core';

import { cn } from '@semantic-components/utils';

@Component({
  selector: 'sc-page-section',
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
export class ScPageSection {
  readonly classInput = input<string>('', {
    alias: 'class',
  });

  // Page section with structured spacing between header, content, and footer
  protected readonly class = computed(() => cn('inline-block w-full space-y-6', this.classInput()));
}
