import { _IdGenerator } from '@angular/cdk/a11y';
import {
  computed,
  Directive,
  effect,
  ElementRef,
  inject,
  input,
  model,
  signal,
} from '@angular/core';
import type { FormCheckboxControl } from '@angular/forms/signals';
import { cn } from '../../utils';
import { SC_SWITCH_FIELD } from './switch-types';

export const SC_SWITCH = 'SC_SWITCH';

@Directive({
  selector: 'input[type="checkbox"][scSwitch]',
  host: {
    'data-slot': 'switch',
    role: 'switch',
    '[id]': 'id()',
    '[class]': 'class()',
    '[checked]': 'checked()',
    '(change)': 'onInputChange($event)',
  },
  exportAs: SC_SWITCH,
})
export class ScSwitch implements FormCheckboxControl {
  private readonly elementRef = inject(ElementRef<HTMLInputElement>);
  private readonly switchField = inject(SC_SWITCH_FIELD, { optional: true });
  private readonly fallbackId = inject(_IdGenerator).getId('sc-switch-');

  readonly idInput = input('', { alias: 'id' });
  readonly classInput = input<string>('', { alias: 'class' });
  readonly checked = model<boolean>(false);
  readonly disabledSignal = signal(false);

  readonly id = computed(
    () => this.idInput() || this.switchField?.id() || this.fallbackId,
  );

  constructor() {
    effect(() => {
      this.disabledSignal.set(this.elementRef.nativeElement.disabled);
    });
  }

  protected onInputChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.checked.set(input.checked);
    this.disabledSignal.set(input.disabled);
  }

  protected readonly class = computed(() =>
    cn('peer sr-only', this.classInput()),
  );
}
