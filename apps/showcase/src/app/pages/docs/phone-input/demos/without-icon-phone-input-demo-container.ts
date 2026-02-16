import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { WithoutIconPhoneInputDemo } from './without-icon-phone-input-demo';

@Component({
  selector: 'app-without-icon-phone-input-demo-container',
  imports: [DemoContainer, WithoutIconPhoneInputDemo],
  template: `
    <app-demo-container title="Without Icon" [code]="code">
      <app-without-icon-phone-input-demo />
    </app-demo-container>
  `,
  host: { class: 'block' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WithoutIconPhoneInputDemoContainer {
  readonly code = `import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { ScPhoneInputSimple } from '@semantic-components/ui-lab';

@Component({
  selector: 'app-without-icon-phone-input-demo',
  imports: [ScPhoneInputSimple],
  template: \`
    <div class="max-w-sm">
      <sc-phone-input-simple
        [showIcon]="false"
        format="us"
        placeholder="Enter phone number"
      />
    </div>
  \`,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WithoutIconPhoneInputDemo {}`;
}
