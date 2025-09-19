import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  input,
  output,
} from '@angular/core';

@Component({
  selector: 'sc-timezone-input-field',
  imports: [],
  template: `
    <input
      class="flex h-10 w-full rounded-r-md border border-l-0 border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
      [class.border-destructive]="isInvalid()"
      [value]="value()"
      [placeholder]="placeholder()"
      [disabled]="disabled()"
      [id]="id()"
      (input)="inputChange.emit($event)"
      (blur)="inputBlur.emit()"
      (focus)="inputFocus.emit()"
      type="text"
      autocomplete="off"
      spellcheck="false"
    />
  `,
  styles: ``,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScTimezoneInputField {
  readonly value = input<string>('');
  readonly placeholder = input<string>('Search timezones...');
  readonly disabled = input<boolean>(false);
  readonly isInvalid = input<boolean>(false);
  readonly id = input<string>();

  readonly inputChange = output<Event>();
  readonly inputFocus = output<void>();
  readonly inputBlur = output<void>();
}
