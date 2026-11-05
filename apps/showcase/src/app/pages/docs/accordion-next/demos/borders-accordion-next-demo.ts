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

/** Your borders, on the accordion and its items. */
@Component({
  selector: 'app-borders-accordion-next-demo',
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
    <div
      scAccordionNext
      [value]="['billing']"
      class="max-w-lg rounded-lg border"
    >
      <div
        scAccordionNextItem
        value="billing"
        class="border-b px-4 last:border-b-0"
      >
        <h3 scAccordionNextHeader>
          <button scAccordionNextTrigger>
            How does billing work?
            <svg siChevronDownIcon scAccordionNextTriggerIcon></svg>
          </button>
        </h3>
        <div scAccordionNextPanel>
          <ng-template scAccordionNextContent>
            We offer monthly and annual subscription plans. Billing is charged
            at the beginning of each cycle, and you can cancel anytime. All
            plans include automatic backups, 24/7 support, and unlimited team
            members.
          </ng-template>
        </div>
      </div>
      <div
        scAccordionNextItem
        value="security"
        class="border-b px-4 last:border-b-0"
      >
        <h3 scAccordionNextHeader>
          <button scAccordionNextTrigger>
            Is my data secure?
            <svg siChevronDownIcon scAccordionNextTriggerIcon></svg>
          </button>
        </h3>
        <div scAccordionNextPanel>
          <ng-template scAccordionNextContent>
            Yes. We use end-to-end encryption, SOC 2 Type II compliance, and
            regular third-party security audits. All data is encrypted at rest
            and in transit using industry-standard protocols.
          </ng-template>
        </div>
      </div>
      <div
        scAccordionNextItem
        value="integration"
        class="border-b px-4 last:border-b-0"
      >
        <h3 scAccordionNextHeader>
          <button scAccordionNextTrigger>
            What integrations do you support?
            <svg siChevronDownIcon scAccordionNextTriggerIcon></svg>
          </button>
        </h3>
        <div scAccordionNextPanel>
          <ng-template scAccordionNextContent>
            We integrate with 500+ popular tools including Slack, Zapier,
            Salesforce, HubSpot, and more. You can also build custom
            integrations using our REST API and webhooks.
          </ng-template>
        </div>
      </div>
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class BordersAccordionNextDemo {}
