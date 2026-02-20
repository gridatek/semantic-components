import { ChangeDetectionStrategy, Component } from '@angular/core';
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
  host: { class: 'block' },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DestructiveAlertDemoContainer {
  readonly code = `import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import {
  ScAlert,
  ScAlertDescription,
  ScAlertTitle,
} from '@semantic-components/ui-lab';
import { SiTriangleAlertIcon } from '@semantic-icons/lucide-icons';

@Component({
  selector: 'app-destructive-alert-demo',
  imports: [ScAlert, ScAlertDescription, ScAlertTitle, SiTriangleAlertIcon],
  template: \`
    <div scAlert variant="destructive">
      <svg siTriangleAlertIcon></svg>
      <h5 scAlertTitle>Error</h5>
      <div scAlertDescription>
        Your session has expired. Please log in again.
      </div>
    </div>
  \`,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DestructiveAlertDemo {}`;
}
