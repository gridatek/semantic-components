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

/** A disabled item: reached by the keyboard, not opened. */
@Component({
  selector: 'app-disabled-accordion-next-demo',
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
    <div scAccordionNext class="w-full">
      <div scAccordionNextItem value="item-1">
        <h3 scAccordionNextHeader>
          <button scAccordionNextTrigger>
            Can I access my account history?
            <svg siChevronDownIcon scAccordionNextTriggerIcon></svg>
          </button>
        </h3>
        <div scAccordionNextPanel>
          <ng-template scAccordionNextContent>
            Yes, you can view your complete account history including all
            transactions, plan changes, and support tickets in the Account
            History section of your dashboard.
          </ng-template>
        </div>
      </div>
      <div scAccordionNextItem value="item-2" disabled>
        <h3 scAccordionNextHeader>
          <button scAccordionNextTrigger>
            Premium feature information
            <svg siChevronDownIcon scAccordionNextTriggerIcon></svg>
          </button>
        </h3>
        <div scAccordionNextPanel>
          <ng-template scAccordionNextContent>
            This section contains information about premium features. Upgrade
            your plan to access this content.
          </ng-template>
        </div>
      </div>
      <div scAccordionNextItem value="item-3">
        <h3 scAccordionNextHeader>
          <button scAccordionNextTrigger>
            How do I update my email address?
            <svg siChevronDownIcon scAccordionNextTriggerIcon></svg>
          </button>
        </h3>
        <div scAccordionNextPanel>
          <ng-template scAccordionNextContent>
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
export class DisabledAccordionNextDemo {}
