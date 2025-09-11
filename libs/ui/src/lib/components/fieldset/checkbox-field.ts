import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  computed,
  input,
} from '@angular/core';

import { cn } from '@semantic-components/utils';

@Component({
  selector: 'div[sc-checkbox-field]',
  imports: [],
  template: `
    <ng-content />
  `,
  host: {
    'data-slot': 'checkbox-field',
    '[class]': 'class()',
  },
  styles: ``,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScCheckboxField {
  readonly classInput = input<string>('', {
    alias: 'class',
  });

  readonly orientation = input<'horizontal' | 'vertical'>('horizontal');

  protected readonly class = computed(() =>
    cn(
      // Base spacing and layout
      'flex gap-2',
      // Horizontal orientation (default) - checkbox and label side by side
      this.orientation() === 'horizontal' && 'items-center',
      // Vertical orientation - checkbox and label stacked
      this.orientation() === 'vertical' && 'flex-col items-start',
      // Better focus and hover states
      'group relative',
      // Touch targets for better mobile interaction
      'min-h-[44px] min-w-[44px]',
      this.classInput(),
    ),
  );
}
