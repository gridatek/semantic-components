import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { DisabledPhoneInputDemo } from './disabled-phone-input-demo';

@Component({
  selector: 'app-disabled-phone-input-demo-container',
  imports: [DemoContainer, DisabledPhoneInputDemo],
  template: `
    <app-demo-container title="Disabled" [code]="code">
      <app-disabled-phone-input-demo />
    </app-demo-container>
  `,
  host: { class: 'block' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DisabledPhoneInputDemoContainer {
  readonly code = `import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { ScPhoneInput, ScPhoneInputSimple } from '@semantic-components/ui-lab';

@Component({
  selector: 'app-disabled-phone-input-demo',
  imports: [ScPhoneInput, ScPhoneInputSimple],
  template: \`
    <div class="flex flex-col gap-3 max-w-sm">
      <sc-phone-input [disabled]="true" />
      <sc-phone-input-simple [disabled]="true" />
    </div>
  \`,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DisabledPhoneInputDemo {}`;
}
