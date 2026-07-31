import { Component, ViewEncapsulation, computed, input } from '@angular/core';
import { cn } from '@semantic-components/ui';

@Component({
  selector: 'div[scCodeViewerHeader]',
  template: `
    <ng-content />
  `,
  host: {
    '[class]': 'class()',
  },
  encapsulation: ViewEncapsulation.None,
})
export class ScCodeViewerHeader {
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn(
      'flex items-center justify-between border-b border-border px-4 py-2',
      this.classInput(),
    ),
  );
}
