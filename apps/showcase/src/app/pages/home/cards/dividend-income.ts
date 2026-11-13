import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScButton,
  ScCard,
  ScCardAction,
  ScCardBody,
  ScCardDescription,
  ScCardHeader,
  ScCardTitle,
  ScItem,
  ScItemBody,
  ScItemDescription,
  ScItemGroup,
  ScItemTitle,
} from '@semantic-components/ui';
import { SiXIcon } from '@semantic-icons/lucide-icons';

/** Holdings, each with its quarters as small bars. */
@Component({
  selector: 'app-home-dividend-income',
  imports: [
    ScButton,
    ScCard,
    ScCardAction,
    ScCardBody,
    ScCardDescription,
    ScCardHeader,
    ScCardTitle,
    ScItem,
    ScItemBody,
    ScItemDescription,
    ScItemGroup,
    ScItemTitle,
    SiXIcon,
  ],
  template: `
    <div scCard>
      <div scCardHeader>
        <h2 scCardTitle>Q2 Dividend Income</h2>
        <p scCardDescription>
          Quarterly dividend payouts across your portfolio holdings.
        </p>
        <div scCardAction>
          <button scButton variant="ghost" size="icon-sm" class="bg-muted">
            <svg siXIcon></svg>
            <span class="sr-only">Dismiss dividend income</span>
          </button>
        </div>
      </div>
      <div scCardBody>
        <div scItemGroup role="list">
          @for (holding of holdings; track holding.name) {
            <div scItem role="listitem" variant="muted">
              <div scItemBody>
                <div scItemTitle>{{ holding.name }}</div>
                <p scItemDescription>{{ holding.shares }}</p>
              </div>
              <div
                class="hidden h-8 w-24 items-end gap-1 md:flex"
                role="img"
                [attr.aria-label]="holding.name + ' quarterly dividends'"
              >
                @for (q of holding.data; track $index) {
                  <div
                    class="bg-chart-2 min-h-1 flex-1 rounded-t-sm"
                    [style.height.%]="(q / max(holding.data)) * 100"
                  ></div>
                }
              </div>
            </div>
          }
        </div>
      </div>
    </div>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class HomeDividendIncome {
  protected readonly holdings = [
    { name: 'Vanguard', shares: '450 Shares', data: [380, 420, 390, 652] },
    { name: 'S&P 500 VOO', shares: '112 Shares', data: [180, 210, 320, 218] },
    { name: 'Apple AAPL', shares: '85 Shares', data: [60, 70, 120, 90] },
    { name: 'Realty Income', shares: '320 Shares', data: [240, 260, 280, 360] },
  ];

  protected max(values: number[]): number {
    return Math.max(...values);
  }
}
