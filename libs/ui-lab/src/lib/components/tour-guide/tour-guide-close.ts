import { Directive, computed, inject, input } from '@angular/core';
import { cn } from '@semantic-components/ui';
import { ScTourGuideState } from './tour-guide-state';

@Directive({
  selector: 'button[scTourGuideClose]',
  host: {
    'data-slot': 'tour-guide-close',
    type: 'button',
    '[class]': 'class()',
    '(click)': 'state.close()',
  },
})
export class ScTourGuideClose {
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly state = inject(ScTourGuideState);

  protected readonly class = computed(() =>
    cn('hover:bg-accent absolute top-2 right-2 rounded p-1', this.classInput()),
  );
}
