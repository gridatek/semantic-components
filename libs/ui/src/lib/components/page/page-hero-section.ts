import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  computed,
  input,
} from '@angular/core';

import { cn } from '@semantic-components/utils';

@Component({
  selector: 'sc-page-hero-section',
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
export class ScPageHeroSection {
  readonly classInput = input<string>('', {
    alias: 'class',
  });

  // Hero section with responsive padding and inline-block layout
  // Designed to connect directly to navigation when used as first element
  protected readonly class = computed(() =>
    cn('inline-block w-full relative py-12 md:py-20 lg:py-24', this.classInput()),
  );
}
