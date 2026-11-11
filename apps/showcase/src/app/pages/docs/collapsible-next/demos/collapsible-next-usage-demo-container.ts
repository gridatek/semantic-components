import { Component, ViewEncapsulation } from '@angular/core';
import { UsageCode } from '../../../../components/usage-code/usage-code';
import { CollapsibleNextUsageDemo } from './collapsible-next-usage-demo';

@Component({
  selector: 'app-collapsible-next-usage-demo-container',
  imports: [UsageCode, CollapsibleNextUsageDemo],
  template: `
    <app-usage-code [code]="code">
      <ng-template><app-collapsible-next-usage-demo /></ng-template>
    </app-usage-code>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class CollapsibleNextUsageDemoContainer {
  readonly code = `import { Component, ViewEncapsulation, signal } from '@angular/core';
import {
  ScButton,
  ScCollapsibleNext,
  ScCollapsibleNextPanel,
  ScCollapsibleNextTrigger,
  ScFrame,
} from '@semantic-components/ui';
import { SiChevronsUpDownIcon } from '@semantic-icons/lucide-icons';

/** A trigger that shows and hides a panel: the order and its details. */
@Component({
  selector: 'app-collapsible-next-usage-demo',
  imports: [
    ScButton,
    ScCollapsibleNext,
    ScCollapsibleNextPanel,
    ScCollapsibleNextTrigger,
    ScFrame,
    SiChevronsUpDownIcon,
  ],
  template: \`
    <div
      scCollapsibleNext
      [(open)]="open"
      class="flex w-[350px] flex-col gap-2"
    >
      <div class="flex items-center justify-between gap-4 ps-4">
        <h3 class="text-sm font-semibold">Order #4189</h3>
        <button
          scButton
          scCollapsibleNextTrigger
          variant="ghost"
          size="icon-sm"
        >
          <svg siChevronsUpDownIcon></svg>
          <span class="sr-only">Toggle details</span>
        </button>
      </div>
      <div scFrame class="flex items-center justify-between px-4 py-2 text-sm">
        <span class="text-muted-foreground">Status</span>
        <span class="font-medium">Shipped</span>
      </div>
      <div scCollapsibleNextPanel class="-m-px flex flex-col gap-2 p-px">
        <div scFrame class="px-4 py-2 text-sm">
          <p class="font-medium">Shipping address</p>
          <p class="text-muted-foreground">100 Market St, San Francisco</p>
        </div>
        <div scFrame class="px-4 py-2 text-sm">
          <p class="font-medium">Items</p>
          <p class="text-muted-foreground">2x Studio Headphones</p>
        </div>
      </div>
    </div>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class CollapsibleNextUsageDemo {
  protected readonly open = signal(false);
}`;
}
