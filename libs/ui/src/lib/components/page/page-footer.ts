import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  computed,
  input,
} from '@angular/core';

import { cn } from '@semantic-components/utils';

@Component({
  selector: 'sc-page-footer',
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
export class ScPageFooter {
  readonly classInput = input<string>('', {
    alias: 'class',
  });

  // Page footer with subtle separation and appropriate spacing
  protected readonly class = computed(() =>
    cn(
      'block w-full my-12 py-8 border-t border-gray-100 text-sm text-muted-foreground',
      this.classInput(),
    ),
  );
}
