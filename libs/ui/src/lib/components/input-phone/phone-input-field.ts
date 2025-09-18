import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  input,
  output,
} from '@angular/core';

@Component({
  selector: 'sc-phone-input-field',
  template: `
    <input
      class="flex h-10 w-full rounded-r-md border border-input bg-background px-3 py-2 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus:outline-none disabled:cursor-not-allowed disabled:opacity-50 border-l-0"
      [value]="value()"
      [placeholder]="placeholder()"
      [disabled]="disabled()"
      [class.border-destructive]="isInvalid()"
      [id]="id()"
      (input)="inputChange.emit($event)"
      (blur)="inputBlur.emit()"
      (focus)="inputFocus.emit()"
      type="tel"
    />
  `,
  styles: ``,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScPhoneInputField {
  readonly value = input.required<string>();
  readonly placeholder = input<string>('Enter phone number');
  readonly disabled = input<boolean>(false);
  readonly isInvalid = input<boolean>(false);
  readonly id = input.required<string>();

  readonly inputChange = output<Event>();
  readonly inputBlur = output<void>();
  readonly inputFocus = output<void>();
}
