import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  computed,
  input,
} from '@angular/core';

import { cn } from '@semantic-components/utils';

@Component({
  selector: 'sc-page-section-content',
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
export class ScPageSectionContent {
  readonly classInput = input<string>('', {
    alias: 'class',
  });

  // Section content with block layout for proper spacing and alignment
  protected readonly class = computed(() => cn('block w-full space-y-4', this.classInput()));
}
