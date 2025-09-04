import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  computed,
  input,
} from '@angular/core';

import { cn } from '@semantic-components/utils';

@Component({
  selector: 'sc-page-header',
  imports: [],
  template: `
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-4 text-center">
      <ng-content />
    </div>
  `,
  host: {
    '[class]': 'class()',
  },
  styles: ``,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScPageHeader {
  readonly classInput = input<string>('', {
    alias: 'class',
  });

  // Page header with full-width background and constrained, centered content
  // Provides consistent spacing for title, subtitle, and description elements
  protected readonly class = computed(() =>
    cn('block w-full border-b border-gray-100 bg-gray-50/50', this.classInput()),
  );
}
