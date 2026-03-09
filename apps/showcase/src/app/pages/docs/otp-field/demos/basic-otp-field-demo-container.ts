import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { BasicOtpFieldDemo } from './basic-otp-field-demo';

@Component({
  selector: 'app-basic-otp-field-demo-container',
  imports: [DemoContainer, BasicOtpFieldDemo],
  template: `
    <app-demo-container
      title="Basic"
      demoUrl="/demos/otp-field/basic-otp-field-demo"
      [code]="code"
    >
      <app-basic-otp-field-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BasicOtpFieldDemoContainer {
  readonly code = `import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  signal,
} from '@angular/core';
import {
  ScOtpField,
  ScOtpFieldSlot,
  ScOtpFieldSlotGroup,
} from '@semantic-components/ui';

@Component({
  selector: 'app-basic-otp-field-demo',
  imports: [ScOtpField, ScOtpFieldSlotGroup, ScOtpFieldSlot],
  template: \`
    <div class="space-y-4">
      <div scOtpField [(value)]="otp">
        <div scOtpFieldSlotGroup>
          <div scOtpFieldSlot></div>
          <div scOtpFieldSlot></div>
          <div scOtpFieldSlot></div>
          <div scOtpFieldSlot></div>
          <div scOtpFieldSlot></div>
          <div scOtpFieldSlot></div>
        </div>
      </div>
      <p class="text-muted-foreground text-sm">Value: {{ otp() || 'empty' }}</p>
    </div>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BasicOtpFieldDemo {
  readonly otp = signal('');
}`;
}
