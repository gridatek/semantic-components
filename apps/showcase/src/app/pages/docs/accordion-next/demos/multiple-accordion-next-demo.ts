import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScAccordionNext,
  ScAccordionNextContent,
  ScAccordionNextHeader,
  ScAccordionNextItem,
  ScAccordionNextPanel,
  ScAccordionNextTrigger,
  ScAccordionNextTriggerIcon,
} from '@semantic-components/ui';
import { SiChevronDownIcon } from '@semantic-icons/lucide-icons';

/** multiple: several open at once. */
@Component({
  selector: 'app-multiple-accordion-next-demo',
  imports: [
    ScAccordionNext,
    ScAccordionNextItem,
    ScAccordionNextHeader,
    ScAccordionNextTrigger,
    ScAccordionNextTriggerIcon,
    ScAccordionNextPanel,
    ScAccordionNextContent,
    SiChevronDownIcon,
  ],
  template: `
    <div scAccordionNext multiple [value]="['notifications']" class="max-w-lg">
      <div scAccordionNextItem value="notifications">
        <h3 scAccordionNextHeader>
          <button scAccordionNextTrigger [panel]="notifications">
            Notification Settings
            <svg siChevronDownIcon scAccordionNextTriggerIcon></svg>
          </button>
        </h3>
        <div scAccordionNextPanel #notifications>
          <ng-template scAccordionNextContent>
            Manage how you receive notifications. You can enable email alerts
            for updates or push notifications for mobile devices.
          </ng-template>
        </div>
      </div>
      <div scAccordionNextItem value="privacy">
        <h3 scAccordionNextHeader>
          <button scAccordionNextTrigger [panel]="privacy">
            Privacy & Security
            <svg siChevronDownIcon scAccordionNextTriggerIcon></svg>
          </button>
        </h3>
        <div scAccordionNextPanel #privacy>
          <ng-template scAccordionNextContent>
            Control your privacy settings and security preferences. Enable
            two-factor authentication, manage connected devices, review active
            sessions, and configure data sharing preferences. You can also
            download your data or delete your account.
          </ng-template>
        </div>
      </div>
      <div scAccordionNextItem value="billing">
        <h3 scAccordionNextHeader>
          <button scAccordionNextTrigger [panel]="billing">
            Billing & Subscription
            <svg siChevronDownIcon scAccordionNextTriggerIcon></svg>
          </button>
        </h3>
        <div scAccordionNextPanel #billing>
          <ng-template scAccordionNextContent>
            View your current plan, payment history, and upcoming invoices.
            Update your payment method, change your subscription tier, or cancel
            your subscription.
          </ng-template>
        </div>
      </div>
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class MultipleAccordionNextDemo {}
