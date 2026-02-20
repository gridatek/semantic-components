import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import {
  ScAlert,
  ScAlertDescription,
  ScAlertTitle,
} from '@semantic-components/ui';
import { SiCircleAlertIcon } from '@semantic-icons/lucide-icons';

@Component({
  selector: 'app-default-alert-demo',
  imports: [ScAlert, ScAlertDescription, ScAlertTitle, SiCircleAlertIcon],
  template: `
    <div scAlert>
      <svg siCircleAlertIcon></svg>
      <h5 scAlertTitle>Heads up!</h5>
      <div scAlertDescription>
        You can add components to your app using the cli.
      </div>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DefaultAlertDemo {}
