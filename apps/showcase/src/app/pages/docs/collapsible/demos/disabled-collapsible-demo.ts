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
  selector: 'app-disabled-collapsible-demo',
  imports: [
    ScCollapsible,
    ScCollapsibleContent,
    ScCollapsiblePanel,
    ScCollapsibleTrigger,
    SiChevronDownIcon,
  ],
  template: `
    <div sc-collapsible [disabled]="true" class="w-[350px] space-y-2">
      <div class="flex items-center justify-between space-x-4 px-4">
        <h4 class="text-sm font-semibold text-muted-foreground">
          Disabled Collapsible
        </h4>
        <button
          sc-collapsible-trigger
          panelId="collapsible-disabled"
          [disabled]="true"
          class="inline-flex h-9 w-9 cursor-pointer items-center justify-center rounded-md border border-input bg-background text-sm font-medium shadow-xs transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
        >
          <svg si-chevron-down-icon class="size-4"></svg>
          <span class="sr-only">Toggle</span>
        </button>
      </div>
      <div sc-collapsible-panel panelId="collapsible-disabled">
        <div sc-collapsible-content>
          <div class="rounded-md border px-4 py-3 text-sm">
            This content is hidden.
          </div>
        </div>
      </div>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DisabledCollapsibleDemo {}
