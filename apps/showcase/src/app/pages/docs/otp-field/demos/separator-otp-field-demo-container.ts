import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { SeparatorOtpFieldDemo } from './separator-otp-field-demo';

@Component({
  selector: 'app-separator-otp-field-demo-container',
  imports: [DemoContainer, SeparatorOtpFieldDemo],
  template: `
    <app-demo-container
      title="With Separator"
      demoUrl="/demos/otp-field/separator-otp-field-demo"
      [code]="code"
    >
      <app-separator-otp-field-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SeparatorOtpFieldDemoContainer {
  readonly code = `import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  signal,
} from '@angular/core';
import {
  ScOtpField,
  ScOtpFieldSeparator,
  ScOtpFieldSlot,
  ScOtpFieldSlotGroup,
} from '@semantic-components/ui';
import { SiMinusIcon } from '@semantic-icons/lucide-icons';

@Component({
  selector: 'app-separator-otp-field-demo',
  imports: [
    ScOtpField,
    ScOtpFieldSlotGroup,
    ScOtpFieldSeparator,
    ScOtpFieldSlot,
    SiMinusIcon,
  ],
  template: \`
    <div class="space-y-4">
      <div scOtpField [(value)]="otp">
        <div scOtpFieldSlotGroup>
          <div scOtpFieldSlot></div>
          <div scOtpFieldSlot></div>
          <div scOtpFieldSlot></div>
        </div>
        <div scOtpFieldSeparator>
          <svg siMinusIcon class="size-4"></svg>
        </div>
        <div scOtpFieldSlotGroup>
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
export class SeparatorOtpFieldDemo {
  readonly otp = signal('');
}`;
}
