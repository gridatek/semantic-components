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
import { ScCombobox } from './combobox';

@Component({
  selector: '[scComboboxDisplayValue]',
  template: `
    {{ displayValue() }}
    <ng-content />
  `,
  host: {
    'data-slot': 'combobox-display-value',
    '[class]': 'class()',
  },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScComboboxDisplayValue {
  readonly classInput = input<string>('', { alias: 'class' });

  private readonly combobox = inject(forwardRef(() => ScCombobox));

  readonly displayValue = computed(() => this.combobox.selectedLabel());

  protected readonly class = computed(() =>
    cn(
      'pointer-events-none flex flex-1 items-center gap-1.5 truncate [&_svg:not([class*=size-])]:size-4',
      this.classInput(),
    ),
  );
}
