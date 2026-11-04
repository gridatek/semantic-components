import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { ColorsAlertDemo } from './colors-alert-demo';

@Component({
  selector: 'app-colors-alert-demo-container',
  imports: [DemoContainer, ColorsAlertDemo],
  template: `
    <app-demo-container
      title="Custom Colors"
      demoUrl="/demos/alert/colors-alert-demo"
      [code]="code"
    >
      <app-colors-alert-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class ColorsAlertDemoContainer {
  readonly code = `import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScAlert,
  ScAlertDescription,
  ScAlertTitle,
} from '@semantic-components/ui';
import { SiTriangleAlertIcon } from '@semantic-icons/lucide-icons';

/** Your own colors: classes over the preset's (cn: a later class wins). */
@Component({
  selector: 'app-colors-alert-demo',
  imports: [ScAlert, ScAlertDescription, ScAlertTitle, SiTriangleAlertIcon],
  template: \`
    <div
      scAlert
      class="max-w-md border-amber-200 bg-amber-50 text-amber-900 dark:border-amber-900 dark:bg-amber-950 dark:text-amber-50"
    >
      <svg siTriangleAlertIcon></svg>
      <div scAlertTitle>Your subscription will expire in 3 days.</div>
      <div scAlertDescription class="text-amber-900 dark:text-amber-100">
        Renew now to avoid service interruption or upgrade to a paid plan to
        continue using the service.
      </div>
    </div>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class ColorsAlertDemo {}`;
}
