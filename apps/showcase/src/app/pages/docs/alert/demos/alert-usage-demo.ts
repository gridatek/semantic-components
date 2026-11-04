import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScAlert,
  ScAlertDescription,
  ScAlertTitle,
} from '@semantic-components/ui';
import { SiCircleCheckIcon, SiInfoIcon } from '@semantic-icons/lucide-icons';

@Component({
  selector: 'app-alert-usage-demo',
  imports: [
    ScAlert,
    ScAlertDescription,
    ScAlertTitle,
    SiCircleCheckIcon,
    SiInfoIcon,
  ],
  template: `
    <div class="grid w-full max-w-md items-start gap-4">
      <div scAlert>
        <svg siCircleCheckIcon></svg>
        <div scAlertTitle>Payment successful</div>
        <div scAlertDescription>
          Your payment of $29.99 has been processed. A receipt has been sent to
          your email address.
        </div>
      </div>
      <div scAlert>
        <svg siInfoIcon></svg>
        <div scAlertTitle>New feature available</div>
        <div scAlertDescription>
          We&apos;ve added dark mode support. You can enable it in your account
          settings.
        </div>
      </div>
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class AlertUsageDemo {}
