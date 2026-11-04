import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { DestructiveAlertDemo } from './destructive-alert-demo';

@Component({
  selector: 'app-destructive-alert-demo-container',
  imports: [DemoContainer, DestructiveAlertDemo],
  template: `
    <app-demo-container
      title="Destructive"
      demoUrl="/demos/alert/destructive-alert-demo"
      [code]="code"
    >
      <app-destructive-alert-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class DestructiveAlertDemoContainer {
  readonly code = `import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScAlert,
  ScAlertDescription,
  ScAlertTitle,
} from '@semantic-components/ui';
import { SiCircleAlertIcon } from '@semantic-icons/lucide-icons';

@Component({
  selector: 'app-destructive-alert-demo',
  imports: [ScAlert, ScAlertDescription, ScAlertTitle, SiCircleAlertIcon],
  template: \`
    <div scAlert variant="destructive" class="max-w-md">
      <svg siCircleAlertIcon></svg>
      <div scAlertTitle>Payment failed</div>
      <div scAlertDescription>
        Your payment could not be processed. Please check your payment method
        and try again.
      </div>
    </div>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class DestructiveAlertDemo {}`;
}
