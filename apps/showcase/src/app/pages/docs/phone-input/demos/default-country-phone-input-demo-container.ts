import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { DefaultCountryPhoneInputDemo } from './default-country-phone-input-demo';

@Component({
  selector: 'app-default-country-phone-input-demo-container',
  imports: [DemoContainer, DefaultCountryPhoneInputDemo],
  template: `
    <app-demo-container title="Default Country" [code]="code">
      <app-default-country-phone-input-demo />
    </app-demo-container>
  `,
  host: { class: 'block' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DefaultCountryPhoneInputDemoContainer {
  readonly code = `import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { ScPhoneInput } from '@semantic-components/ui-lab';

@Component({
  selector: 'app-default-country-phone-input-demo',
  imports: [ScPhoneInput],
  template: \`
    <div class="max-w-sm">
      <sc-phone-input defaultCountry="GB" />
    </div>
  \`,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DefaultCountryPhoneInputDemo {}`;
}
