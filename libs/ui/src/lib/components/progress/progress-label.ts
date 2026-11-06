import { _IdGenerator } from '@angular/cdk/a11y';
import { Directive, computed, effect, inject, input } from '@angular/core';
import { injectPreset } from '../../config/preset';
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
  private readonly styles = injectPreset().progress;
  private readonly progress = inject(ScProgress);

  readonly classInput = input<string>('', { alias: 'class' });
  readonly id = input(inject(_IdGenerator).getId('sc-progress-label-'));

  protected readonly class = computed(() =>
    cn(this.styles.label, this.classInput()),
  );

  constructor() {
    effect((onCleanup) => {
      this.progress.labelId.set(this.id());
      onCleanup(() => this.progress.labelId.set(null));
    });
  }
}
