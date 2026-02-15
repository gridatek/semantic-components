import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
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
  host: { class: 'block' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DisabledAccordionDemoContainer {
  readonly code = `import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import {
  ScAccordionBody,
  ScAccordionContent,
  ScAccordionGroup,
  ScAccordionItem,
  ScAccordionPanel,
  ScAccordionTrigger,
} from '@semantic-components/ui-lab';

@Component({
  selector: 'app-disabled-accordion-demo',
  imports: [
    ScAccordionGroup,
    ScAccordionItem,
    ScAccordionTrigger,
    ScAccordionPanel,
    ScAccordionContent,
    ScAccordionBody,
  ],
  template: \`
    <div scAccordionGroup [multiExpandable]="false" class="w-full max-w-md">
      <div scAccordionItem>
        <button scAccordionTrigger panelId="enabled-1" [expanded]="true">
          Enabled Item
        </button>
        <div scAccordionPanel panelId="enabled-1">
          <ng-template scAccordionContent>
            <sc-accordion-body>
              This item can be toggled normally.
            </sc-accordion-body>
          </ng-template>
        </div>
      </div>
      <div scAccordionItem>
        <button scAccordionTrigger panelId="disabled-1" [disabled]="true">
          Disabled Item
        </button>
        <div scAccordionPanel panelId="disabled-1">
          <ng-template scAccordionContent>
            <sc-accordion-body>
              This content won't be shown.
            </sc-accordion-body>
          </ng-template>
        </div>
      </div>
      <div scAccordionItem>
        <button scAccordionTrigger panelId="enabled-2">
          Another Enabled Item
        </button>
        <div scAccordionPanel panelId="enabled-2">
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
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DisabledAccordionDemo {}`;
}
