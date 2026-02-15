import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import {
  ScAccordionBody,
  ScAccordionContent,
  ScAccordionGroup,
  ScAccordionHeader,
  ScAccordionItem,
  ScAccordionPanel,
  ScAccordionTrigger,
} from '@semantic-components/ui-lab';

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
  host: { class: 'block' },
  template: `
    <div scAccordionGroup [multiExpandable]="false" class="w-full max-w-lg">
      <div scAccordionItem>
        <div scAccordionHeader>
          <button scAccordionTrigger panelId="enabled-1" [expanded]="true">
            Enabled Item
          </button>
        </div>
        <div scAccordionPanel panelId="enabled-1">
          <ng-template scAccordionContent>
            <sc-accordion-body>
              This item can be toggled normally.
            </sc-accordion-body>
          </ng-template>
        </div>
      </div>
      <div scAccordionItem>
        <div scAccordionHeader>
          <button scAccordionTrigger panelId="disabled-1" [disabled]="true">
            Disabled Item
          </button>
        </div>
        <div scAccordionPanel panelId="disabled-1">
          <ng-template scAccordionContent>
            <sc-accordion-body>This content won't be shown.</sc-accordion-body>
          </ng-template>
        </div>
      </div>
      <div scAccordionItem>
        <div scAccordionHeader>
          <button scAccordionTrigger panelId="enabled-2">
            Another Enabled Item
          </button>
        </div>
        <div scAccordionPanel panelId="enabled-2">
          <ng-template scAccordionContent>
            <sc-accordion-body>
              This item also works normally.
            </sc-accordion-body>
          </ng-template>
        </div>
      </div>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DisabledAccordionDemo {}
