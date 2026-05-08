import { Directive, computed, input } from '@angular/core';
import { cn } from '@semantic-components/ui';

@Directive({
  selector: '[scPdfViewerSpacer]',
  host: {
    '[class]': 'class()',
  },
})
export class ScPdfViewerSpacer {
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() => cn('flex-1', this.classInput()));
}
