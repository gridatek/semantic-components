import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { BasicAccordionDemo } from './basic-accordion-demo';

@Component({
  selector: 'app-basic-accordion-demo-container',
  imports: [DemoContainer, BasicAccordionDemo],
  template: `
    <app-demo-container
      title="Basic"
      [code]="code"
      demoUrl="/demos/accordion/basic-accordion-demo"
    >
      <app-basic-accordion-demo />
    </app-demo-container>
  `,
  host: { class: 'block' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BasicAccordionDemoContainer {
  readonly code = `import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import {
  ScAccordion,
  ScAccordionContent,
  ScAccordionHeader,
  ScAccordionItem,
  ScAccordionPanel,
  ScAccordionTrigger,
  ScAccordionTriggerIcon,
} from '@semantic-components/ui-lab';

import { SiChevronDownIcon } from '@semantic-icons/lucide-icons';

@Component({
  selector: 'app-basic-accordion-demo',
  imports: [
    ScAccordion,
    ScAccordionPanel,
    ScAccordionItem,
    ScAccordionTrigger,
    ScAccordionContent,
    ScAccordionHeader,
    SiChevronDownIcon,
    ScAccordionTriggerIcon,
  ],
  template: \`
    <div sc-accordion [multiExpandable]="false" class="w-full max-w-md">
      <div sc-accordion-item>
        <div sc-accordion-header>
          <button sc-accordion-trigger panelId="item-1">
            Is it accessible?

            <svg si-chevron-down-icon sc-accordion-trigger-icon></svg>
          </button>
        </div>
        <div sc-accordion-panel panelId="item-1">
          <div sc-accordion-content>
            Yes. It adheres to the WAI-ARIA design pattern.
          </div>
        </div>
      </div>
      <div sc-accordion-item>
        <div sc-accordion-header>
          <button sc-accordion-trigger panelId="item-2">
            Is it styled?

            <svg si-chevron-down-icon sc-accordion-trigger-icon></svg>
          </button>
        </div>
        <div sc-accordion-panel panelId="item-2">
          <div sc-accordion-content>
            Yes. It comes with default styles that match other components.
          </div>
        </div>
        <div sc-accordion-item>
          <div sc-accordion-header>
            <button sc-accordion-trigger panelId="item-3">
              Is it animated?

              <svg si-chevron-down-icon sc-accordion-trigger-icon></svg>
            </button>
          </div>
          <div sc-accordion-panel panelId="item-3">
            <div sc-accordion-content>
              Yes. It's animated by default with smooth transitions.
            </div>
          </div>
        </div>
      </div>
    </div>
  \`,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BasicAccordionDemo {}`;
}
