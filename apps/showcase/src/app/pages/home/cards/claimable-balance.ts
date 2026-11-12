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

/** A balance, its pending state, and how it adds up. */
@Component({
  selector: 'app-home-claimable-balance',
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
        <h2 scCardTitle class="text-4xl tabular-nums">
          &#36;{{ format(total) }}
        </h2>
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
              <span class="text-sm font-medium tabular-nums"
                >&#36;{{ format(net) }}</span
              >
            </div>
            <div class="flex items-center justify-between">
              <span class="text-muted-foreground text-sm">Processing Fee</span>
              <span class="text-sm font-medium tabular-nums"
                >-&#36;{{ format(fee) }}</span
              >
            </div>
            <div scSeparator aria-hidden="true"></div>
            <div class="flex items-center justify-between">
              <span class="text-muted-foreground text-sm"
                >Total Ready to Claim</span
              >
              <span class="text-sm font-semibold tabular-nums"
                >&#36;{{ format(total) }} USD</span
              >
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
export class HomeClaimableBalance {
  protected readonly net = 1248.75;
  protected readonly fee = 37.46;
  protected readonly total = this.net - this.fee;
  private readonly money = new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  protected format(amount: number): string {
    return this.money.format(amount);
  }
}
