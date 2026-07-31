import { Component, ViewEncapsulation, computed, input } from '@angular/core';
import { cn } from '@semantic-components/ui';

@Component({
  selector: 'div[scCodeViewer]',
  template: `
    <ng-content />
  `,
  host: {
    '[class]': 'class()',
  },
  encapsulation: ViewEncapsulation.None,
})
export class ScCodeViewer {
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn('overflow-hidden rounded-lg border border-border', this.classInput()),
  );
}
