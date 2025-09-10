import { _IdGenerator } from '@angular/cdk/a11y';
import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  OnInit,
  ViewEncapsulation,
  computed,
  forwardRef,
  inject,
  input,
  output,
  signal,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

import { cn } from '@semantic-components/utils';

import { PasswordValidationService } from './password-validation.service';

@Component({
  selector: 'input[sc-input-password-field]',
  imports: [],
  template: ``,
  host: {
    '[id]': 'fieldId() || idGenerator.getId("sc-input-password-field-")',
    '[type]': 'isVisible() ? "text" : "password"',
    '[attr.aria-invalid]': 'validation().level !== "strong"',
    '[attr.aria-describedby]': 'ariaDescribedby()',
    '[placeholder]': 'placeholder()',
    '[class]': 'class()',
    '[disabled]': 'disabled()',
    '[readonly]': 'readonly()',
    '[required]': 'required()',
    '[autocomplete]': 'autocomplete()',
    '(input)': 'onInput($event)',
    '(blur)': 'onBlur()',
    '(focus)': 'onFocus()',
  },
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ScInputPasswordField),
      multi: true,
    },
  ],
  styles: ``,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScInputPasswordField implements ControlValueAccessor, OnInit {
  protected readonly idGenerator = inject(_IdGenerator);
  private readonly validationService = inject(PasswordValidationService);
  private readonly destroyRef = inject(DestroyRef);

  readonly fieldId = input<string>('');

  readonly classInput = input<string>('', { alias: 'class' });
  readonly ariaDescribedby = input<string>('');
  readonly isVisible = input<boolean>(false);
  readonly placeholder = input<string>('Enter password');
  readonly disabled = input<boolean>(false);
  readonly readonly = input<boolean>(false);
  readonly required = input<boolean>(false);
  readonly autocomplete = input<string>('current-password');

  readonly passwordChange = output<string>();
  readonly focusChange = output<boolean>();

  readonly validation = computed(() => this.validationService.validation());

  private readonly _value = signal<string>('');
  readonly value = this._value.asReadonly();

  private _onChange: (value: string) => void = () => {};
  private _onTouched: () => void = () => {};

  protected readonly class = computed(() =>
    cn(
      'flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background',
      'file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground',
      'placeholder:text-muted-foreground',
      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
      'disabled:cursor-not-allowed disabled:opacity-50',
      'pe-9', // Space for toggle button
      {
        'border-destructive focus-visible:ring-destructive': this.validation().level === 'weak',
        'border-amber-500 focus-visible:ring-amber-500': this.validation().level === 'fair',
        'border-emerald-500 focus-visible:ring-emerald-500': this.validation().level === 'strong',
      },
      this.classInput(),
    ),
  );

  ngOnInit(): void {
    // Initialize with current validation service state
    const currentPassword = this.validationService.password();
    if (currentPassword && currentPassword !== this._value()) {
      this._value.set(currentPassword);
      this._onChange(currentPassword);
    }
  }

  protected onInput(event: Event): void {
    const target = event.target as HTMLInputElement;
    const value = target.value;
    this.updateValue(value);
  }

  protected onFocus(): void {
    this.focusChange.emit(true);
  }

  protected onBlur(): void {
    this._onTouched();
    this.focusChange.emit(false);
  }

  private updateValue(value: string): void {
    this._value.set(value);
    this.validationService.updatePassword(value);
    this.passwordChange.emit(value);
    this._onChange(value);
  }

  // ControlValueAccessor implementation
  writeValue(value: string | null): void {
    const safeValue = value ?? '';
    this.updateValue(safeValue);
  }

  registerOnChange(fn: (value: string) => void): void {
    this._onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this._onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    // This will be handled by the host binding
  }

  focus(): void {
    // This would need to be implemented with ViewChild in a real scenario
    // For now, it's a placeholder for the interface
  }
}
