import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { DisabledAccordionDemo } from './disabled-accordion-demo';

@Component({
  selector: 'app-disabled-accordion-demo-container',
  imports: [DemoContainer, DisabledAccordionDemo],
  template: `
    <app-demo-container
      title="Disabled"
      demoUrl="/demos/accordion/disabled-accordion-demo"
      [code]="code"
    >
      <app-disabled-accordion-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class DisabledAccordionDemoContainer {
  readonly code = `import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScAccordion,
  ScAccordionHeader,
  ScAccordionItem,
  ScAccordionPanel,
  ScAccordionPanelContent,
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
    ScAccordionPanelContent,
    SiChevronDownIcon,
  ],
  template: \`
    <div scAccordion class="w-full">
      <div scAccordionItem value="item-1">
        <h3 scAccordionHeader>
          <button scAccordionTrigger>
            Can I access my account history?
            <svg siChevronDownIcon scAccordionTriggerIcon></svg>
          </button>
        </h3>
        <div scAccordionPanel>
          <ng-template scAccordionPanelContent>
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
          <ng-template scAccordionPanelContent>
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
          <ng-template scAccordionPanelContent>
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
export class DisabledAccordionDemo {}`;
}
