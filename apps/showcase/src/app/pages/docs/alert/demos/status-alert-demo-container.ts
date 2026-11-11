import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { StatusAlertDemo } from './status-alert-demo';

@Component({
  selector: 'app-status-alert-demo-container',
  imports: [DemoContainer, StatusAlertDemo],
  template: `
    <app-demo-container
      title="Success and warning"
      demoUrl="/demos/alert/status-alert-demo"
      [code]="code"
    >
      <app-status-alert-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class StatusAlertDemoContainer {
  readonly code = `import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScAlert,
  ScAlertDescription,
  ScAlertTitle,
} from '@semantic-components/ui';
import {
  SiCircleCheckIcon,
  SiTriangleAlertIcon,
} from '@semantic-icons/lucide-icons';

/** Success and warning: the toast's colours, on the title, description and icon. */
@Component({
  selector: 'app-status-alert-demo',
  imports: [
    ScAlert,
    ScAlertDescription,
    ScAlertTitle,
    SiCircleCheckIcon,
    SiTriangleAlertIcon,
  ],
  template: \`
    <div class="flex w-full max-w-md flex-col gap-4">
      <div scAlert variant="success">
        <svg siCircleCheckIcon></svg>
        <div scAlertTitle>Account verified</div>
        <div scAlertDescription>
          Your email address is confirmed. You can now publish projects.
        </div>
      </div>
      <div scAlert variant="warning">
        <svg siTriangleAlertIcon></svg>
        <div scAlertTitle>Storage almost full</div>
        <div scAlertDescription>
          You have used 90% of your storage. Remove files or upgrade your plan.
        </div>
      </div>
    </div>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class StatusAlertDemo {}`;
}
