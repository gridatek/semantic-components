import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
  ViewEncapsulation,
} from '@angular/core';
import { cn } from '../../utils';
import { SC_COLOR_PICKER } from './color-picker';

@Component({
  selector: 'input[sc-color-picker-input]',
  template: ``,
  host: {
    'data-slot': 'color-picker-input',
    type: 'text',
    '[class]': 'class()',
    '[value]': 'displayValue()',
    '[disabled]': 'colorPicker.disabled()',
    '(input)': 'onInput($event)',
    '(blur)': 'onBlur()',
  },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScColorPickerInput {
  readonly colorPicker = inject(SC_COLOR_PICKER);

  readonly classInput = input<string>('', { alias: 'class' });
  readonly format = input<'hex' | 'rgb' | 'hsl'>('hex');

  protected readonly class = computed(() =>
    cn(
      'flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm font-mono',
      'focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
      'disabled:cursor-not-allowed disabled:opacity-50',
      this.classInput(),
    ),
  );

  protected readonly displayValue = computed(() => {
    const fmt = this.format();
    if (fmt === 'hex') {
      return this.colorPicker.hex().toUpperCase();
    } else if (fmt === 'rgb') {
      const { r, g, b } = this.colorPicker.rgb();
      return `rgb(${r}, ${g}, ${b})`;
    } else {
      const { h, s, l } = this.colorPicker.hsl();
      return `hsl(${h}, ${s}%, ${l}%)`;
    }
  });

  onInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    const value = input.value.trim();

    if (this.format() === 'hex') {
      const hex = value.startsWith('#') ? value : `#${value}`;
      if (/^#[0-9A-Fa-f]{6}$/.test(hex)) {
        this.colorPicker.setHex(hex);
      }
    }
  }

  onBlur(): void {
    // Reset to valid value on blur
  }
}
