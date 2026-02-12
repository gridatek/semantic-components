import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import {
  ScAccordion,
  ScAccordionPanel,
  ScAccordionItem,
  ScAccordionTrigger,
  ScAccordionContent,
  ScAccordionHeader,
  ScAccordionTriggerIcon,
} from '@semantic-components/ui-lab';
import { SiChevronDownIcon } from '@semantic-icons/lucide-icons';

@Component({
  selector: 'app-disabled-accordion-demo',
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
  template: `
    <div sc-accordion [multiExpandable]="false" class="w-full max-w-md">
      <div sc-accordion-item>
        <div sc-accordion-header>
          <button sc-accordion-trigger panelId="enabled-1" [expanded]="true">
            Enabled Item
            <svg si-chevron-down-icon sc-accordion-trigger-icon></svg>
          </button>
        </div>
        <div sc-accordion-panel panelId="enabled-1">
          <div sc-accordion-content>This item can be toggled normally.</div>
        </div>
      </div>
      <div sc-accordion-item>
        <div sc-accordion-header>
          <button sc-accordion-trigger panelId="disabled-1" [disabled]="true">
            Disabled Item
            <svg si-chevron-down-icon sc-accordion-trigger-icon></svg>
          </button>
        </div>
        <div sc-accordion-panel panelId="disabled-1">
          <div sc-accordion-content>This content won't be shown.</div>
        </div>
      </div>
      <div sc-accordion-item>
        <div sc-accordion-header>
          <button sc-accordion-trigger panelId="enabled-2">
            Another Enabled Item
            <svg si-chevron-down-icon sc-accordion-trigger-icon></svg>
          </button>
        </div>
        <div sc-accordion-panel panelId="enabled-2">
          <div sc-accordion-content>This item also works normally.</div>
        </div>
      </div>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DisabledAccordionDemo {}
