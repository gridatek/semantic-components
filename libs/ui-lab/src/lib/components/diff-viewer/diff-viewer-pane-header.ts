import { Directive, computed, input } from '@angular/core';
import { cn } from '@semantic-components/ui';

@Directive({
  selector: 'div[scDiffViewerPaneHeader]',
  host: {
    '[class]': 'class()',
  },
})
export class ScDiffViewerPaneHeader {
  readonly classInput = input<string>('', { alias: 'class' });
  readonly variant = input<'old' | 'new'>('old');

  protected readonly class = computed(() =>
    cn(
      'text-muted-foreground border-b px-3 py-1.5 text-xs font-medium',
      this.variant() === 'old' ? 'bg-red-500/5' : 'bg-green-500/5',
      this.classInput(),
    ),
  );
}
