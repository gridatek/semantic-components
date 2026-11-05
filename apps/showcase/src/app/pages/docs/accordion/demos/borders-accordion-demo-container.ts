import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { BordersAccordionDemo } from './borders-accordion-demo';

@Component({
  selector: 'app-borders-accordion-demo-container',
  imports: [DemoContainer, BordersAccordionDemo],
  template: `
    <app-demo-container
      title="Borders"
      demoUrl="/demos/accordion/borders-accordion-demo"
      [code]="code"
    >
      <app-borders-accordion-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class BordersAccordionDemoContainer {
  readonly code = `import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScAccordion,
  ScAccordionContent,
  ScAccordionHeader,
  ScAccordionItem,
  ScAccordionPanel,
  ScAccordionTrigger,
  ScAccordionTriggerIcon,
  ScFrame,
} from '@semantic-components/ui';
import { SiChevronDownIcon } from '@semantic-icons/lucide-icons';

/** A frame round the accordion (scFrame: the style’s), lines between its items. */
@Component({
  selector: 'app-borders-accordion-demo',
  imports: [
    ScAccordion,
    ScAccordionItem,
    ScAccordionHeader,
    ScAccordionTrigger,
    ScAccordionTriggerIcon,
    ScAccordionPanel,
    ScAccordionContent,
    ScFrame,
    SiChevronDownIcon,
  ],
  template: \`
    <div scAccordion scFrame [value]="['billing']" class="max-w-lg">
      <div
        scAccordionItem
        value="billing"
        class="border-b px-4 last:border-b-0"
      >
        <h3 scAccordionHeader>
          <button scAccordionTrigger>
            How does billing work?
            <svg siChevronDownIcon scAccordionTriggerIcon></svg>
          </button>
        </h3>
        <div scAccordionPanel>
          <ng-template scAccordionContent>
            We offer monthly and annual subscription plans. Billing is charged
            at the beginning of each cycle, and you can cancel anytime. All
            plans include automatic backups, 24/7 support, and unlimited team
            members.
          </ng-template>
        </div>
      </div>
      <div
        scAccordionItem
        value="security"
        class="border-b px-4 last:border-b-0"
      >
        <h3 scAccordionHeader>
          <button scAccordionTrigger>
            Is my data secure?
            <svg siChevronDownIcon scAccordionTriggerIcon></svg>
          </button>
        </h3>
        <div scAccordionPanel>
          <ng-template scAccordionContent>
            Yes. We use end-to-end encryption, SOC 2 Type II compliance, and
            regular third-party security audits. All data is encrypted at rest
            and in transit using industry-standard protocols.
          </ng-template>
        </div>
      </div>
      <div
        scAccordionItem
        value="integration"
        class="border-b px-4 last:border-b-0"
      >
        <h3 scAccordionHeader>
          <button scAccordionTrigger>
            What integrations do you support?
            <svg siChevronDownIcon scAccordionTriggerIcon></svg>
          </button>
        </h3>
        <div scAccordionPanel>
          <ng-template scAccordionContent>
            We integrate with 500+ popular tools including Slack, Zapier,
            Salesforce, HubSpot, and more. You can also build custom
            integrations using our REST API and webhooks.
          </ng-template>
        </div>
      </div>
    </div>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class BordersAccordionDemo {}`;
}
