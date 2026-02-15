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
  selector: 'app-multiple-accordion-demo',
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
    <div scAccordionGroup [multiExpandable]="true" class="w-full max-w-lg">
      <div scAccordionItem>
        <div scAccordionHeader>
          <button scAccordionTrigger panelId="item-a" [expanded]="true">
            Can I open multiple items?
          </button>
        </div>
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
        <div scAccordionHeader>
          <button scAccordionTrigger panelId="item-b" [expanded]="true">
            How does it work?
          </button>
        </div>
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
        <div scAccordionHeader>
          <button scAccordionTrigger panelId="item-c">
            What about accessibility?
          </button>
        </div>
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
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MultipleAccordionDemo {}
