import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { DisabledAccordionDemo } from './disabled-accordion-demo';

@Component({
  selector: 'app-disabled-accordion-demo-container',
  imports: [DemoContainer, DisabledAccordionDemo],
  template: `
    <app-demo-container
      title="Disabled"
      [code]="code"
      demoUrl="/demos/accordion/disabled-accordion-demo"
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
  ScAccordionBody,
  ScAccordionContent,
  ScAccordionGroup,
  ScAccordionHeader,
  ScAccordionItem,
  ScAccordionPanel,
  ScAccordionTrigger,
} from '@semantic-components/ui';

@Component({
  selector: 'app-disabled-accordion-demo',
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
  template: \`
    <div scAccordionGroup [multiExpandable]="false" class="w-full max-w-lg">
      <div scAccordionItem>
        <div scAccordionHeader>
          <button scAccordionTrigger [panel]="enabled1.panel" [expanded]="true">
            Enabled Item
          </button>
        </div>
        <div scAccordionPanel #enabled1="scAccordionPanel">
          <ng-template scAccordionContent>
            <sc-accordion-body>
              This item can be toggled normally.
            </sc-accordion-body>
          </ng-template>
        </div>
      </div>
      <div scAccordionItem>
        <div scAccordionHeader>
          <button
            scAccordionTrigger
            [panel]="disabled1.panel"
            [disabled]="true"
          >
            Disabled Item
          </button>
        </div>
        <div scAccordionPanel #disabled1="scAccordionPanel">
          <ng-template scAccordionContent>
            <sc-accordion-body>This content won't be shown.</sc-accordion-body>
          </ng-template>
        </div>
      </div>
      <div scAccordionItem>
        <div scAccordionHeader>
          <button scAccordionTrigger [panel]="enabled2.panel">
            Another Enabled Item
          </button>
        </div>
        <div scAccordionPanel #enabled2="scAccordionPanel">
          <ng-template scAccordionContent>
            <sc-accordion-body>
              This item also works normally.
            </sc-accordion-body>
          </ng-template>
        </div>
      </div>
    </div>
  \`,
  encapsulation: ViewEncapsulation.None,
})
export class DisabledAccordionDemo {}`;
}
