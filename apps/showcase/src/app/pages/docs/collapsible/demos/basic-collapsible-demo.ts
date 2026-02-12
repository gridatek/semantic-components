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
  selector: 'app-basic-collapsible-demo',
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
        <h4 class="text-sm font-semibold">Angular Project Dependencies</h4>
        <button
          sc-collapsible-trigger
          panelId="collapsible-1"
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
      <div class="rounded-md border px-4 py-3 font-mono text-sm">
        &#64;angular/core
      </div>
      <div sc-collapsible-panel panelId="collapsible-1">
        <div sc-collapsible-content class="space-y-2">
          <div class="rounded-md border px-4 py-3 font-mono text-sm">
            &#64;angular/common
          </div>
          <div class="rounded-md border px-4 py-3 font-mono text-sm">
            &#64;angular/forms
          </div>
        </div>
      </div>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BasicCollapsibleDemo {}
