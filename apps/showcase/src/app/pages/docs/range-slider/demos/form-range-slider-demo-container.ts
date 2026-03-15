import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { FormRangeSliderDemo } from './form-range-slider-demo';

@Component({
  selector: 'app-form-range-slider-demo-container',
  imports: [DemoContainer, FormRangeSliderDemo],
  template: `
    <app-demo-container
      title="Form"
      demoUrl="/demos/range-slider/form-range-slider-demo"
      [code]="code"
    >
      <app-form-range-slider-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormRangeSliderDemoContainer {
  readonly code = '';
}
