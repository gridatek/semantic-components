import {
  Component,
  ViewEncapsulation,
  computed,
  inject,
  input,
} from '@angular/core';
import { cn } from '../../utils';
import { ScProgress } from './progress';

@Component({
  selector: '[scProgressIndicator]',
  host: {
    '[class]': 'class()',
    '[style.transform]':
      '"translateX(-" + (100 - progress.percentage()) + "%)"',
  },
  template: ``,
  encapsulation: ViewEncapsulation.None,
})
export class ScProgressIndicator {
  protected readonly progress = inject(ScProgress);

  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn('bg-primary size-full flex-1 transition-all', this.classInput()),
  );
}
