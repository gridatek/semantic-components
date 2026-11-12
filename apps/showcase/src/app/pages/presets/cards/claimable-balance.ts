import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScBadge,
  ScCard,
  ScCardContent,
  ScCardDescription,
  ScCardFooter,
  ScCardHeader,
  ScCardTitle,
  ScItem,
  ScItemBody,
  ScSeparator,
} from '@semantic-components/ui';

/** Nothing to claim yet: the balance, its breakdown, when it pays out. */
@Component({
  selector: 'app-preview-claimable-balance',
  imports: [
    ScBadge,
    ScCard,
    ScCardContent,
    ScCardDescription,
    ScCardFooter,
    ScCardHeader,
    ScCardTitle,
    ScItem,
    ScItemBody,
    ScSeparator,
  ],
  template: `
    <div scCard>
      <div scCardHeader>
        <p scCardDescription>Claimable Balance</p>
        <h2 scCardTitle class="text-5xl tabular-nums">&#36;0.00</h2>
        <span scBadge variant="outline" class="w-fit">
          <span class="size-2 rounded-full bg-yellow-500"></span>
          Pending Setup
        </span>
      </div>
      <div scCardContent class="flex flex-1 flex-col justify-end">
        <div scItem variant="muted" class="flex-col items-stretch">
          <div scItemBody class="gap-3">
            <div class="flex items-center justify-between">
              <span class="text-muted-foreground text-sm">Net Royalties</span>
              <span class="text-sm font-medium tabular-nums">&#36;0.00</span>
            </div>
            <div class="flex items-center justify-between">
              <span class="text-muted-foreground text-sm">Processing Fee</span>
              <span class="text-sm font-medium tabular-nums">-&#36;0.00</span>
            </div>
            <div scSeparator aria-hidden="true"></div>
            <div class="flex items-center justify-between">
              <span class="text-muted-foreground text-sm">
                Total Ready to Claim
              </span>
              <span class="text-sm font-semibold tabular-nums">
                &#36;0.00 USD
              </span>
            </div>
          </div>
        </div>
      </div>
      <div scCardFooter>
        <p scCardDescription>
          Once your bank is connected, balances over $10.00 are automatically
          eligible for monthly distribution on the 15th of each month.
        </p>
      </div>
    </div>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class PreviewClaimableBalance {}
