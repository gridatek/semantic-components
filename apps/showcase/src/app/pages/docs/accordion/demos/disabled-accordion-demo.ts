import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScAccordionBody,
  ScAccordionContent,
  ScAccordionGroup,
  ScAccordionHeader,
  ScAccordionItem,
  ScAccordionPanel,
  ScAccordionTrigger,
} from '@semantic-components/ui';
import { SiChevronDownIcon } from '@semantic-icons/lucide-icons';

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
    SiChevronDownIcon,
  ],
  host: { class: 'flex w-full justify-center' },
  template: `
    <div scAccordionGroup [multiExpandable]="false" class="w-full max-w-lg">
      <div scAccordionItem>
        <div scAccordionHeader>
          <button scAccordionTrigger [panel]="enabled1.panel" [expanded]="true">
            Enabled Item
            <svg siChevronDownIcon></svg>
          </button>
        </div>
        <div scAccordionPanel #enabled1="scAccordionPanel">
          <ng-template scAccordionContent>
            <div scAccordionBody>This item can be toggled normally.</div>
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
            <svg siChevronDownIcon></svg>
          </button>
        </div>
        <div scAccordionPanel #disabled1="scAccordionPanel">
          <ng-template scAccordionContent>
            <div scAccordionBody>This content won't be shown.</div>
          </ng-template>
        </div>
      </div>
      <div scAccordionItem>
        <div scAccordionHeader>
          <button scAccordionTrigger [panel]="enabled2.panel">
            Another Enabled Item
            <svg siChevronDownIcon></svg>
          </button>
        </div>
        <div scAccordionPanel #enabled2="scAccordionPanel">
          <ng-template scAccordionContent>
            <div scAccordionBody>This item also works normally.</div>
          </ng-template>
        </div>
      </div>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
})
export class DisabledAccordionDemo {}
