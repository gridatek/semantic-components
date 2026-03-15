import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { SelectCurrencyDemo } from './select-currency-demo';

@Component({
  selector: 'app-select-currency-demo-container',
  imports: [DemoContainer, SelectCurrencyDemo],
  template: `
    <app-demo-container
      title="Currency Input"
      demoUrl="/demos/select/select-currency-demo"
      [code]="code"
    >
      <app-select-currency-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectCurrencyDemoContainer {
  readonly code = '';
}
