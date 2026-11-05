import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { MultipleAccordionDemo } from './multiple-accordion-demo';

@Component({
  selector: 'app-multiple-accordion-demo-container',
  imports: [DemoContainer, MultipleAccordionDemo],
  template: `
    <app-demo-container
      title="Multiple"
      demoUrl="/demos/accordion/multiple-accordion-demo"
      [code]="code"
    >
      <app-multiple-accordion-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class MultipleAccordionDemoContainer {
  readonly code = `import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScAccordion,
  ScAccordionContent,
  ScAccordionHeader,
  ScAccordionItem,
  ScAccordionPanel,
  ScAccordionTrigger,
  ScAccordionTriggerIcon,
} from '@semantic-components/ui';
import { SiChevronDownIcon } from '@semantic-icons/lucide-icons';

/** multiple: several open at once. */
@Component({
  selector: 'app-multiple-accordion-demo',
  imports: [
    ScAccordion,
    ScAccordionItem,
    ScAccordionHeader,
    ScAccordionTrigger,
    ScAccordionTriggerIcon,
    ScAccordionPanel,
    ScAccordionContent,
    SiChevronDownIcon,
  ],
  template: \`
    <div scAccordion multiple [value]="['notifications']" class="max-w-lg">
      <div scAccordionItem value="notifications">
        <h3 scAccordionHeader>
          <button scAccordionTrigger>
            Notification Settings
            <svg siChevronDownIcon scAccordionTriggerIcon></svg>
          </button>
        </h3>
        <div scAccordionPanel>
          <ng-template scAccordionContent>
            Manage how you receive notifications. You can enable email alerts
            for updates or push notifications for mobile devices.
          </ng-template>
        </div>
      </div>
      <div scAccordionItem value="privacy">
        <h3 scAccordionHeader>
          <button scAccordionTrigger>
            Privacy & Security
            <svg siChevronDownIcon scAccordionTriggerIcon></svg>
          </button>
        </h3>
        <div scAccordionPanel>
          <ng-template scAccordionContent>
            Control your privacy settings and security preferences. Enable
            two-factor authentication, manage connected devices, review active
            sessions, and configure data sharing preferences. You can also
            download your data or delete your account.
          </ng-template>
        </div>
      </div>
      <div scAccordionItem value="billing">
        <h3 scAccordionHeader>
          <button scAccordionTrigger>
            Billing & Subscription
            <svg siChevronDownIcon scAccordionTriggerIcon></svg>
          </button>
        </h3>
        <div scAccordionPanel>
          <ng-template scAccordionContent>
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
export class MultipleAccordionDemo {}`;
}
