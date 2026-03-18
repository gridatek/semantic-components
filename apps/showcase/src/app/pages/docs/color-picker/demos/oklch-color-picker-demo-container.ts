import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import OklchColorPickerDemo from './oklch-color-picker-demo';

@Component({
  selector: 'app-oklch-color-picker-demo-container',
  imports: [DemoContainer, OklchColorPickerDemo],
  template: `
    <app-demo-container
      title="OKLCH Format"
      demoUrl="/demos/color-picker/oklch-color-picker-demo"
      [code]="code"
    >
      <app-oklch-color-picker-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OklchColorPickerDemoContainer {
  readonly code = '';
}
