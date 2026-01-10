import { ChangeDetectionStrategy, Component, ViewEncapsulation, input } from '@angular/core';

import { PreviewCodeTabs } from '../../../components/preview-code-tabs/preview-code-tabs';
import { NewAccordionMultiDemo } from './new-accordion-multi-demo';

@Component({
  selector: 'app-new-accordion-multi-demo-section',
  imports: [NewAccordionMultiDemo, PreviewCodeTabs],
  template: `
    <app-preview-code-tabs [code]="code" [title]="title()" [level]="level()">
      <app-new-accordion-multi-demo />
    </app-preview-code-tabs>
  `,
  styles: ``,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NewAccordionMultiDemoSection {
  readonly title = input<string>('');

  readonly level = input<'2' | '3'>('2');

  protected readonly code = `import {
  AccordionContent,
  AccordionGroup,
  AccordionPanel,
  AccordionTrigger,
} from '@angular/aria/accordion';
import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

import { SiChevronDownIcon } from '@semantic-icons/lucide-icons';

@Component({
  selector: 'app-new-accordion-multi-demo',
  imports: [AccordionGroup, AccordionTrigger, AccordionPanel, AccordionContent, SiChevronDownIcon],
  template: \`
    <div
      class="w-full divide-y divide-border rounded-md border"
      [multiExpandable]="true"
      ngAccordionGroup
    >
      <!-- FAQ Item 1 -->
      <div>
        <h3 class="flex">
          <button
            class="flex flex-1 items-center justify-between py-4 px-4 text-sm font-medium transition-all hover:underline [&[aria-expanded=true]>svg]:rotate-180"
            #trigger1="ngAccordionTrigger"
            [expanded]="true"
            ngAccordionTrigger
            panelId="multi-faq1"
          >
            Is it accessible?
            <svg
              class="h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200"
              si-chevron-down-icon
            ></svg>
          </button>
        </h3>
        <div ngAccordionPanel panelId="multi-faq1">
          <ng-template ngAccordionContent>
            <div class="pb-4 pt-0 px-4 text-sm">
              Yes. It adheres to the WAI-ARIA design pattern.
            </div>
          </ng-template>
        </div>
      </div>

      <!-- FAQ Item 2 -->
      <div>
        <h3 class="flex">
          <button
            class="flex flex-1 items-center justify-between py-4 px-4 text-sm font-medium transition-all hover:underline [&[aria-expanded=true]>svg]:rotate-180"
            #trigger2="ngAccordionTrigger"
            [expanded]="true"
            ngAccordionTrigger
            panelId="multi-faq2"
          >
            Does it support keyboard navigation?
            <svg
              class="h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200"
              si-chevron-down-icon
            ></svg>
          </button>
        </h3>
        <div ngAccordionPanel panelId="multi-faq2">
          <ng-template ngAccordionContent>
            <div class="pb-4 pt-0 px-4 text-sm">
              Yes. It supports arrow keys, Home, and End for navigation between accordion triggers.
            </div>
          </ng-template>
        </div>
      </div>

      <!-- FAQ Item 3 -->
      <div>
        <h3 class="flex">
          <button
            class="flex flex-1 items-center justify-between py-4 px-4 text-sm font-medium transition-all hover:underline [&[aria-expanded=true]>svg]:rotate-180"
            #trigger3="ngAccordionTrigger"
            ngAccordionTrigger
            panelId="multi-faq3"
          >
            Can multiple panels be open at once?
            <svg
              class="h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200"
              si-chevron-down-icon
            ></svg>
          </button>
        </h3>
        <div ngAccordionPanel panelId="multi-faq3">
          <ng-template ngAccordionContent>
            <div class="pb-4 pt-0 px-4 text-sm">
              Yes! This demo has multiExpandable set to true, so you can open multiple panels simultaneously.
            </div>
          </ng-template>
        </div>
      </div>
    </div>
  \`,
  styles: \`\`,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NewAccordionMultiDemo {}`;
}
