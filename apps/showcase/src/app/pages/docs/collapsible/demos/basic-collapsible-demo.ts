import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScButton,
  ScCollapsible,
  ScCollapsibleBody,
  ScCollapsibleContent,
  ScCollapsiblePanel,
  ScCollapsibleTrigger,
} from '@semantic-components/ui';
import { SiChevronDownIcon } from '@semantic-icons/lucide-icons';

@Component({
  selector: 'app-basic-collapsible-demo',
  imports: [
    ScButton,
    ScCollapsible,
    ScCollapsibleBody,
    ScCollapsibleContent,
    ScCollapsiblePanel,
    ScCollapsibleTrigger,
    SiChevronDownIcon,
  ],
  template: `
    <div scCollapsible class="w-[350px] space-y-2">
      <div class="flex items-center justify-between space-x-4 px-4">
        <h4 class="text-sm font-semibold">Angular Project Dependencies</h4>
        <button
          scButton
          scCollapsibleTrigger
          [panel]="colPanel.panel"
          #trigger="scCollapsibleTrigger"
          variant="outline"
          size="icon"
        >
          <svg
            siChevronDownIcon
            class="transition-transform duration-200"
            [class.rotate-180]="trigger.expanded()"
          ></svg>
          <span class="sr-only">Toggle</span>
        </button>
      </div>
      <div class="rounded-md border px-4 py-3 font-mono text-sm">
        &#64;angular/core
      </div>
      <div scCollapsiblePanel #colPanel="scCollapsiblePanel">
        <ng-template scCollapsibleContent>
          <div scCollapsibleBody class="space-y-2">
            <div class="rounded-md border px-4 py-3 font-mono text-sm">
              &#64;angular/common
            </div>
            <div class="rounded-md border px-4 py-3 font-mono text-sm">
              &#64;angular/forms
            </div>
          </div>
        </ng-template>
      </div>
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class BasicCollapsibleDemo {}
