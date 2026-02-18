import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
  ViewEncapsulation,
} from '@angular/core';
import { cn } from '@semantic-components/ui';
import { ScProgress } from './progress';

@Component({
  selector: '[scProgressIndicator]',
  host: {
    'data-slot': 'progress-indicator',
    '[class]': 'class()',
    '[style.transform]':
      '"translateX(-" + (100 - progress.percentage()) + "%)"',
  },
  template: ``,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScProgressIndicator {
  protected readonly progress = inject(ScProgress);

  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn('bg-primary size-full flex-1 transition-all', this.classInput()),
  );
}
