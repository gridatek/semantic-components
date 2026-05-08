import { Directive, computed, input } from '@angular/core';
import { cn } from '@semantic-components/ui';

@Directive({
  selector: 'div[scDiffViewerFooter]',
  host: {
    '[class]': 'class()',
  },
})
export class ScDiffViewerFooter {
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn(
      'text-muted-foreground bg-muted/30 flex items-center justify-between border-t px-4 py-2 text-xs',
      this.classInput(),
    ),
  );
}
