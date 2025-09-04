import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  computed,
  input,
} from '@angular/core';

import { cn } from '@semantic-components/utils';

@Component({
  selector: 'h2[sc-page-subtitle]',
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
export class ScPageSubtitle {
  readonly classInput = input<string>('', {
    alias: 'class',
  });

  // Page subtitle with refined styling - no border to work better within page headers
  protected readonly class = computed(() =>
    cn(
      'scroll-m-20 text-xl font-medium tracking-tight text-muted-foreground first:mt-0',
      this.classInput(),
    ),
  );
}
