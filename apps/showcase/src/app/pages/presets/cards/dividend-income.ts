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
import {
  ScChart,
  ScChartBar,
  type ScChartConfig,
  ScChartPlot,
  ScChartTooltip,
} from '@semantic-components/ui/charts';
import { SiXIcon } from '@semantic-icons/lucide-icons';

/** Holdings, each with its quarters as a small bar chart and its total. */
@Component({
  selector: 'app-preview-dividend-income',
  imports: [
    ScButton,
    ScCard,
    ScCardAction,
    ScCardBody,
    ScCardDescription,
    ScCardHeader,
    ScCardTitle,
    ScChart,
    ScChartBar,
    ScChartPlot,
    ScChartTooltip,
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
            <div scItem variant="muted" role="listitem">
              <div scItemBody>
                <div scItemTitle>{{ holding.name }}</div>
                <p scItemDescription>{{ holding.shares }}</p>
              </div>
              <div
                scChart
                class="hidden h-8 w-24 md:flex"
                [config]="config"
                [data]="holding.data"
              >
                <svg
                  scChartPlot
                  categoryKey="q"
                  [attr.aria-label]="holding.name + ' dividends by quarter'"
                  [margin]="{ top: 0, right: 0, bottom: 0, left: 0 }"
                >
                  <g scChartBar key="value" [radius]="[3, 3, 0, 0]" />
                </svg>
                <div scChartTooltip hideLabel></div>
              </div>
              <span
                class="hidden text-sm font-semibold tabular-nums md:block"
                >{{ holding.amount }}</span
              >
            </div>
          }
        </div>
      </div>
    </div>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class PreviewDividendIncome {
  protected readonly config: ScChartConfig = {
    value: { label: 'Dividend', color: 'var(--chart-2)' },
  };
  protected readonly holdings = [
    {
      name: 'Vanguard VIG',
      shares: '450 Shares',
      amount: '$1,842.10',
      data: this.quarters([380, 420, 390, 652]),
    },
    {
      name: 'S&P 500 VOO',
      shares: '112 Shares',
      amount: '$928.40',
      data: this.quarters([180, 210, 320, 218]),
    },
    {
      name: 'Apple AAPL',
      shares: '85 Shares',
      amount: '$340.00',
      data: this.quarters([60, 70, 120, 90]),
    },
    {
      name: 'Realty Income',
      shares: '320 Shares',
      amount: '$1,139.50',
      data: this.quarters([240, 260, 280, 360]),
    },
  ];

  private quarters(values: number[]): { q: string; value: number }[] {
    return values.map((value, i) => ({ q: 'Q' + (i + 1), value }));
  }
}
