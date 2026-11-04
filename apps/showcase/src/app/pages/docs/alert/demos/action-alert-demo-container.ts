import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { ActionAlertDemo } from './action-alert-demo';

@Component({
  selector: 'app-action-alert-demo-container',
  imports: [DemoContainer, ActionAlertDemo],
  template: `
    <app-demo-container
      title="Action"
      demoUrl="/demos/alert/action-alert-demo"
      [code]="code"
    >
      <app-action-alert-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class ActionAlertDemoContainer {
  readonly code = `import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScAlert,
  ScAlertAction,
  ScAlertDescription,
  ScAlertTitle,
  ScButton,
} from '@semantic-components/ui';

/** A button in the alert's corner; the text keeps clear of it. */
@Component({
  selector: 'app-action-alert-demo',
  imports: [ScAlert, ScAlertAction, ScAlertDescription, ScAlertTitle, ScButton],
  template: \`
    <div scAlert class="max-w-md">
      <div scAlertTitle>Dark mode is now available</div>
      <div scAlertDescription>
        Enable it under your profile settings to get started.
      </div>
      <div scAlertAction>
        <button scButton size="xs">Enable</button>
      </div>
    </div>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class ActionAlertDemo {}`;
}
