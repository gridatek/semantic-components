import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  ViewEncapsulation,
} from '@angular/core';
import { cn } from '../../utils';

@Component({
  selector: 'span[scSelectLabel], div[scSelectLabel]',
  imports: [],
  template: `
    <ng-content />
  `,
  host: {
    'data-slot': 'select-label',
    '[class]': 'class()',
  },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScSelectLabel {
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn('pointer-events-none', this.classInput()),
  );
}
