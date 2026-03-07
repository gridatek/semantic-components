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
import { SiTriangleAlertIcon } from '@semantic-icons/lucide-icons';

@Component({
  selector: 'app-destructive-alert-demo',
  imports: [ScAlert, ScAlertDescription, ScAlertTitle, SiTriangleAlertIcon],
  template: `
    <div scAlert variant="destructive">
      <svg siTriangleAlertIcon></svg>
      <div scAlertTitle>Error</div>
      <div scAlertDescription>
        Your session has expired. Please log in again.
      </div>
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DestructiveAlertDemo {}
