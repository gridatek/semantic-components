import { Directive, computed, input } from '@angular/core';
import { cn } from '@semantic-components/ui';

@Directive({
  selector: 'span[scDiffViewerLineNumber]',
  host: {
    '[class]': 'class()',
  },
})
export class ScDiffViewerLineNumber {
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn(
      'text-muted-foreground inline-block w-12 shrink-0 border-e px-2 text-end select-none',
      'group-data-[type=added]/line:text-current group-data-[type=removed]/line:text-current',
      this.classInput(),
    ),
  );
}
