import { ChangeDetectionStrategy, Component, ViewEncapsulation, input } from '@angular/core';

import { PreviewCodeTabs } from '../../../components/preview-code-tabs/preview-code-tabs';
import { NewAccordionDemo } from './new-accordion-demo';

@Component({
  selector: 'app-new-accordion-demo-section',
  imports: [NewAccordionDemo, PreviewCodeTabs],
  template: `
    <app-preview-code-tabs [code]="code" [title]="title()" [level]="level()">
      <app-new-accordion-demo />
    </app-preview-code-tabs>
  `,
  styles: ``,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NewAccordionDemoSection {
  readonly title = input<string>('');

  readonly level = input<'2' | '3'>('2');

  protected readonly code = `import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

import {
  AccordionGroup,
  AccordionTrigger,
  AccordionPanel,
  AccordionContent,
} from '@angular/aria/accordion';
import { SiChevronDownIcon } from '@semantic-icons/lucide-icons';

@Component({
  selector: 'app-new-accordion-demo',
  imports: [
    AccordionGroup,
    AccordionTrigger,
    AccordionPanel,
    AccordionContent,
    SiChevronDownIcon,
  ],
  template: \`
    <div
      ngAccordionGroup
      [multiExpandable]="false"
      class="w-full divide-y divide-border rounded-md border"
    >
      <!-- FAQ Item 1 -->
      <div>
        <h3 class="flex">
          <button
            ngAccordionTrigger
            panelId="faq1"
            #trigger1="ngAccordionTrigger"
            [expanded]="true"
            class="flex flex-1 items-center justify-between py-4 px-4 text-sm font-medium transition-all hover:underline [&[aria-expanded=true]>svg]:rotate-180"
          >
            Is it accessible?
            <svg
              class="h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200"
              si-chevron-down-icon
            ></svg>
          </button>
        </h3>
        <div ngAccordionPanel panelId="faq1">
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
            ngAccordionTrigger
            panelId="faq2"
            #trigger2="ngAccordionTrigger"
            class="flex flex-1 items-center justify-between py-4 px-4 text-sm font-medium transition-all hover:underline [&[aria-expanded=true]>svg]:rotate-180"
          >
            Does it support keyboard navigation?
            <svg
              class="h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200"
              si-chevron-down-icon
            ></svg>
          </button>
        </h3>
        <div ngAccordionPanel panelId="faq2">
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
            ngAccordionTrigger
            panelId="faq3"
            #trigger3="ngAccordionTrigger"
            class="flex flex-1 items-center justify-between py-4 px-4 text-sm font-medium transition-all hover:underline [&[aria-expanded=true]>svg]:rotate-180"
          >
            Can multiple panels be open at once?
            <svg
              class="h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200"
              si-chevron-down-icon
            ></svg>
          </button>
        </h3>
        <div ngAccordionPanel panelId="faq3">
          <ng-template ngAccordionContent>
            <div class="pb-4 pt-0 px-4 text-sm">
              By default, yes. But this demo has multiExpandable set to false, so only one panel can be open at a time.
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
export class NewAccordionDemo {}`;
}
