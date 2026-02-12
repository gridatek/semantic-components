import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  ViewEncapsulation,
} from '@angular/core';
import { cn } from '../../utils';

@Component({
  selector: 'span[sc-select-value]',
  imports: [],
  template: `
    <ng-content />
  `,
  host: {
    'data-slot': 'select-value',
    '[class]': 'class()',
  },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScSelectValue {
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn(
      'pointer-events-none absolute left-3 flex items-center gap-2 truncate',
      this.classInput(),
    ),
  );
}
