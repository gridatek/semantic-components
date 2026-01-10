import { ChangeDetectionStrategy, Component, ViewEncapsulation, input } from '@angular/core';

import { PreviewCodeTabs } from '../../../components/preview-code-tabs/preview-code-tabs';
import { AccordionMultiDemo } from './accordion-multi-demo';

@Component({
  selector: 'app-accordion-multi-demo-section',
  imports: [AccordionMultiDemo, PreviewCodeTabs],
  template: `
    <app-preview-code-tabs [code]="code" [title]="title()" [level]="level()">
      <app-accordion-multi-demo />
    </app-preview-code-tabs>
  `,
  styles: ``,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AccordionMultiDemoSection {
  readonly title = input<string>('');

  readonly level = input<'2' | '3'>('2');

  protected readonly code = `import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

import {
  ScAccordionAnimatedContent,
  ScAccordionContent,
  ScAccordionGroup,
  ScAccordionPanel,
  ScAccordionTrigger,
} from '@semantic-components/ui';
import { SiChevronDownIcon } from '@semantic-icons/lucide-icons';

@Component({
  selector: 'app-accordion-multi-demo',
  imports: [
    ScAccordionGroup,
    ScAccordionTrigger,
    ScAccordionPanel,
    ScAccordionContent,
    ScAccordionAnimatedContent,
    SiChevronDownIcon,
  ],
  template: \`
    <div [multiExpandable]="true" scAccordionGroup>
      <!-- FAQ Item 1 -->
      <div>
        <h3 class="flex">
          <button [expanded]="true" scAccordionTrigger panelId="multi-faq1">
            Is it accessible?
            <svg
              class="h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200"
              si-chevron-down-icon
            ></svg>
          </button>
        </h3>
        <div scAccordionPanel panelId="multi-faq1">
          <ng-template scAccordionContent>
            <div scAccordionAnimatedContent>
              Yes. It adheres to the WAI-ARIA design pattern.
            </div>
          </ng-template>
        </div>
      </div>

      <!-- FAQ Item 2 -->
      <div>
        <h3 class="flex">
          <button [expanded]="true" scAccordionTrigger panelId="multi-faq2">
            Does it support keyboard navigation?
            <svg
              class="h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200"
              si-chevron-down-icon
            ></svg>
          </button>
        </h3>
        <div scAccordionPanel panelId="multi-faq2">
          <ng-template scAccordionContent>
            <div scAccordionAnimatedContent>
              Yes. It supports arrow keys, Home, and End for navigation between accordion triggers.
            </div>
          </ng-template>
        </div>
      </div>

      <!-- FAQ Item 3 -->
      <div>
        <h3 class="flex">
          <button scAccordionTrigger panelId="multi-faq3">
            Can multiple panels be open at once?
            <svg
              class="h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200"
              si-chevron-down-icon
            ></svg>
          </button>
        </h3>
        <div scAccordionPanel panelId="multi-faq3">
          <ng-template scAccordionContent>
            <div scAccordionAnimatedContent>
              Yes! This demo has multiExpandable set to true, so you can open multiple panels
              simultaneously.
            </div>
          </ng-template>
        </div>
      </div>
    </div>
  \`,
  host: {
    class: 'block w-80',
  },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AccordionMultiDemo {}`;
}
