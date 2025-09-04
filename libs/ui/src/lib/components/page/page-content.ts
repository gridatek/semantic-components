import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  computed,
  input,
} from '@angular/core';

import { cn } from '@semantic-components/utils';

@Component({
  selector: 'sc-page-content',
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
export class ScPageContent {
  readonly classInput = input<string>('', {
    alias: 'class',
  });

  // Page content with container width like navigation and footer, generous spacing between sections
  protected readonly class = computed(() =>
    cn('block w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-16', this.classInput()),
  );
}
