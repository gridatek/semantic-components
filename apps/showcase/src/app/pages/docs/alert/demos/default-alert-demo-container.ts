import { ChangeDetectionStrategy, Component } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { DefaultAlertDemo } from './default-alert-demo';

@Component({
  selector: 'app-default-alert-demo-container',
  imports: [DemoContainer, DefaultAlertDemo],
  template: `
    <app-demo-container
      title="Default"
      demoUrl="/demos/alert/default-alert-demo"
      [code]="code"
    >
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
import { SiCircleAlertIcon } from '@semantic-icons/lucide-icons';

@Component({
  selector: 'app-default-alert-demo',
  imports: [ScAlert, ScAlertDescription, ScAlertTitle, SiCircleAlertIcon],
  template: \`
    <div scAlert>
      <svg siCircleAlertIcon></svg>
      <h5 scAlertTitle>Heads up!</h5>
      <div scAlertDescription>
        You can add components to your app using the cli.
      </div>
    </div>
  \`,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DefaultAlertDemo {}`;
}
