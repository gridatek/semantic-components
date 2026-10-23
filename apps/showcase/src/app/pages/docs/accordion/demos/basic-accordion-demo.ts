import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScAccordionBody,
  ScAccordionContent,
  ScAccordionGroup,
  ScAccordionHeader,
  ScAccordionItem,
  ScAccordionPanel,
  ScAccordionTrigger,
} from '@semantic-components/ui';
import { SiChevronDownIcon } from '@semantic-icons/lucide-icons';

@Component({
  selector: 'app-basic-accordion-demo',
  imports: [
    ScAccordionGroup,
    ScAccordionHeader,
    ScAccordionItem,
    ScAccordionTrigger,
    ScAccordionPanel,
    ScAccordionContent,
    ScAccordionBody,
    SiChevronDownIcon,
  ],
  host: { class: 'flex w-full justify-center' },
  template: `
    <div scAccordionGroup [multiExpandable]="false" class="max-w-lg">
      <div scAccordionItem>
        <div scAccordionHeader>
          <button scAccordionTrigger [panel]="shipping.panel" [expanded]="true">
            What are your shipping options?
            <svg siChevronDownIcon></svg>
          </button>
        </div>
        <div scAccordionPanel #shipping="scAccordionPanel">
          <ng-template scAccordionContent>
            <div scAccordionBody>
              We offer standard (5-7 days), express (2-3 days), and overnight
              shipping. Free shipping on international orders.
            </div>
          </ng-template>
        </div>
      </div>
      <div scAccordionItem>
        <div scAccordionHeader>
          <button scAccordionTrigger [panel]="returns.panel">
            What is your return policy?
            <svg siChevronDownIcon></svg>
          </button>
        </div>
        <div scAccordionPanel #returns="scAccordionPanel">
          <ng-template scAccordionContent>
            <div scAccordionBody>
              Returns accepted within 30 days. Items must be unused and in
              original packaging. Refunds processed within 5-7 business days.
            </div>
          </ng-template>
        </div>
      </div>
      <div scAccordionItem>
        <div scAccordionHeader>
          <button scAccordionTrigger [panel]="support.panel">
            How can I contact customer support?
            <svg siChevronDownIcon></svg>
          </button>
        </div>
        <div scAccordionPanel #support="scAccordionPanel">
          <ng-template scAccordionContent>
            <div scAccordionBody>
              Reach us via email, live chat, or phone. We respond within 24
              hours during business days.
            </div>
          </ng-template>
        </div>
      </div>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
})
export class BasicAccordionDemo {}
