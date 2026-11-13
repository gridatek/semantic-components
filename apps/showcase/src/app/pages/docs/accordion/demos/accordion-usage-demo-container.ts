import { Component, ViewEncapsulation } from '@angular/core';
import { UsageCode } from '../../../../components/usage-code/usage-code';
import { AccordionUsageDemo } from './accordion-usage-demo';

@Component({
  selector: 'app-accordion-usage-demo-container',
  imports: [UsageCode, AccordionUsageDemo],
  template: `
    <app-usage-code [code]="code">
      <ng-template><app-accordion-usage-demo /></ng-template>
    </app-usage-code>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class AccordionUsageDemoContainer {
  readonly code = `import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScAccordion,
  ScAccordionHeader,
  ScAccordionItem,
  ScAccordionPanel,
  ScAccordionPanelContent,
  ScAccordionTrigger,
  ScAccordionTriggerIcon,
} from '@semantic-components/ui';
import { SiChevronDownIcon } from '@semantic-icons/lucide-icons';

@Component({
  selector: 'app-accordion-usage-demo',
  imports: [
    ScAccordion,
    ScAccordionItem,
    ScAccordionHeader,
    ScAccordionTrigger,
    ScAccordionTriggerIcon,
    ScAccordionPanel,
    ScAccordionPanelContent,
    SiChevronDownIcon,
  ],
  template: \`
    <div scAccordion [value]="['shipping']" class="max-w-lg">
      <div scAccordionItem value="shipping">
        <h3 scAccordionHeader>
          <button scAccordionTrigger>
            What are your shipping options?
            <svg siChevronDownIcon scAccordionTriggerIcon></svg>
          </button>
        </h3>
        <div scAccordionPanel>
          <ng-template scAccordionPanelContent>
            We offer standard (5-7 days), express (2-3 days), and overnight
            shipping. Free shipping on international orders.
          </ng-template>
        </div>
      </div>
      <div scAccordionItem value="returns">
        <h3 scAccordionHeader>
          <button scAccordionTrigger>
            What is your return policy?
            <svg siChevronDownIcon scAccordionTriggerIcon></svg>
          </button>
        </h3>
        <div scAccordionPanel>
          <ng-template scAccordionPanelContent>
            Returns accepted within 30 days. Items must be unused and in
            original packaging. Refunds processed within 5-7 business days.
          </ng-template>
        </div>
      </div>
      <div scAccordionItem value="support">
        <h3 scAccordionHeader>
          <button scAccordionTrigger>
            How can I contact customer support?
            <svg siChevronDownIcon scAccordionTriggerIcon></svg>
          </button>
        </h3>
        <div scAccordionPanel>
          <ng-template scAccordionPanelContent>
            Reach us via email, live chat, or phone. We respond within 24 hours
            during business days.
          </ng-template>
        </div>
      </div>
    </div>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class AccordionUsageDemo {}`;
}
