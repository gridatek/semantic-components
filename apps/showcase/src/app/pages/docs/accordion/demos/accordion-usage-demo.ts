import { Component, ViewEncapsulation } from '@angular/core';
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

@Component({
  selector: 'app-accordion-usage-demo',
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
  template: `
    <div scAccordion [value]="['shipping']" class="max-w-lg">
      <div scAccordionItem value="shipping">
        <h3 scAccordionHeader>
          <button scAccordionTrigger>
            What are your shipping options?
            <svg siChevronDownIcon scAccordionTriggerIcon></svg>
          </button>
        </h3>
        <div scAccordionPanel>
          <ng-template scAccordionContent>
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
          <ng-template scAccordionContent>
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
          <ng-template scAccordionContent>
            Reach us via email, live chat, or phone. We respond within 24 hours
            during business days.
          </ng-template>
        </div>
      </div>
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class AccordionUsageDemo {}
