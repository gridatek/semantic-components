import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { BasicAccordionNextDemo } from './basic-accordion-next-demo';

@Component({
  selector: 'app-basic-accordion-next-demo-container',
  imports: [DemoContainer, BasicAccordionNextDemo],
  template: `
    <app-demo-container
      title="Basic"
      demoUrl="/demos/accordion-next/basic-accordion-next-demo"
      [code]="code"
    >
      <app-basic-accordion-next-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class BasicAccordionNextDemoContainer {
  readonly code = `import { Component, ViewEncapsulation } from '@angular/core';
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

/** One open at a time; [value] opens the first. */
@Component({
  selector: 'app-basic-accordion-next-demo',
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
  template: \`
    <div scAccordionNext [value]="['item-1']" class="max-w-lg">
      <div scAccordionNextItem value="item-1">
        <h3 scAccordionNextHeader>
          <button scAccordionNextTrigger>
            How do I reset my password?
            <svg siChevronDownIcon scAccordionNextTriggerIcon></svg>
          </button>
        </h3>
        <div scAccordionNextPanel>
          <ng-template scAccordionNextContent>
            Click on 'Forgot Password' on the login page, enter your email
            address, and we'll send you a link to reset your password. The link
            will expire in 24 hours.
          </ng-template>
        </div>
      </div>
      <div scAccordionNextItem value="item-2">
        <h3 scAccordionNextHeader>
          <button scAccordionNextTrigger>
            Can I change my subscription plan?
            <svg siChevronDownIcon scAccordionNextTriggerIcon></svg>
          </button>
        </h3>
        <div scAccordionNextPanel>
          <ng-template scAccordionNextContent>
            Yes, you can upgrade or downgrade your plan at any time from your
            account settings. Changes will be reflected in your next billing
            cycle.
          </ng-template>
        </div>
      </div>
      <div scAccordionNextItem value="item-3">
        <h3 scAccordionNextHeader>
          <button scAccordionNextTrigger>
            What payment methods do you accept?
            <svg siChevronDownIcon scAccordionNextTriggerIcon></svg>
          </button>
        </h3>
        <div scAccordionNextPanel>
          <ng-template scAccordionNextContent>
            We accept all major credit cards, PayPal, and bank transfers. All
            payments are processed securely through our payment partners.
          </ng-template>
        </div>
      </div>
    </div>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class BasicAccordionNextDemo {}`;
}
