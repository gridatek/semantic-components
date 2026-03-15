import { Directive, computed, input } from '@angular/core';
import { cn } from '@semantic-components/ui';

@Directive({
  selector: 'div[scTourGuideNavigation]',
  host: {
    'data-slot': 'tour-guide-navigation',
    '[class]': 'class()',
  },
})
export class ScTourGuideNavigation {
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn(
      'mt-4 flex items-center justify-between border-t pt-4',
      this.classInput(),
    ),
  );
}
