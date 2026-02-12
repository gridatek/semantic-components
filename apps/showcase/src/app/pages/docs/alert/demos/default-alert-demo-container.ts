import { ChangeDetectionStrategy, Component } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { DefaultAlertDemo } from './default-alert-demo';

@Component({
  selector: 'app-default-alert-demo-container',
  imports: [DemoContainer, DefaultAlertDemo],
  template: `
    <app-demo-container title="Default" [code]="code">
      <app-default-alert-demo />
    </app-demo-container>
  `,
  host: { class: 'block' },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DefaultAlertDemoContainer {
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
import { SiAlertCircleIcon } from '@semantic-icons/lucide-icons';

@Component({
  selector: 'app-default-alert-demo',
  imports: [ScAlert, ScAlertDescription, ScAlertTitle, SiAlertCircleIcon],
  template: \`
    <div sc-alert>
      <svg si-alert-circle-icon></svg>
      <h5 sc-alert-title>Heads up!</h5>
      <div sc-alert-description>
        You can add components to your app using the cli.
      </div>
    </div>
  \`,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DefaultAlertDemo {}`;
}
