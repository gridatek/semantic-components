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

  // Page content with max width constraint and generous spacing between sections
  protected readonly class = computed(() =>
    cn('inline-block w-full max-w-4xl mx-auto px-6 py-8 space-y-16', this.classInput()),
  );
}
