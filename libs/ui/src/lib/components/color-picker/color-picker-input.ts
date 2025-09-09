import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  computed,
  input,
  output,
} from '@angular/core';

import { cn } from '@semantic-components/utils';

@Component({
  selector: 'input[sc-color-picker-input]',
  imports: [],
  template: ``,
  host: {
    '[class]': 'class()',
    '[value]': 'value()',
    '[placeholder]': 'placeholder()',
    '(input)': 'onInput($event)',
    '(blur)': 'onBlur($event)',
  },
  styles: ``,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScColorPickerInput {
  readonly classInput = input<string>('', {
    alias: 'class',
  });

  readonly value = input<string>('#000000');
  readonly placeholder = input<string>('#000000');

  readonly valueChange = output<string>();

  protected readonly class = computed(() =>
    cn(
      'flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
      'font-mono uppercase',
      this.classInput(),
    ),
  );

  protected onInput(event: Event): void {
    const target = event.target as HTMLInputElement;
    let value = target.value;

    // Auto-add # if missing
    if (value && !value.startsWith('#')) {
      value = '#' + value;
      target.value = value;
    }

    // Validate hex format
    if (this.isValidHex(value)) {
      this.valueChange.emit(value);
    }
  }

  protected onBlur(event: Event): void {
    const target = event.target as HTMLInputElement;
    let value = target.value;

    // Auto-add # if missing
    if (value && !value.startsWith('#')) {
      value = '#' + value;
    }

    // Ensure 6 character hex
    if (value.length === 4 && this.isValidHex(value)) {
      // Convert 3-digit hex to 6-digit
      value = '#' + value[1] + value[1] + value[2] + value[2] + value[3] + value[3];
    }

    if (this.isValidHex(value)) {
      target.value = value.toUpperCase();
      this.valueChange.emit(value.toUpperCase());
    } else {
      // Reset to current value if invalid
      target.value = this.value();
    }
  }

  private isValidHex(hex: string): boolean {
    return /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(hex);
  }
}
