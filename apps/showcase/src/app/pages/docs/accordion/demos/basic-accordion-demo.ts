import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import {
  ScAccordionBody,
  ScAccordionContent,
  ScAccordionGroup,
  ScAccordionHeader,
  ScAccordionItem,
  ScAccordionPanel,
  ScAccordionTrigger,
} from '@semantic-components/ui';

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
  ],
  host: { class: 'flex w-full justify-center' },
  template: `
    <div scAccordionGroup [multiExpandable]="false" class="max-w-lg">
      <div scAccordionItem>
        <div scAccordionHeader>
          <button scAccordionTrigger [panel]="shipping.panel" [expanded]="true">
            What are your shipping options?
          </button>
        </div>
        <div scAccordionPanel #shipping="scAccordionPanel">
          <ng-template scAccordionContent>
            <sc-accordion-body>
              We offer standard (5-7 days), express (2-3 days), and overnight
              shipping. Free shipping on international orders.
            </sc-accordion-body>
          </ng-template>
        </div>
      </div>
      <div scAccordionItem>
        <div scAccordionHeader>
          <button scAccordionTrigger [panel]="returns.panel">
            What is your return policy?
          </button>
        </div>
        <div scAccordionPanel #returns="scAccordionPanel">
          <ng-template scAccordionContent>
            <sc-accordion-body>
              Returns accepted within 30 days. Items must be unused and in
              original packaging. Refunds processed within 5-7 business days.
            </sc-accordion-body>
          </ng-template>
        </div>
      </div>
      <div scAccordionItem>
        <div scAccordionHeader>
          <button scAccordionTrigger [panel]="support.panel">
            How can I contact customer support?
          </button>
        </div>
        <div scAccordionPanel #support="scAccordionPanel">
          <ng-template scAccordionContent>
            <sc-accordion-body>
              Reach us via email, live chat, or phone. We respond within 24
              hours during business days.
            </sc-accordion-body>
          </ng-template>
        </div>
      </div>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BasicAccordionDemo {}
