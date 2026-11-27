import { Component, ViewEncapsulation, computed, signal } from '@angular/core';
import {
  ScBadge,
  ScCard,
  ScCardAction,
  ScCardBody,
  ScCardHeader,
  ScCardTitle,
  ScSelect,
  ScSelectGroup,
  ScSelectIcon,
  ScSelectItem,
  ScSelectItemIndicator,
  ScSelectItemText,
  ScSelectList,
  ScSelectPopup,
  ScSelectPortal,
  ScSelectTrigger,
  ScSelectValue,
} from '@semantic-components/ui';
import {
  ScChart,
  ScChartCategoryAxis,
  type ScChartConfig,
  ScChartCursor,
  ScChartGrid,
  ScChartLegend,
  ScChartLegendIndicator,
  ScChartLegendItem,
  ScChartLine,
  ScChartPlot,
  ScChartTooltip,
  ScChartTooltipIndicator,
  ScChartTooltipItem,
  ScChartTooltipLabel,
  ScChartTooltipName,
  ScChartTooltipPortal,
  ScChartTooltipProvider,
  ScChartTooltipValue,
  ScChartValueAxis,
} from '@semantic-components/ui/charts';
import {
  SiCheckIcon,
  SiChevronDownIcon,
  SiTrendingUpIcon,
} from '@semantic-icons/lucide-icons';
import { SALES, SALES_PERIODS, type SalesPeriod } from '../../data/dashboard';
import { injectFormats } from '../../shared/formats';
import { label } from '../../shared/labels';

/** Sales Overview: new and existing users over a period, as two lines. */
@Component({
  selector: 'app-sales-overview',
  imports: [
    ScBadge,
    ScCard,
    ScCardAction,
    ScCardBody,
    ScCardHeader,
    ScCardTitle,
    ScSelect,
    ScSelectGroup,
    ScSelectIcon,
    ScSelectItem,
    ScSelectItemIndicator,
    ScSelectItemText,
    ScSelectList,
    ScSelectPopup,
    ScSelectPortal,
    ScSelectTrigger,
    ScSelectValue,
    ScChart,
    ScChartCategoryAxis,
    ScChartCursor,
    ScChartGrid,
    ScChartLegend,
    ScChartLegendIndicator,
    ScChartLegendItem,
    ScChartLine,
    ScChartPlot,
    ScChartTooltip,
    ScChartTooltipIndicator,
    ScChartTooltipItem,
    ScChartTooltipLabel,
    ScChartTooltipName,
    ScChartTooltipPortal,
    ScChartTooltipProvider,
    ScChartTooltipValue,
    ScChartValueAxis,
    SiCheckIcon,
    SiChevronDownIcon,
    SiTrendingUpIcon,
  ],
  template: `
    <div scCard class="h-full">
      <div scCardHeader>
        <h2 scCardTitle id="sales-title" class="flex items-center gap-2">
          <svg siTrendingUpIcon></svg>
          <ng-container i18n="@@dashboard.salesOverview.salesOverview"
            >Sales Overview</ng-container
          >
        </h2>
        <div scCardAction>
          <div
            scSelect
            [value]="period()"
            (valueChange)="choose($event)"
            [items]="periods()"
          >
            <div
              i18n-aria-label="@@dashboard.salesOverview.period"
              scSelectTrigger
              size="sm"
              aria-label="Period"
              class="w-36"
            >
              <span scSelectValue></span>
              <svg scSelectIcon siChevronDownIcon></svg>
            </div>
            <ng-template scSelectPortal>
              <div scSelectPopup>
                <div scSelectList>
                  <div scSelectGroup>
                    @for (item of periods(); track item.value) {
                      <div scSelectItem [value]="item.value">
                        <span scSelectItemText>{{ item.label }}</span>
                        <span scSelectItemIndicator
                          ><svg siCheckIcon></svg
                        ></span>
                      </div>
                    }
                  </div>
                </div>
              </div>
            </ng-template>
          </div>
        </div>
      </div>
      <div scCardBody class="flex flex-col gap-4">
        <div class="flex flex-col gap-1">
          <span
            i18n="@@dashboard.salesOverview.totalSales"
            class="text-muted-foreground text-sm"
            >Total Sales</span
          >
          <div
            i18n="@@dashboard.salesOverview.n124500022Vs"
            class="flex flex-wrap items-baseline gap-2"
          >
            <span class="text-2xl font-semibold tabular-nums">{{
              f.money(12450)
            }}</span>
            <span scBadge variant="secondary">{{ f.change(0.22) }}</span>
            <span class="text-muted-foreground text-sm">vs last month</span>
          </div>
        </div>
        <div scChart [config]="config" [data]="data()" class="h-64 w-full">
          <svg
            scChartPlot
            categoryKey="date"
            [attr.aria-label]="t.newAndExistingUsers + period()"
          >
            <g scChartGrid />
            <g scChartCategoryAxis [tickFormatter]="everyOther" />
            <g
              scChartValueAxis
              [domain]="[0, 40]"
              [tickFormatter]="thousands"
            />
            <g scChartCursor />
            <g scChartLine key="newUser" curve="monotone" />
            <g scChartLine key="existingUser" curve="monotone" />
          </svg>
          <div scChartTooltipProvider>
            <ng-template scChartTooltipPortal>
              <div scChartTooltip #tooltip="scChartTooltip">
                <div scChartTooltipLabel>{{ tooltip.label() }}</div>
                @for (item of tooltip.payload(); track item.dataKey) {
                  <div
                    i18n="@@dashboard.salesOverview.k"
                    scChartTooltipItem
                    [item]="item"
                  >
                    <span scChartTooltipIndicator></span>
                    <span scChartTooltipName>{{ item.name }}</span>
                    <span scChartTooltipValue>{{ f.count(item.value) }}k</span>
                  </div>
                }
              </div>
            </ng-template>
          </div>
          <div scChartLegend #legend="scChartLegend">
            @for (item of legend.payload(); track item.dataKey) {
              <div scChartLegendItem [item]="item">
                <span scChartLegendIndicator></span>
                {{ item.name }}
              </div>
            }
          </div>
        </div>
      </div>
    </div>
  `,
  host: { class: 'block' },
  encapsulation: ViewEncapsulation.None,
})
export class SalesOverview {
  /** Figures as the library writes them (the dashboard's choices). */
  private readonly f = injectFormats();

  /** The template's words that sit in bindings, translated. */
  private readonly t = {
    newAndExistingUsers: $localize`:@@dashboard.salesOverview.newAndExistingUsers:New and existing users, `,
  };

  private readonly periods = computed(() =>
    SALES_PERIODS.map((value) => ({ value, label: label(value) })),
  );
  private readonly period = signal<SalesPeriod>('Last 30 Days');
  private readonly data = computed(() =>
    SALES[this.period()].map((point) => ({
      ...point,
      date: this.f.monthDay(point.date),
    })),
  );
  private readonly config: ScChartConfig = {
    newUser: {
      label: $localize`:@@dashboard.salesOverview.newUser:New User`,
      color: 'var(--chart-1)',
    },
    existingUser: {
      label: $localize`:@@dashboard.salesOverview.existingUser:Existing User`,
      color: 'var(--chart-2)',
    },
  };

  /** Half the dates on the axis when there are many. */
  private readonly everyOther = (date: string, index: number) =>
    this.data().length > 10 && index % 3 !== 0 ? '' : date;
  /** Thousands on the axis: 10 → 10K. */
  private readonly thousands = (value: number) => this.f.compact(value * 1000);

  private choose(value: unknown): void {
    if (SALES_PERIODS.includes(value as SalesPeriod))
      this.period.set(value as SalesPeriod);
  }
}
