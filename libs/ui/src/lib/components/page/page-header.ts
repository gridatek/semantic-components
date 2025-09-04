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
    <ng-content />
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

  // Page header with centered content and proper spacing
  // Provides consistent spacing for title, subtitle, and description elements
  protected readonly class = computed(() =>
    cn('space-y-4 py-8 px-6 border-b border-gray-100 bg-gray-50/50 text-center', this.classInput()),
  );
}
