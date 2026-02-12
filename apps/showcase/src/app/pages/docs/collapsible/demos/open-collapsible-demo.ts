import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import {
  ScCollapsible,
  ScCollapsibleContent,
  ScCollapsiblePanel,
  ScCollapsibleTrigger,
} from '@semantic-components/ui-lab';
import { SiChevronDownIcon } from '@semantic-icons/lucide-icons';

@Component({
  selector: 'app-open-collapsible-demo',
  imports: [
    ScCollapsible,
    ScCollapsibleContent,
    ScCollapsiblePanel,
    ScCollapsibleTrigger,
    SiChevronDownIcon,
  ],
  template: `
    <div sc-collapsible class="w-[350px] space-y-2">
      <div class="flex items-center justify-between space-x-4 px-4">
        <h4 class="text-sm font-semibold">Initially Open</h4>
        <button
          sc-collapsible-trigger
          panelId="collapsible-open"
          [expanded]="true"
          #trigger="scCollapsibleTrigger"
          class="inline-flex h-9 w-9 cursor-pointer items-center justify-center rounded-md border border-input bg-background text-sm font-medium shadow-xs transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        >
          <svg
            si-chevron-down-icon
            class="size-4 transition-transform duration-200"
            [class.rotate-180]="trigger.expanded()"
          ></svg>
          <span class="sr-only">Toggle</span>
        </button>
      </div>
      <div sc-collapsible-panel panelId="collapsible-open">
        <div sc-collapsible-content>
          <div class="rounded-md border px-4 py-3 text-sm">
            This collapsible is open by default. You can toggle it closed by
            clicking the button.
          </div>
        </div>
      </div>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OpenCollapsibleDemo {}
