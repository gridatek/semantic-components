import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { PriceNumberDemo } from './price-number-demo';

@Component({
  selector: 'app-price-number-demo-container',
  imports: [DemoContainer, PriceNumberDemo],
  template: `
    <app-demo-container
      title="Price Input"
      demoUrl="/demos/number/price-number-demo"
      [code]="code"
    >
      <app-price-number-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class PriceNumberDemoContainer {
  readonly code = '';
}
