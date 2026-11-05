import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { MultipleAccordionNextDemo } from './multiple-accordion-next-demo';

@Component({
  selector: 'app-multiple-accordion-next-demo-container',
  imports: [DemoContainer, MultipleAccordionNextDemo],
  template: `
    <app-demo-container
      title="Multiple"
      demoUrl="/demos/accordion-next/multiple-accordion-next-demo"
      [code]="code"
    >
      <app-multiple-accordion-next-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class MultipleAccordionNextDemoContainer {
  readonly code = `import { Component, ViewEncapsulation } from '@angular/core';
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
  template: \`
    <div scAccordionNext multiple [value]="['notifications']" class="max-w-lg">
      <div scAccordionNextItem value="notifications">
        <h3 scAccordionNextHeader>
          <button scAccordionNextTrigger>
            Notification Settings
            <svg siChevronDownIcon scAccordionNextTriggerIcon></svg>
          </button>
        </h3>
        <div scAccordionNextPanel>
          <ng-template scAccordionNextContent>
            Manage how you receive notifications. You can enable email alerts
            for updates or push notifications for mobile devices.
          </ng-template>
        </div>
      </div>
      <div scAccordionNextItem value="privacy">
        <h3 scAccordionNextHeader>
          <button scAccordionNextTrigger>
            Privacy & Security
            <svg siChevronDownIcon scAccordionNextTriggerIcon></svg>
          </button>
        </h3>
        <div scAccordionNextPanel>
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
          <button scAccordionNextTrigger>
            Billing & Subscription
            <svg siChevronDownIcon scAccordionNextTriggerIcon></svg>
          </button>
        </h3>
        <div scAccordionNextPanel>
          <ng-template scAccordionNextContent>
            View your current plan, payment history, and upcoming invoices.
            Update your payment method, change your subscription tier, or cancel
            your subscription.
          </ng-template>
        </div>
      </div>
    </div>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class MultipleAccordionNextDemo {}`;
}
