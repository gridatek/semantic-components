import { Dir } from '@angular/cdk/bidi';
import { Component, LOCALE_ID, ViewEncapsulation, signal } from '@angular/core';
import {
  ScColorPicker,
  ScColorPickerArea,
  ScColorPickerInput,
  ScColorPickerSlider,
} from '@semantic-components/ui';

/** In a right-to-left page: the sliders run as the text reads (their tracks painted the same way), the values in the locale’s digits. */
@Component({
  selector: 'app-rtl-color-picker-demo',
  imports: [
    Dir,
    ScColorPicker,
    ScColorPickerArea,
    ScColorPickerInput,
    ScColorPickerSlider,
  ],
  providers: [{ provide: LOCALE_ID, useValue: 'ar' }],
  template: `
    <div dir="rtl" lang="ar" class="w-64">
      <div
        scColorPicker
        aria-label="اللون"
        class="grid gap-3"
        [(value)]="color"
      >
        <div scColorPickerArea aria-label="التشبع والسطوع"></div>
        <input scColorPickerSlider="hue" aria-label="درجة اللون" />
        <input scColorPickerSlider="alpha" aria-label="العتامة" />
        <input scColorPickerInput aria-label="سداسي" />
      </div>
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class RtlColorPickerDemo {
  private readonly color = signal('#0ea5e9');
}
