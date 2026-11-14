import { DecimalPipe } from '@angular/common';
import { Component, ViewEncapsulation, computed, signal } from '@angular/core';
import { FormField, form } from '@angular/forms/signals';
import {
  ScCard,
  ScCardBody,
  ScCardDescription,
  ScCardHeader,
  ScCardTitle,
  ScCombobox,
  ScComboboxEmpty,
  ScComboboxInput,
  ScComboboxItem,
  ScComboboxItemIndicator,
  ScComboboxList,
  ScComboboxPopup,
  ScComboboxPortal,
  ScField,
  ScFieldGroup,
  ScInput,
  ScInputGroup,
  ScLabel,
  ScSeparator,
  scComboboxMatches,
} from '@semantic-components/ui';
import {
  ScChart,
  ScChartArea,
  type ScChartConfig,
  ScChartGrid,
  ScChartPlot,
  ScChartTooltip,
  ScChartTooltipIndicator,
  ScChartTooltipItem,
  ScChartTooltipName,
  ScChartTooltipPortal,
  ScChartTooltipProvider,
  ScChartTooltipValue,
} from '@semantic-components/ui/charts';
import { SiCheckIcon } from '@semantic-icons/lucide-icons';

const TICKERS = ['VOO', 'VIG', 'AAPL', 'MSFT', 'GOOGL', 'AMZN', 'TSLA'];

const PRICES: Record<string, number[]> = {
  VOO: [412, 438, 395, 450, 420, 462],
  AAPL: [185, 210, 172, 198, 178, 215],
};
const DEFAULT_PRICES = [100, 118, 95, 125, 108, 130];
const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];

/** A ticker to pick (a combobox), and its six months as an area. */
@Component({
  selector: 'app-preview-stock-performance',
  imports: [
    FormField,
    ScCard,
    ScCardBody,
    ScCardDescription,
    ScCardHeader,
    ScCardTitle,
    ScChart,
    ScChartArea,
    ScChartGrid,
    ScChartPlot,
    ScChartTooltip,
    ScChartTooltipPortal,
    ScChartTooltipProvider,
    DecimalPipe,
    ScChartTooltipIndicator,
    ScChartTooltipItem,
    ScChartTooltipName,
    ScChartTooltipValue,
    ScCombobox,
    ScComboboxEmpty,
    ScComboboxInput,
    ScComboboxItem,
    ScComboboxItemIndicator,
    ScComboboxList,
    ScComboboxPopup,
    ScComboboxPortal,
    ScField,
    ScFieldGroup,
    ScInput,
    ScInputGroup,
    ScLabel,
    ScSeparator,
    SiCheckIcon,
  ],
  template: `
    <div scCard>
      <div scCardHeader>
        <h2 scCardTitle>Stock Performance</h2>
        <p scCardDescription>6-month price history.</p>
      </div>
      <div scCardBody class="flex flex-col gap-4">
        <div scFieldGroup>
          <div scField>
            <label scLabel for="preview-ticker">Ticker</label>
            <div scCombobox #cb="scCombobox" [formField]="stock.ticker">
              <div scInputGroup>
                <input
                  id="preview-ticker"
                  scInput
                  scComboboxInput
                  placeholder="Search ticker..."
                />
              </div>
              <ng-template scComboboxPortal>
                <div scComboboxPopup>
                  <div scComboboxEmpty>No tickers found.</div>
                  <div scComboboxList aria-label="Tickers">
                    @for (item of matching(cb.query()); track item) {
                      <div scComboboxItem [value]="item">
                        {{ item }}
                        <span scComboboxItemIndicator>
                          <svg siCheckIcon></svg>
                        </span>
                      </div>
                    }
                  </div>
                </div>
              </ng-template>
            </div>
          </div>
        </div>
        <div scSeparator aria-hidden="true"></div>
        <div scChart class="h-[200px] w-full" [config]="config" [data]="data()">
          <svg
            scChartPlot
            categoryKey="month"
            [attr.aria-label]="
              stock.ticker().value() + ' price, January to June'
            "
            [margin]="{ left: 0, right: 0, top: 8, bottom: 0 }"
          >
            <defs>
              <linearGradient
                id="preview-fill-price"
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >
                <stop
                  offset="0%"
                  stop-color="var(--color-price)"
                  stop-opacity="0.3"
                />
                <stop
                  offset="100%"
                  stop-color="var(--color-price)"
                  stop-opacity="0.05"
                />
              </linearGradient>
            </defs>
            <g scChartGrid class="[&_line]:[stroke-dasharray:3_3]" />
            <g
              scChartArea
              key="price"
              curve="monotone"
              fill="url(#preview-fill-price)"
              [fillOpacity]="1"
            />
          </svg>
          <div scChartTooltipProvider>
            <ng-template scChartTooltipPortal>
              <div scChartTooltip #tooltip="scChartTooltip">
                @for (item of tooltip.payload(); track item.dataKey) {
                  <div scChartTooltipItem [item]="item">
                    <span scChartTooltipIndicator></span>
                    <span scChartTooltipName>{{ item.name }}</span>
                    <span scChartTooltipValue>{{ item.value | number }}</span>
                  </div>
                }
              </div>
            </ng-template>
          </div>
        </div>
      </div>
    </div>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class PreviewStockPerformance {
  protected readonly stock = form(signal({ ticker: 'VOO' }));
  protected readonly config: ScChartConfig = {
    price: { label: 'Price', color: 'var(--chart-1)' },
  };
  protected readonly data = computed(() =>
    (PRICES[this.stock.ticker().value()] ?? DEFAULT_PRICES).map((price, i) => ({
      month: MONTHS[i],
      price,
    })),
  );

  protected matching(query: string): string[] {
    return TICKERS.filter((ticker) => scComboboxMatches(ticker, query));
  }
}
