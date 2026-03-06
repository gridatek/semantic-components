import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { DotSeparatorOtpFieldDemo } from './dot-separator-otp-field-demo';

@Component({
  selector: 'app-dot-separator-otp-field-demo-container',
  imports: [DemoContainer, DotSeparatorOtpFieldDemo],
  template: `
    <app-demo-container
      title="With Dot Separator"
      demoUrl="/demos/otp-field/dot-separator-otp-field-demo"
      [code]="code"
    >
      <app-dot-separator-otp-field-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DotSeparatorOtpFieldDemoContainer {
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
  selector: 'app-dot-separator-otp-field-demo',
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
          <circle cx="12" cy="12" r="1" />
        </svg>
      </div>
      <div scOtpFieldSlotGroup>
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
          <circle cx="12" cy="12" r="1" />
        </svg>
      </div>
      <div scOtpFieldSlotGroup>
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
export class DotSeparatorOtpFieldDemo {
  readonly otp = signal('');
}`;
}
