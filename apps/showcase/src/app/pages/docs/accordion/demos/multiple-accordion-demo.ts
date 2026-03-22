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
} from '@semantic-components/ui';

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
  host: { class: 'flex w-full justify-center' },
  template: `
    <div scAccordionGroup [multiExpandable]="true" class="w-full max-w-lg">
      <div scAccordionItem>
        <div scAccordionHeader>
          <button scAccordionTrigger [panel]="itemA.panel" [expanded]="true">
            Can I open multiple items?
          </button>
        </div>
        <div scAccordionPanel #itemA="scAccordionPanel">
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
          <button scAccordionTrigger [panel]="itemB.panel" [expanded]="true">
            How does it work?
          </button>
        </div>
        <div scAccordionPanel #itemB="scAccordionPanel">
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
          <button scAccordionTrigger [panel]="itemC.panel">
            What about accessibility?
          </button>
        </div>
        <div scAccordionPanel #itemC="scAccordionPanel">
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
