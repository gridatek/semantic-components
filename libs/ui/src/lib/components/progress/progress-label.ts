import { _IdGenerator } from '@angular/cdk/a11y';
import { Directive, computed, effect, inject, input } from '@angular/core';
import { cn } from '../../utils';
import { ScProgress } from './progress';

/** Your label for the progress — its name (`aria-labelledby`). */
@Directive({
  selector: '[scProgressLabel]',
  host: {
    'data-slot': 'progress-label',
    '[id]': 'id()',
    '[class]': 'class()',
  },
})
export class ScProgressLabel {
  private readonly progress = inject(ScProgress);

  readonly classInput = input<string>('', { alias: 'class' });
  readonly id = input(inject(_IdGenerator).getId('sc-progress-label-'));

  protected readonly class = computed(() =>
    cn('text-sm font-medium', this.classInput()),
  );

  constructor() {
    effect((onCleanup) => {
      this.progress.labelId.set(this.id());
      onCleanup(() => this.progress.labelId.set(null));
    });
  }
}
