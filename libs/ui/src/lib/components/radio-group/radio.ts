import { _IdGenerator } from '@angular/cdk/a11y';
import {
  Directive,
  booleanAttribute,
  computed,
  inject,
  input,
} from '@angular/core';
import { cn } from '../../utils';
import { SC_FIELD } from '../field';
import { ScRadioGroup } from './radio-group';

@Directive({
  selector: 'input[type="radio"][scRadio]',
  host: {
    'data-slot': 'radio',
    '[attr.id]': 'id()',
    '[attr.aria-describedby]': 'ariaDescribedBy()',
    '[class]': 'class()',
    '[disabled]': 'disabled()',
  },
})
export class ScRadio {
  private readonly radioGroup = inject(ScRadioGroup, { optional: true });
  protected readonly field = inject(SC_FIELD, { optional: true });
  private readonly fallbackId = inject(_IdGenerator).getId('sc-radio-');

  readonly idInput = input('', { alias: 'id' });
  readonly classInput = input<string>('', {
    alias: 'class',
  });
  readonly ariaDescribedByInput = input('', { alias: 'aria-describedby' });
  readonly disabledInput = input(false, {
    alias: 'disabled',
    transform: booleanAttribute,
  });

  readonly id = computed(
    () => this.idInput() || this.field?.id() || this.fallbackId,
  );

  readonly ariaDescribedBy = computed(
    () =>
      this.ariaDescribedByInput() ||
      this.field?.descriptionIds().join(' ') ||
      null,
  );

  readonly disabled = computed(
    () => this.disabledInput() || (this.radioGroup?.disabled() ?? false),
  );

  protected readonly class = computed(() =>
    cn(
      'relative',
      'appearance-none',
      'aspect-square h-4 w-4 rounded-full border border-primary text-primary shadow focus:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50',
      "[&::before]:content-['']",
      '[&::before]:absolute [&::before]:top-1/2 [&::before]:left-1/2 [&::before]:-translate-x-1/2 [&::before]:-translate-y-1/2 [&::before]:size-2.5 [&::before]:rounded-full [&::before]:bg-primary [&::before]:opacity-0 [&::before]:transform [&::before]:scale-0 [&::before]:transition-all [&::before]:duration-200',
      'checked:[&::before]:opacity-100 checked:[&::before]:scale-100',
      this.classInput(),
    ),
  );
}
