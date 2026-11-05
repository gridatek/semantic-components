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

@Component({
  selector: 'app-accordion-next-usage-demo',
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
    <div scAccordionNext [value]="['shipping']" class="max-w-lg">
      <div scAccordionNextItem value="shipping">
        <h3 scAccordionNextHeader>
          <button scAccordionNextTrigger>
            What are your shipping options?
            <svg siChevronDownIcon scAccordionNextTriggerIcon></svg>
          </button>
        </h3>
        <div scAccordionNextPanel>
          <ng-template scAccordionNextContent>
            We offer standard (5-7 days), express (2-3 days), and overnight
            shipping. Free shipping on international orders.
          </ng-template>
        </div>
      </div>
      <div scAccordionNextItem value="returns">
        <h3 scAccordionNextHeader>
          <button scAccordionNextTrigger>
            What is your return policy?
            <svg siChevronDownIcon scAccordionNextTriggerIcon></svg>
          </button>
        </h3>
        <div scAccordionNextPanel>
          <ng-template scAccordionNextContent>
            Returns accepted within 30 days. Items must be unused and in
            original packaging. Refunds processed within 5-7 business days.
          </ng-template>
        </div>
      </div>
      <div scAccordionNextItem value="support">
        <h3 scAccordionNextHeader>
          <button scAccordionNextTrigger>
            How can I contact customer support?
            <svg siChevronDownIcon scAccordionNextTriggerIcon></svg>
          </button>
        </h3>
        <div scAccordionNextPanel>
          <ng-template scAccordionNextContent>
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
export class AccordionNextUsageDemo {}
