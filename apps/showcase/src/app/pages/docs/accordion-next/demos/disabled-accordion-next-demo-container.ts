import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { DisabledAccordionNextDemo } from './disabled-accordion-next-demo';

@Component({
  selector: 'app-disabled-accordion-next-demo-container',
  imports: [DemoContainer, DisabledAccordionNextDemo],
  template: `
    <app-demo-container
      title="Disabled"
      demoUrl="/demos/accordion-next/disabled-accordion-next-demo"
      [code]="code"
    >
      <app-disabled-accordion-next-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class DisabledAccordionNextDemoContainer {
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
  template: \`
    <div scAccordionNext class="w-full">
      <div scAccordionNextItem value="item-1">
        <h3 scAccordionNextHeader>
          <button scAccordionNextTrigger [panel]="item1">
            Can I access my account history?
            <svg siChevronDownIcon scAccordionNextTriggerIcon></svg>
          </button>
        </h3>
        <div scAccordionNextPanel #item1>
          <ng-template scAccordionNextContent>
            Yes, you can view your complete account history including all
            transactions, plan changes, and support tickets in the Account
            History section of your dashboard.
          </ng-template>
        </div>
      </div>
      <div scAccordionNextItem value="item-2" disabled>
        <h3 scAccordionNextHeader>
          <button scAccordionNextTrigger [panel]="item2">
            Premium feature information
            <svg siChevronDownIcon scAccordionNextTriggerIcon></svg>
          </button>
        </h3>
        <div scAccordionNextPanel #item2>
          <ng-template scAccordionNextContent>
            This section contains information about premium features. Upgrade
            your plan to access this content.
          </ng-template>
        </div>
      </div>
      <div scAccordionNextItem value="item-3">
        <h3 scAccordionNextHeader>
          <button scAccordionNextTrigger [panel]="item3">
            How do I update my email address?
            <svg siChevronDownIcon scAccordionNextTriggerIcon></svg>
          </button>
        </h3>
        <div scAccordionNextPanel #item3>
          <ng-template scAccordionNextContent>
            You can update your email address in your account settings. You’ll
            receive a verification email at your new address to confirm the
            change.
          </ng-template>
        </div>
      </div>
    </div>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class DisabledAccordionNextDemo {}`;
}
