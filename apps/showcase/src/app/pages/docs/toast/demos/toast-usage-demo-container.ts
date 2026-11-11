import { Component, ViewEncapsulation } from '@angular/core';
import { UsageCode } from '../../../../components/usage-code/usage-code';
import { ToastUsageDemo } from './toast-usage-demo';

@Component({
  selector: 'app-toast-usage-demo-container',
  imports: [UsageCode, ToastUsageDemo],
  template: `
    <app-usage-code [code]="code">
      <ng-template><app-toast-usage-demo /></ng-template>
    </app-usage-code>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class ToastUsageDemoContainer {
  readonly code = '';
}
