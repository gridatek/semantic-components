import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { FormSliderDemo } from './form-slider-demo';

@Component({
  selector: 'app-form-slider-demo-container',
  imports: [DemoContainer, FormSliderDemo],
  template: `
    <app-demo-container
      title="Form"
      demoUrl="/demos/slider/form-slider-demo"
      [code]="code"
    >
      <app-form-slider-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormSliderDemoContainer {
  readonly code = '';
}
