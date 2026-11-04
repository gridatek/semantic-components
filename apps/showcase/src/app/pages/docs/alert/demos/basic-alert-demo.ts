import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScAlert,
  ScAlertDescription,
  ScAlertTitle,
} from '@semantic-components/ui';
import { SiCircleCheckIcon } from '@semantic-icons/lucide-icons';

/** An icon, a title, a description: the icon beside both. */
@Component({
  selector: 'app-basic-alert-demo',
  imports: [ScAlert, ScAlertDescription, ScAlertTitle, SiCircleCheckIcon],
  template: `
    <div scAlert class="max-w-md">
      <svg siCircleCheckIcon></svg>
      <div scAlertTitle>Account updated successfully</div>
      <div scAlertDescription>
        Your profile information has been saved. Changes will be reflected
        immediately.
      </div>
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class BasicAlertDemo {}
