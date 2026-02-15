import {
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
  selector: 'app-basic-accordion-demo',
  imports: [
    ScAccordionGroup,
    ScAccordionItem,
    ScAccordionTrigger,
    ScAccordionPanel,
    ScAccordionContent,
    ScAccordionBody,
  ],
  template: `
    <div scAccordionGroup [multiExpandable]="false" class="w-full max-w-md">
      <div scAccordionItem>
        <button scAccordionTrigger panelId="item-1">Is it accessible?</button>
        <div scAccordionPanel panelId="item-1">
          <ng-template scAccordionContent>
            <sc-accordion-body>
              Yes. It adheres to the WAI-ARIA design pattern.
            </sc-accordion-body>
          </ng-template>
        </div>
      </div>
      <div scAccordionItem>
        <button scAccordionTrigger panelId="item-2">Is it styled?</button>
        <div scAccordionPanel panelId="item-2">
          <ng-template scAccordionContent>
            <sc-accordion-body>
              Yes. It comes with default styles that match other components.
            </sc-accordion-body>
          </ng-template>
        </div>
      </div>
      <div scAccordionItem>
        <button scAccordionTrigger panelId="item-3">Is it animated?</button>
        <div scAccordionPanel panelId="item-3">
          <ng-template scAccordionContent>
            <sc-accordion-body>
              Yes. It's animated by default with smooth transitions.
            </sc-accordion-body>
          </ng-template>
        </div>
      </div>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BasicAccordionDemo {}
