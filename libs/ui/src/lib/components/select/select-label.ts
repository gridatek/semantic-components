import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
  ViewEncapsulation,
} from '@angular/core';
import { cn } from '../../utils';
import { ScSelect } from './select';

@Component({
  selector: 'span[scSelectLabel], div[scSelectLabel]',
  template: `
    {{ select.label() }}
  `,
  host: {
    'data-slot': 'select-label',
    '[class]': 'class()',
  },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScSelectLabel {
  protected readonly select = inject(ScSelect);

  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn('truncate pointer-events-none', this.classInput()),
  );
}
