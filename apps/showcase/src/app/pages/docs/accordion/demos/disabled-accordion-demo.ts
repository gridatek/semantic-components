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

/** A disabled item: reached by the keyboard, not opened. */
@Component({
  selector: 'app-disabled-accordion-demo',
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
    <div scAccordion class="w-full">
      <div scAccordionItem value="item-1">
        <h3 scAccordionHeader>
          <button scAccordionTrigger>
            Can I access my account history?
            <svg siChevronDownIcon scAccordionTriggerIcon></svg>
          </button>
        </h3>
        <div scAccordionPanel>
          <ng-template scAccordionContent>
            Yes, you can view your complete account history including all
            transactions, plan changes, and support tickets in the Account
            History section of your dashboard.
          </ng-template>
        </div>
      </div>
      <div scAccordionItem value="item-2" disabled>
        <h3 scAccordionHeader>
          <button scAccordionTrigger>
            Premium feature information
            <svg siChevronDownIcon scAccordionTriggerIcon></svg>
          </button>
        </h3>
        <div scAccordionPanel>
          <ng-template scAccordionContent>
            This section contains information about premium features. Upgrade
            your plan to access this content.
          </ng-template>
        </div>
      </div>
      <div scAccordionItem value="item-3">
        <h3 scAccordionHeader>
          <button scAccordionTrigger>
            How do I update my email address?
            <svg siChevronDownIcon scAccordionTriggerIcon></svg>
          </button>
        </h3>
        <div scAccordionPanel>
          <ng-template scAccordionContent>
            You can update your email address in your account settings. You’ll
            receive a verification email at your new address to confirm the
            change.
          </ng-template>
        </div>
      </div>
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class DisabledAccordionDemo {}
