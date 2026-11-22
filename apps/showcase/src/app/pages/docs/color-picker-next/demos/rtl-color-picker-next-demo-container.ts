import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { RtlColorPickerNextDemo } from './rtl-color-picker-next-demo';

@Component({
  selector: 'app-rtl-color-picker-next-demo-container',
  imports: [DemoContainer, RtlColorPickerNextDemo],
  template: `
    <app-demo-container
      title="RTL"
      [code]="code"
      demoUrl="/demos/color-picker-next/rtl-color-picker-next-demo"
    >
      <app-rtl-color-picker-next-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class RtlColorPickerNextDemoContainer {
  private readonly code = `import { Dir } from '@angular/cdk/bidi';
import { Component, LOCALE_ID, ViewEncapsulation, signal } from '@angular/core';
import {
  ScColorPickerNext,
  ScColorPickerNextArea,
  ScColorPickerNextInput,
  ScColorPickerNextSlider,
} from '@semantic-components/ui';

/** In a right-to-left page: the sliders run as the text reads (their tracks painted the same way), the values in the locale’s digits. */
@Component({
  selector: 'app-rtl-color-picker-next-demo',
  imports: [
    Dir,
    ScColorPickerNext,
    ScColorPickerNextArea,
    ScColorPickerNextInput,
    ScColorPickerNextSlider,
  ],
  providers: [{ provide: LOCALE_ID, useValue: 'ar' }],
  template: \`
    <div dir="rtl" lang="ar" class="w-64">
      <div
        scColorPickerNext
        aria-label="اللون"
        class="grid gap-3"
        [(value)]="color"
      >
        <div scColorPickerNextArea aria-label="التشبع والسطوع"></div>
        <input scColorPickerNextSlider="hue" aria-label="درجة اللون" />
        <input scColorPickerNextSlider="alpha" aria-label="العتامة" />
        <input scColorPickerNextInput aria-label="سداسي" />
      </div>
    </div>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class RtlColorPickerNextDemo {
  private readonly color = signal('#0ea5e9');
}`;
}
