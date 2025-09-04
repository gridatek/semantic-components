import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  computed,
  input,
} from '@angular/core';

import { cn } from '@semantic-components/utils';

@Component({
  selector: 'sc-page-section-header',
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
export class ScPageSectionHeader {
  readonly classInput = input<string>('', {
    alias: 'class',
  });

  // Section header with tight spacing for title/subtitle/description - centered alignment
  protected readonly class = computed(() =>
    cn('inline-block w-full space-y-2 mb-6 text-center', this.classInput()),
  );
}
