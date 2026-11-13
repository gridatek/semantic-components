import { Component, ViewEncapsulation, signal } from '@angular/core';
import {
  ScBadge,
  ScCard,
  ScCardBody,
  ScCardHeader,
  ScFrame,
  ScInput,
  ScInputGroup,
  ScInputGroupAddon,
  ScItem,
  ScItemBody,
  ScItemDescription,
  ScItemGroup,
  ScItemMedia,
  ScItemTitle,
  ScToggleGroup,
  ScToggleGroupItem,
} from '@semantic-components/ui';
import { SiSearchIcon } from '@semantic-icons/lucide-icons';

/** Holdings: a search, a filter, and each holding as an item. */
@Component({
  selector: 'app-preview-release-catalog',
  imports: [
    ScFrame,
    ScBadge,
    ScCard,
    ScCardBody,
    ScCardHeader,
    ScInput,
    ScInputGroup,
    ScInputGroupAddon,
    ScItem,
    ScItemBody,
    ScItemDescription,
    ScItemGroup,
    ScItemMedia,
    ScItemTitle,
    ScToggleGroup,
    ScToggleGroupItem,
    SiSearchIcon,
  ],
  template: `
    <div scCard>
      <div scCardHeader>
        <div class="flex items-center justify-between gap-3">
          <div scInputGroup class="max-w-sm">
            <input
              scInput
              type="search"
              placeholder="Search holdings or tickers..."
              aria-label="Search holdings or tickers"
            />
            <div scInputGroupAddon>
              <svg siSearchIcon></svg>
            </div>
          </div>
          <div
            scToggleGroup
            variant="outline"
            [spacing]="1"
            aria-label="Holding type"
            [(value)]="type"
          >
            <button scToggleGroupItem value="stocks">Stocks</button>
            <button scToggleGroupItem value="etfs">ETFs</button>
            <button scToggleGroupItem value="reits">REITs</button>
          </div>
        </div>
      </div>
      <div scCardBody>
        <div scItemGroup role="list">
          @for (holding of holdings; track holding.ticker) {
            <div scItem variant="muted" role="listitem">
              <div scItemMedia>
                <div
                  scFrame
                  size="sm"
                  class="flex size-12 items-center justify-center text-sm font-semibold"
                >
                  {{ holding.ticker }}
                </div>
              </div>
              <div scItemBody>
                <div scItemTitle>{{ holding.name }}</div>
                <p scItemDescription class="text-xs tracking-wider uppercase">
                  {{ holding.shares }} Shares · {{ holding.added }}
                </p>
              </div>
              <div class="flex shrink-0 items-center gap-6">
                <span scBadge variant="outline">{{ holding.type }}</span>
                <div class="flex flex-col items-end gap-0.5">
                  <span
                    class="text-muted-foreground text-xs tracking-wider uppercase"
                  >
                    Value
                  </span>
                  <span class="font-medium tabular-nums">
                    {{ holding.value }}
                  </span>
                </div>
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
export class PreviewReleaseCatalog {
  protected readonly type = signal(['etfs']);

  protected readonly holdings = [
    {
      ticker: 'VOO',
      name: 'Vanguard S&P 500 ETF',
      type: 'ETF',
      added: 'Jan 2021',
      shares: '112',
      value: '$48,230.40',
    },
    {
      ticker: 'VIG',
      name: 'Vanguard Dividend Appreciation',
      type: 'ETF',
      added: 'Mar 2022',
      shares: '450',
      value: '$26,033.79',
    },
    {
      ticker: 'AAPL',
      name: 'Apple Inc.',
      type: 'Stock',
      added: 'Nov 2020',
      shares: '85',
      value: '$18,488.90',
    },
    {
      ticker: 'O',
      name: 'Realty Income Corp',
      type: 'REIT',
      added: 'Jun 2023',
      shares: '320',
      value: '$15,136.59',
    },
  ];
}
