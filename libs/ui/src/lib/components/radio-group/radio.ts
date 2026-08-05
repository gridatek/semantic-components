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
    '[attr.aria-invalid]': 'ariaInvalid()',
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

  // Bound automatically by the Field directive (FormUiControl contract).
  // Value, checked and disabled already come from its native-input support;
  // aria-invalid does not, so it has to be surfaced here.
  readonly invalid = input<boolean>(false);
  readonly touched = input<boolean>(false);

  // Do not surface invalid until the control has been touched.
  protected readonly ariaInvalid = computed(
    () => (this.touched() && this.invalid()) || null,
  );

  protected readonly class = computed(() =>
    cn(
      'relative',
      'appearance-none',
      'aspect-square h-4 w-4 rounded-full border border-input dark:bg-input/30 transition-colors disabled:cursor-not-allowed disabled:opacity-50',
      'checked:bg-primary checked:border-primary checked:text-primary-foreground',
      'focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-3',
      'aria-invalid:border-destructive aria-invalid:ring-destructive/20 aria-invalid:ring-3',
      'dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40',
      'aria-invalid:checked:border-primary',
      "[&::before]:content-['']",
      '[&::before]:absolute [&::before]:top-1/2 [&::before]:left-1/2 [&::before]:-translate-x-1/2 [&::before]:-translate-y-1/2 [&::before]:size-2 [&::before]:rounded-full [&::before]:bg-primary-foreground [&::before]:opacity-0 [&::before]:transform [&::before]:scale-0 [&::before]:transition-all [&::before]:duration-200',
      'checked:[&::before]:opacity-100 checked:[&::before]:scale-100',
      this.classInput(),
    ),
  );
}
