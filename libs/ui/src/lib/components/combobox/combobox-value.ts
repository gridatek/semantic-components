import { _IdGenerator } from '@angular/cdk/a11y';
import {
  Component,
  DestroyRef,
  ViewEncapsulation,
  computed,
  inject,
  input,
} from '@angular/core';
import { cn } from '../../utils';
import { ScComboboxBase } from './combobox-base';

/**
 * The selected value's label in a trigger, or the placeholder. Project
 * content to show a value your way.
 */
@Component({
  selector: 'span[scComboboxValue]',
  template: `
    @if (root.hasValue()) {
      <ng-content>{{ root.selectedLabel() }}</ng-content>
    } @else {
      {{ placeholder() }}
    }
  `,
  host: {
    'data-slot': 'combobox-value',
    '[id]': 'id',
    '[attr.data-placeholder]': 'root.hasValue() ? null : ""',
    '[class]': 'class()',
  },
  encapsulation: ViewEncapsulation.None,
})
export class ScComboboxValue {
  protected readonly root = inject(ScComboboxBase);
  /** Its id: with the field's label, its trigger's name. */
  protected readonly id = inject(_IdGenerator).getId('sc-combobox-value-');

  readonly classInput = input<string>('', { alias: 'class' });
  /** Shown while nothing is selected. */
  readonly placeholder = input('');

  constructor() {
    this.root.valueId.set(this.id);
    inject(DestroyRef).onDestroy(() => this.root.valueId.set(null));
  }

  protected readonly class = computed(() =>
    cn(
      'truncate',
      !this.root.hasValue() && 'text-muted-foreground',
      this.classInput(),
    ),
  );
}
