import { Directive, computed, inject, input } from '@angular/core';
import { cn, inputStyles } from '@semantic-components/ui';
import { SC_COLOR_PICKER } from './color-picker';
import { hslToRgb, parseHsl, parseOklch, parseRgb } from './color-utils';

@Directive({
  selector: 'input[scColorPickerInput]',
  host: {
    'data-slot': 'color-picker-input',
    type: 'text',
    '[class]': 'class()',
    '[value]': 'displayValue()',
    '[disabled]': 'colorPicker.disabled()',
    '(input)': 'onInput($event)',
    '(blur)': 'onBlur($event)',
  },
})
export class ScColorPickerInput {
  readonly colorPicker = inject(SC_COLOR_PICKER);

  readonly classInput = input<string>('', { alias: 'class' });
  readonly format = input<'hex' | 'rgb' | 'hsl' | 'oklch'>('hex');

  protected readonly class = computed(() =>
    cn(inputStyles, 'font-mono', this.classInput()),
  );

  protected readonly displayValue = computed(() => {
    switch (this.format()) {
      case 'hex':
        return this.colorPicker.hex().toUpperCase();
      case 'rgb': {
        const { r, g, b } = this.colorPicker.rgb();
        return `rgb(${r}, ${g}, ${b})`;
      }
      case 'hsl': {
        const { h, s, l } = this.colorPicker.hsl();
        return `hsl(${h}, ${s}%, ${l}%)`;
      }
      case 'oklch': {
        const { l, c, h } = this.colorPicker.oklch();
        return `oklch(${l} ${c} ${h})`;
      }
    }
  });

  onInput(event: Event): void {
    const value = (event.target as HTMLInputElement).value.trim();

    switch (this.format()) {
      case 'hex': {
        const hex = value.startsWith('#') ? value : `#${value}`;
        if (/^#[0-9A-Fa-f]{6}$/.test(hex)) {
          this.colorPicker.setHex(hex);
        }
        break;
      }
      case 'rgb': {
        const rgb = parseRgb(value);
        if (rgb) {
          this.colorPicker.setRgb(rgb);
        }
        break;
      }
      case 'hsl': {
        const hsl = parseHsl(value);
        if (hsl) {
          const rgb = hslToRgb(hsl.h, hsl.s, hsl.l);
          this.colorPicker.setRgb(rgb);
        }
        break;
      }
      case 'oklch': {
        const oklch = parseOklch(value);
        if (oklch) {
          this.colorPicker.setOklch(oklch);
        }
        break;
      }
    }
  }

  onBlur(event: Event): void {
    (event.target as HTMLInputElement).value = this.displayValue();
  }
}
