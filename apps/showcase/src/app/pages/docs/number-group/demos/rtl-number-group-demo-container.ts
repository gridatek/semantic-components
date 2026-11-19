import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { RtlNumberGroupDemo } from './rtl-number-group-demo';

@Component({
  selector: 'app-rtl-number-group-demo-container',
  imports: [DemoContainer, RtlNumberGroupDemo],
  template: `
    <app-demo-container
      title="RTL"
      demoUrl="/demos/number-group/rtl-number-group-demo"
      [code]="code"
    >
      <app-rtl-number-group-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export default class RtlNumberGroupDemoContainer {
  private readonly code = `import { Dir } from '@angular/cdk/bidi';
import { Component, LOCALE_ID, ViewEncapsulation, signal } from '@angular/core';
import {
  ScField,
  ScLabel,
  ScNumberDecrement,
  ScNumberGroup,
  ScNumberIncrement,
  ScNumberInput,
  ScNumberScrubArea,
} from '@semantic-components/ui';
import { SiMinusIcon, SiPlusIcon } from '@semantic-icons/lucide-icons';

/**
 * In a right-to-left page: the buttons mirrored (decrease at the start, on
 * the right), the price in Egyptian pounds with Arabic digits — typed in
 * either script.
 */
@Component({
  selector: 'app-rtl-number-group-demo',
  imports: [
    Dir,
    ScField,
    ScLabel,
    ScNumberDecrement,
    ScNumberGroup,
    ScNumberIncrement,
    ScNumberInput,
    ScNumberScrubArea,
    SiMinusIcon,
    SiPlusIcon,
  ],
  template: \`
    <div dir="rtl" lang="ar" class="w-56">
      <div scField>
        <div scNumberScrubArea>
          <label scLabel>السعر</label>
        </div>
        <div
          scNumberGroup
          [(value)]="price"
          [min]="0"
          [step]="5"
          [largeStep]="50"
          [format]="{ style: 'currency', currency: 'EGP' }"
        >
          <button scNumberDecrement>
            <svg siMinusIcon></svg>
            <span class="sr-only">تقليل السعر</span>
          </button>
          <input scNumberInput />
          <button scNumberIncrement>
            <svg siPlusIcon></svg>
            <span class="sr-only">زيادة السعر</span>
          </button>
        </div>
      </div>
    </div>
  \`,
  providers: [{ provide: LOCALE_ID, useValue: 'ar-EG' }],
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class RtlNumberGroupDemo {
  private readonly price = signal<number | null>(150);
}`;
}
