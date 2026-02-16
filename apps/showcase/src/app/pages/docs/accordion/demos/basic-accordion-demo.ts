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
  host: { class: 'block' },
  template: `
    <div scAccordionGroup [multiExpandable]="false" class="max-w-lg">
      <div scAccordionItem>
        <div scAccordionHeader>
          <button scAccordionTrigger panelId="shipping" [expanded]="true">
            What are your shipping options?
          </button>
        </div>
        <div scAccordionPanel panelId="shipping">
          <ng-template scAccordionContent>
            <scAccordionBody>
              We offer standard (5-7 days), express (2-3 days), and overnight
              shipping. Free shipping on international orders.
            </sc-accordion-body>
          </ng-template>
        </div>
      </div>
      <div scAccordionItem>
        <div scAccordionHeader>
          <button scAccordionTrigger panelId="returns">
            What is your return policy?
          </button>
        </div>
        <div scAccordionPanel panelId="returns">
          <ng-template scAccordionContent>
            <scAccordionBody>
              Returns accepted within 30 days. Items must be unused and in
              original packaging. Refunds processed within 5-7 business days.
            </sc-accordion-body>
          </ng-template>
        </div>
      </div>
      <div scAccordionItem>
        <div scAccordionHeader>
          <button scAccordionTrigger panelId="support">
            How can I contact customer support?
          </button>
        </div>
        <div scAccordionPanel panelId="support">
          <ng-template scAccordionContent>
            <scAccordionBody>
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
