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
  selector: 'app-disabled-collapsible-demo',
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
    <div scCollapsible [disabled]="true" class="w-[350px] space-y-2">
      <div class="flex items-center justify-between space-x-4 px-4">
        <h4 class="text-muted-foreground text-sm font-semibold">
          Disabled Collapsible
        </h4>
        <button
          scButton
          scCollapsibleTrigger
          [panel]="colPanel.panel"
          [disabled]="true"
          variant="outline"
          size="icon"
        >
          <svg siChevronDownIcon></svg>
          <span class="sr-only">Toggle</span>
        </button>
      </div>
      <div scCollapsiblePanel #colPanel="scCollapsiblePanel">
        <ng-template scCollapsibleContent>
          <div scCollapsibleBody>
            <div class="rounded-md border px-4 py-3 text-sm">
              This content is hidden.
            </div>
          </div>
        </ng-template>
      </div>
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class DisabledCollapsibleDemo {}
