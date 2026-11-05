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

/** One open at a time; [value] opens the first. */
@Component({
  selector: 'app-basic-accordion-demo',
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
    <div scAccordion [value]="['item-1']" class="max-w-lg">
      <div scAccordionItem value="item-1">
        <h3 scAccordionHeader>
          <button scAccordionTrigger>
            How do I reset my password?
            <svg siChevronDownIcon scAccordionTriggerIcon></svg>
          </button>
        </h3>
        <div scAccordionPanel>
          <ng-template scAccordionContent>
            Click on 'Forgot Password' on the login page, enter your email
            address, and we'll send you a link to reset your password. The link
            will expire in 24 hours.
          </ng-template>
        </div>
      </div>
      <div scAccordionItem value="item-2">
        <h3 scAccordionHeader>
          <button scAccordionTrigger>
            Can I change my subscription plan?
            <svg siChevronDownIcon scAccordionTriggerIcon></svg>
          </button>
        </h3>
        <div scAccordionPanel>
          <ng-template scAccordionContent>
            Yes, you can upgrade or downgrade your plan at any time from your
            account settings. Changes will be reflected in your next billing
            cycle.
          </ng-template>
        </div>
      </div>
      <div scAccordionItem value="item-3">
        <h3 scAccordionHeader>
          <button scAccordionTrigger>
            What payment methods do you accept?
            <svg siChevronDownIcon scAccordionTriggerIcon></svg>
          </button>
        </h3>
        <div scAccordionPanel>
          <ng-template scAccordionContent>
            We accept all major credit cards, PayPal, and bank transfers. All
            payments are processed securely through our payment partners.
          </ng-template>
        </div>
      </div>
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class BasicAccordionDemo {}
