import { ChangeDetectionStrategy, Component } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { DestructiveAlertDemo } from './destructive-alert-demo';

@Component({
  selector: 'app-destructive-alert-demo-container',
  imports: [DemoContainer, DestructiveAlertDemo],
  template: `
    <app-demo-container title="Destructive" [code]="code">
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
import { SiAlertTriangleIcon } from '@semantic-icons/lucide-icons';

@Component({
  selector: 'app-destructive-alert-demo',
  imports: [ScAlert, ScAlertDescription, ScAlertTitle, SiAlertTriangleIcon],
  template: \`
    <div sc-alert variant="destructive">
      <svg si-alert-triangle-icon></svg>
      <h5 sc-alert-title>Error</h5>
      <div sc-alert-description>
        Your session has expired. Please log in again.
      </div>
    </div>
  \`,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DestructiveAlertDemo {}`;
}
