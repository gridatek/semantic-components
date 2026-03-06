import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  computed,
  forwardRef,
  inject,
  input,
} from '@angular/core';
import { cn } from '../../utils';
import { ScSelect } from './select';

@Component({
  selector: '[scSelectDisplayValue]',
  template: `
    {{ displayValue() }}
    <ng-content />
  `,
  host: {
    'data-slot': 'select-display-value',
    '[class]': 'class()',
  },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScSelectDisplayValue {
  readonly classInput = input<string>('', { alias: 'class' });

  private readonly select = inject(forwardRef(() => ScSelect));

  readonly displayValue = computed(() =>
    this.select.value() != null ? this.select.label() : '',
  );

  protected readonly class = computed(() =>
    cn(
      'pointer-events-none flex flex-1 items-center gap-1.5 truncate [&_svg:not([class*=size-])]:size-4',
      this.classInput(),
    ),
  );
}
