import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { SmallAlertDialogDemo } from './small-alert-dialog-demo';

@Component({
  selector: 'app-small-alert-dialog-demo-container',
  imports: [DemoContainer, SmallAlertDialogDemo],
  template: `
    <app-demo-container
      title="Small"
      demoUrl="/demos/alert-dialog/small-alert-dialog-demo"
      [code]="code"
    >
      <app-small-alert-dialog-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class SmallAlertDialogDemoContainer {
  readonly code = `import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScAlertDialog,
  ScAlertDialogAction,
  ScAlertDialogCancel,
  ScAlertDialogDescription,
  ScAlertDialogFooter,
  ScAlertDialogHeader,
  ScAlertDialogPortal,
  ScAlertDialogProvider,
  ScAlertDialogTitle,
  ScAlertDialogTrigger,
  ScButton,
} from '@semantic-components/ui';

/** size="sm": narrower, centered, its two buttons side by side. */
@Component({
  selector: 'app-small-alert-dialog-demo',
  imports: [
    ScAlertDialog,
    ScAlertDialogAction,
    ScAlertDialogCancel,
    ScAlertDialogDescription,
    ScAlertDialogFooter,
    ScAlertDialogHeader,
    ScAlertDialogPortal,
    ScAlertDialogProvider,
    ScAlertDialogTitle,
    ScAlertDialogTrigger,
    ScButton,
  ],
  template: \`
    <div scAlertDialogProvider>
      <button scButton scAlertDialogTrigger variant="outline">
        Show Dialog
      </button>
      <ng-template scAlertDialogPortal>
        <div scAlertDialog size="sm">
          <div scAlertDialogHeader>
            <h2 scAlertDialogTitle>Allow accessory to connect?</h2>
            <p scAlertDialogDescription>
              Do you want to allow the USB accessory to connect to this device?
            </p>
          </div>
          <div scAlertDialogFooter>
            <button scAlertDialogCancel>Don&apos;t allow</button>
            <button scAlertDialogAction>Allow</button>
          </div>
        </div>
      </ng-template>
    </div>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class SmallAlertDialogDemo {}`;
}
