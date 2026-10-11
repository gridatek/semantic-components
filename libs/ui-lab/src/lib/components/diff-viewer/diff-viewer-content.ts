import { Directive, computed, input } from '@angular/core';
import { cn } from '@semantic-components/ui';

@Directive({
  selector: 'div[scDiffViewerContent]',
  host: {
    '[class]': 'class()',
    '[style.max-height]': 'maxHeight()',
    role: 'group',
    tabindex: '0',
    '[attr.aria-label]': 'ariaLabel()',
  },
})
export class ScDiffViewerContent {
  readonly classInput = input<string>('', { alias: 'class' });
  readonly maxHeight = input<string>('600px');
  /** Name of the scrollable region. */
  readonly ariaLabel = input<string>('Differences', { alias: 'aria-label' });

  protected readonly class = computed(() =>
    cn(
      'overflow-auto outline-none focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:ring-inset',
      this.classInput(),
    ),
  );
}
