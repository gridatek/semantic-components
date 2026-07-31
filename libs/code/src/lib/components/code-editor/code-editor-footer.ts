import { Component, ViewEncapsulation, computed, input } from '@angular/core';
import { cn } from '@semantic-components/ui';

@Component({
  selector: 'div[scCodeEditorFooter]',
  template: `
    <ng-content />
  `,
  host: {
    '[class]': 'class()',
  },
  encapsulation: ViewEncapsulation.None,
})
export class ScCodeEditorFooter {
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn(
      'flex items-center justify-between border-t border-border bg-background/50 px-3 py-1.5 text-xs text-muted-foreground',
      this.classInput(),
    ),
  );
}
