import { NgOptimizedImage, PercentPipe } from '@angular/common';
import { Component, ViewEncapsulation } from '@angular/core';
import { RouterLink } from '@angular/router';
import {
  ScAvatar,
  ScAvatarFallback,
  ScAvatarImage,
  ScBadge,
  ScCard,
  ScCardAction,
  ScCardBody,
  ScCardDescription,
  ScCardFooter,
  ScCardHeader,
  ScCardTitle,
  ScItem,
  ScItemBody,
  ScItemDescription,
  ScItemGroup,
  ScItemMedia,
  ScItemTitle,
  ScLink,
  ScProgress,
  ScProgressCircle,
  ScProgressValueText,
  ScStatCard,
  ScStatCardChange,
  ScStatCardDescription,
  ScStatCardIcon,
  ScStatCardLabel,
  ScStatCardValue,
  ScTable,
  ScTableBody,
  ScTableCell,
  ScTableContainer,
  ScTableHeader,
  ScTableHeaderCell,
  ScTableRow,
} from '@semantic-components/ui';
import {
  ScChart,
  ScChartBar,
  ScChartCategoryAxis,
  type ScChartConfig,
  ScChartCursor,
  ScChartGrid,
  ScChartPlot,
  ScChartValueAxis,
} from '@semantic-components/ui/charts';
import {
  SiDollarSignIcon,
  SiPercentIcon,
  SiShoppingCartIcon,
  SiTrendingDownIcon,
  SiTrendingUpIcon,
  SiUsersIcon,
} from '@semantic-icons/lucide-icons';
import { ORDERS } from '../../data/orders';
import { personById } from '../../data/people';
import { PRODUCTS, thumbOf } from '../../data/products';
import { PageHeader } from '../../layout/page-header';
import { ChartLegend, ChartTooltip } from '../../shared/chart-parts';
import {
  axisLabel,
  compactMoney,
  day,
  initials,
  money,
} from '../../shared/format';
import { label } from '../../shared/labels';
import { orderBadge } from '../../shared/status';

const REVENUE = [
  { month: 'Jan', thisYear: 18400, lastYear: 14200 },
  { month: 'Feb', thisYear: 21300, lastYear: 15800 },
  { month: 'Mar', thisYear: 24900, lastYear: 19100 },
  { month: 'Apr', thisYear: 22700, lastYear: 20400 },
  { month: 'May', thisYear: 28100, lastYear: 21900 },
  { month: 'Jun', thisYear: 31600, lastYear: 23300 },
];

/** eCommerce (Pro): revenue, the best sellers, the latest orders. */
@Component({
  selector: 'app-ecommerce-page',
  imports: [
    NgOptimizedImage,
    PercentPipe,
    RouterLink,
    ScAvatar,
    ScAvatarFallback,
    ScAvatarImage,
    ScBadge,
    ScCard,
    ScCardAction,
    ScCardBody,
    ScCardDescription,
    ScCardFooter,
    ScCardHeader,
    ScCardTitle,
    ScItem,
    ScItemBody,
    ScItemDescription,
    ScItemGroup,
    ScItemMedia,
    ScItemTitle,
    ScLink,
    ScProgress,
    ScProgressCircle,
    ScProgressValueText,
    ScStatCard,
    ScStatCardChange,
    ScStatCardDescription,
    ScStatCardIcon,
    ScStatCardLabel,
    ScStatCardValue,
    ScTable,
    ScTableBody,
    ScTableCell,
    ScTableContainer,
    ScTableHeader,
    ScTableHeaderCell,
    ScTableRow,
    ScChart,
    ScChartBar,
    ScChartCategoryAxis,
    ScChartCursor,
    ScChartGrid,
    ScChartPlot,
    ScChartValueAxis,
    SiDollarSignIcon,
    SiPercentIcon,
    SiShoppingCartIcon,
    SiTrendingDownIcon,
    SiTrendingUpIcon,
    SiUsersIcon,
    PageHeader,
    ChartLegend,
    ChartTooltip,
  ],
  template: `
    <app-page-header
      i18n-title
      title="eCommerce"
      [trail]="[{ label: t.dashboards }, { label: 'eCommerce' }]"
    />

    <div class="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      <dl scStatCard>
        <dt scStatCardLabel>
          <ng-container i18n>Revenue</ng-container>
          <svg siDollarSignIcon scStatCardIcon></svg>
        </dt>
        <dd
          scStatCardValue
          [value]="147000"
          [format]="{ style: 'currency', currency: 'USD', notation: 'compact' }"
        ></dd>
        <dd
          scStatCardChange
          [value]="0.186"
          [format]="{ style: 'percent', maximumFractionDigits: 1 }"
        >
          <svg siTrendingUpIcon></svg>
        </dd>
        <dd i18n scStatCardDescription>from last half</dd>
      </dl>
      <dl scStatCard>
        <dt scStatCardLabel>
          <ng-container i18n>Orders</ng-container>
          <svg siShoppingCartIcon scStatCardIcon></svg>
        </dt>
        <dd scStatCardValue [value]="2384"></dd>
        <dd
          scStatCardChange
          [value]="0.092"
          [format]="{ style: 'percent', maximumFractionDigits: 1 }"
        >
          <svg siTrendingUpIcon></svg>
        </dd>
        <dd i18n scStatCardDescription>from last half</dd>
      </dl>
      <dl scStatCard>
        <dt scStatCardLabel>
          <ng-container i18n>Customers</ng-container>
          <svg siUsersIcon scStatCardIcon></svg>
        </dt>
        <dd scStatCardValue [value]="1126"></dd>
        <dd
          scStatCardChange
          [value]="0.041"
          [format]="{ style: 'percent', maximumFractionDigits: 1 }"
        >
          <svg siTrendingUpIcon></svg>
        </dd>
        <dd i18n scStatCardDescription>from last half</dd>
      </dl>
      <dl scStatCard>
        <dt scStatCardLabel>
          <ng-container i18n>Conversion</ng-container>
          <svg siPercentIcon scStatCardIcon></svg>
        </dt>
        <dd
          scStatCardValue
          [value]="0.032"
          [format]="{ style: 'percent', maximumFractionDigits: 1 }"
        ></dd>
        <dd
          scStatCardChange
          [value]="-0.004"
          [format]="{ style: 'percent', maximumFractionDigits: 1 }"
        >
          <svg siTrendingDownIcon></svg>
        </dd>
        <dd i18n scStatCardDescription>from last half</dd>
      </dl>
    </div>

    <div class="grid gap-4 xl:grid-cols-3">
      <div scCard class="xl:col-span-2">
        <div scCardHeader>
          <h2 i18n scCardTitle>Revenue</h2>
          <p i18n scCardDescription>This year against last, by month</p>
        </div>
        <div scCardBody>
          <div
            scChart
            [config]="revenueConfig"
            [data]="revenue"
            class="h-72 w-full"
          >
            <svg
              i18n-aria-label
              scChartPlot
              categoryKey="month"
              aria-label="Revenue by month, this year and last"
            >
              <g scChartGrid />
              <g scChartCategoryAxis />
              <g scChartValueAxis [tickFormatter]="short" />
              <g scChartCursor />
              <g scChartBar key="lastYear" />
              <g scChartBar key="thisYear" />
            </svg>
            <app-chart-tooltip [format]="moneyOf" indicator="dashed" />
            <app-chart-legend />
          </div>
        </div>
      </div>

      <div scCard>
        <div scCardHeader>
          <h2 i18n scCardTitle>Yearly goal</h2>
          <p i18n scCardDescription>$147K of $204K</p>
        </div>
        <div scCardBody class="flex flex-col items-center gap-4">
          <div
            i18n-aria-label
            scProgress
            [value]="72"
            aria-label="Yearly goal"
            class="size-40"
          >
            <svg scProgressCircle [thickness]="6"></svg>
            <span scProgressValueText class="text-2xl font-semibold">{{
              0.72 | percent
            }}</span>
          </div>
          <p i18n class="text-muted-foreground text-center text-sm">
            $57K to go — at this pace, reached in October.
          </p>
        </div>
      </div>
    </div>

    <div class="grid gap-4 xl:grid-cols-3">
      <div scCard class="xl:col-span-2">
        <div scCardHeader>
          <h2 i18n scCardTitle>Recent orders</h2>
          <div i18n scCardAction>
            <a scLink routerLink="/apps/orders" class="text-sm">View all</a>
          </div>
        </div>
        <div scCardBody>
          <div scTableContainer>
            <table scTable>
              <thead scTableHeader>
                <tr scTableRow>
                  <th i18n scTableHeaderCell>Order</th>
                  <th i18n scTableHeaderCell>Customer</th>
                  <th i18n scTableHeaderCell>Product</th>
                  <th i18n scTableHeaderCell>Date</th>
                  <th i18n scTableHeaderCell class="text-end">Total</th>
                  <th i18n scTableHeaderCell>Status</th>
                </tr>
              </thead>
              <tbody scTableBody>
                @for (order of orders; track order.id) {
                  <tr scTableRow>
                    <td scTableCell class="font-medium">{{ order.id }}</td>
                    <td scTableCell>
                      <div class="flex items-center gap-2">
                        <span scAvatar class="size-7">
                          <img
                            scAvatarImage
                            [src]="order.customer.avatar"
                            alt=""
                          />
                          <span scAvatarFallback>{{
                            initialsOf(order.customer.name)
                          }}</span>
                        </span>
                        {{ order.customer.name }}
                      </div>
                    </td>
                    <td scTableCell>{{ order.product }}</td>
                    <td scTableCell>{{ dayOf(order.date) }}</td>
                    <td scTableCell class="text-end tabular-nums">
                      {{ moneyOf(order.total) }}
                    </td>
                    <td scTableCell>
                      <span scBadge [variant]="badgeOf(order.status)">{{
                        labelOf(order.status)
                      }}</span>
                    </td>
                  </tr>
                }
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div scCard>
        <div scCardHeader>
          <h2 i18n scCardTitle>Best sellers</h2>
          <p i18n scCardDescription>By reviews</p>
        </div>
        <div scCardBody>
          <div scItemGroup class="gap-2">
            @for (product of bestSellers; track product.id) {
              <a
                scItem
                size="sm"
                [routerLink]="['/apps/ecommerce/detail', product.id]"
              >
                <div scItemMedia variant="image">
                  <img
                    [ngSrc]="thumbOf(product)"
                    width="40"
                    height="40"
                    alt=""
                  />
                </div>
                <div scItemBody>
                  <div scItemTitle>{{ product.name }}</div>
                  <p i18n scItemDescription>
                    {{ product.reviews }} reviews ·
                    {{ labelOf(product.category) }}
                  </p>
                </div>
                <span class="text-sm font-medium tabular-nums">{{
                  moneyOf(product.price)
                }}</span>
              </a>
            }
          </div>
        </div>
        <div i18n scCardFooter>
          <a scLink routerLink="/apps/ecommerce/shop" class="text-sm"
            >Go to the shop</a
          >
        </div>
      </div>
    </div>
  `,
  host: { class: 'flex flex-col gap-4' },
  encapsulation: ViewEncapsulation.None,
})
export class EcommercePage {
  private readonly labelOf = label;
  /** The template's words that sit in bindings, translated. */
  private readonly t = {
    dashboards: $localize`Dashboards`,
  };

  private readonly revenue = REVENUE.map((row) => ({
    ...row,
    month: axisLabel(row.month),
  }));
  private readonly revenueConfig: ScChartConfig = {
    thisYear: { label: $localize`This year`, color: 'var(--chart-4)' },
    lastYear: { label: $localize`Last year`, color: 'var(--chart-2)' },
  };
  private readonly orders = ORDERS.slice(0, 6).map((order) => ({
    ...order,
    customer: personById(order.customerId),
    product: PRODUCTS.find((p) => p.id === order.productId)?.name ?? '',
  }));
  private readonly bestSellers = [...PRODUCTS]
    .sort((a, b) => b.reviews - a.reviews)
    .slice(0, 5);
  private readonly moneyOf = money;
  private readonly dayOf = day;
  private readonly initialsOf = initials;
  private readonly badgeOf = orderBadge;
  private readonly thumbOf = thumbOf;
  private readonly short = (value: number) => compactMoney(value);
}
