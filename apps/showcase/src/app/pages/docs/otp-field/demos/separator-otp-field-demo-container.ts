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

@Component({
  selector: 'app-separator-otp-field-demo',
  imports: [
    ScOtpField,
    ScOtpFieldSlotGroup,
    ScOtpFieldSeparator,
    ScOtpFieldSlot,
  ],
  template: \`
    <div scOtpField [(value)]="otp">
      <div scOtpFieldSlotGroup>
        <div scOtpFieldSlot></div>
        <div scOtpFieldSlot></div>
        <div scOtpFieldSlot></div>
      </div>
      <div scOtpFieldSeparator>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="size-4"
        >
          <line x1="5" x2="19" y1="12" y2="12" />
        </svg>
      </div>
      <div scOtpFieldSlotGroup>
        <div scOtpFieldSlot></div>
        <div scOtpFieldSlot></div>
        <div scOtpFieldSlot></div>
      </div>
    </div>
    <p class="text-muted-foreground mt-4 text-sm">
      Value: {{ otp() || 'empty' }}
    </p>
  \`,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SeparatorOtpFieldDemo {
  readonly otp = signal('');
}`;
}
