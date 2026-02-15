import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { MultipleAccordionDemo } from './multiple-accordion-demo';

@Component({
  selector: 'app-multiple-accordion-demo-container',
  imports: [DemoContainer, MultipleAccordionDemo],
  template: `
    <app-demo-container
      title="Multiple"
      [code]="code"
      demoUrl="/demos/accordion/multiple-accordion-demo"
    >
      <app-multiple-accordion-demo />
    </app-demo-container>
  `,
  host: { class: 'block' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MultipleAccordionDemoContainer {
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
  selector: 'app-multiple-accordion-demo',
  imports: [
    ScAccordionGroup,
    ScAccordionItem,
    ScAccordionTrigger,
    ScAccordionPanel,
    ScAccordionContent,
    ScAccordionBody,
  ],
  template: \`
    <div scAccordionGroup [multiExpandable]="true" class="w-full max-w-md">
      <div scAccordionItem>
        <button scAccordionTrigger panelId="item-a" [expanded]="true">
          Can I open multiple items?
        </button>
        <div scAccordionPanel panelId="item-a">
          <ng-template scAccordionContent>
            <sc-accordion-body>
              Yes! When using multiExpandable, you can have multiple accordion
              items open at the same time.
            </sc-accordion-body>
          </ng-template>
        </div>
      </div>
      <div scAccordionItem>
        <button scAccordionTrigger panelId="item-b" [expanded]="true">
          How does it work?
        </button>
        <div scAccordionPanel panelId="item-b">
          <ng-template scAccordionContent>
            <sc-accordion-body>
              Each trigger has an expanded input that you can bind to with
              [(expanded)] for two-way binding.
            </sc-accordion-body>
          </ng-template>
        </div>
      </div>
      <div scAccordionItem>
        <button scAccordionTrigger panelId="item-c">
          What about accessibility?
        </button>
        <div scAccordionPanel panelId="item-c">
          <ng-template scAccordionContent>
            <sc-accordion-body>
              Each item uses proper ARIA attributes including aria-expanded and
              role="region" for the content.
            </sc-accordion-body>
          </ng-template>
        </div>
      </div>
    </div>
  \`,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MultipleAccordionDemo {}`;
}
