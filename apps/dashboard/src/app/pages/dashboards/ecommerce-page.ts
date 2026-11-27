import { NgOptimizedImage } from '@angular/common';
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
import {
  AppStatCard,
  AppStatCardChange,
  AppStatCardDescription,
  AppStatCardIcon,
  AppStatCardLabel,
  AppStatCardValue,
} from '../../components/stat-card';
import { ORDERS } from '../../data/orders';
import { personById } from '../../data/people';
import { PRODUCTS, thumbOf } from '../../data/products';
import { PageHeader } from '../../layout/page-header';
import { ChartLegend, ChartTooltip } from '../../shared/chart-parts';
import { initials, injectFormats } from '../../shared/formats';
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
    AppStatCard,
    AppStatCardChange,
    AppStatCardDescription,
    AppStatCardIcon,
    AppStatCardLabel,
    AppStatCardValue,
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
      i18n-title="@@dashboards.ecommerce.ecommerce"
      title="eCommerce"
      [trail]="[{ label: t.dashboards }, { label: 'eCommerce' }]"
    />

    <div class="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      <dl appStatCard>
        <dt appStatCardLabel>
          <ng-container i18n="@@dashboards.ecommerce.revenue"
            >Revenue</ng-container
          >
          <svg siDollarSignIcon appStatCardIcon></svg>
        </dt>
        <dd
          appStatCardValue
          [value]="147000"
          [format]="{ style: 'currency', currency: 'USD', notation: 'compact' }"
        ></dd>
        <dd
          appStatCardChange
          [value]="0.186"
          [format]="{ style: 'percent', maximumFractionDigits: 1 }"
        >
          <svg siTrendingUpIcon></svg>
        </dd>
        <dd i18n="@@dashboards.ecommerce.fromLastHalf" appStatCardDescription>
          from last half
        </dd>
      </dl>
      <dl appStatCard>
        <dt appStatCardLabel>
          <ng-container i18n="@@dashboards.ecommerce.orders"
            >Orders</ng-container
          >
          <svg siShoppingCartIcon appStatCardIcon></svg>
        </dt>
        <dd appStatCardValue [value]="2384"></dd>
        <dd
          appStatCardChange
          [value]="0.092"
          [format]="{ style: 'percent', maximumFractionDigits: 1 }"
        >
          <svg siTrendingUpIcon></svg>
        </dd>
        <dd i18n="@@dashboards.ecommerce.fromLastHalf" appStatCardDescription>
          from last half
        </dd>
      </dl>
      <dl appStatCard>
        <dt appStatCardLabel>
          <ng-container i18n="@@dashboards.ecommerce.customers"
            >Customers</ng-container
          >
          <svg siUsersIcon appStatCardIcon></svg>
        </dt>
        <dd appStatCardValue [value]="1126"></dd>
        <dd
          appStatCardChange
          [value]="0.041"
          [format]="{ style: 'percent', maximumFractionDigits: 1 }"
        >
          <svg siTrendingUpIcon></svg>
        </dd>
        <dd i18n="@@dashboards.ecommerce.fromLastHalf" appStatCardDescription>
          from last half
        </dd>
      </dl>
      <dl appStatCard>
        <dt appStatCardLabel>
          <ng-container i18n="@@dashboards.ecommerce.conversion"
            >Conversion</ng-container
          >
          <svg siPercentIcon appStatCardIcon></svg>
        </dt>
        <dd
          appStatCardValue
          [value]="0.032"
          [format]="{ style: 'percent', maximumFractionDigits: 1 }"
        ></dd>
        <dd
          appStatCardChange
          [value]="-0.004"
          [format]="{ style: 'percent', maximumFractionDigits: 1 }"
        >
          <svg siTrendingDownIcon></svg>
        </dd>
        <dd i18n="@@dashboards.ecommerce.fromLastHalf" appStatCardDescription>
          from last half
        </dd>
      </dl>
    </div>

    <div class="grid gap-4 xl:grid-cols-3">
      <div scCard class="xl:col-span-2">
        <div scCardHeader>
          <h2 i18n="@@dashboards.ecommerce.revenue" scCardTitle>Revenue</h2>
          <p
            i18n="@@dashboards.ecommerce.thisYearAgainstLastBy"
            scCardDescription
          >
            This year against last, by month
          </p>
        </div>
        <div scCardBody>
          <div
            scChart
            [config]="revenueConfig"
            [data]="revenue"
            class="h-72 w-full"
          >
            <svg
              i18n-aria-label="@@dashboards.ecommerce.revenueByMonthThisYear"
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
            <app-chart-tooltip [format]="f.money" indicator="dashed" />
            <app-chart-legend />
          </div>
        </div>
      </div>

      <div scCard>
        <div scCardHeader>
          <h2 i18n="@@dashboards.ecommerce.yearlyGoal" scCardTitle>
            Yearly goal
          </h2>
          <p i18n="@@dashboards.ecommerce.n147kOf204k" scCardDescription>
            {{ f.compactMoney(147000) }} of {{ f.compactMoney(204000) }}
          </p>
        </div>
        <div scCardBody class="flex flex-col items-center gap-4">
          <div
            i18n-aria-label="@@dashboards.ecommerce.yearlyGoal"
            scProgress
            [value]="72"
            aria-label="Yearly goal"
            class="size-40"
          >
            <svg scProgressCircle [thickness]="6"></svg>
            <span scProgressValueText class="text-2xl font-semibold">{{
              f.percent(0.72)
            }}</span>
          </div>
          <p
            i18n="@@dashboards.ecommerce.n57kToGoAtThis"
            class="text-muted-foreground text-center text-sm"
          >
            {{ f.compactMoney(57000) }} to go — at this pace, reached in
            October.
          </p>
        </div>
      </div>
    </div>

    <div class="grid gap-4 xl:grid-cols-3">
      <div scCard class="xl:col-span-2">
        <div scCardHeader>
          <h2 i18n="@@dashboards.ecommerce.recentOrders" scCardTitle>
            Recent orders
          </h2>
          <div i18n="@@dashboards.ecommerce.viewAll" scCardAction>
            <a scLink routerLink="/apps/orders" class="text-sm">View all</a>
          </div>
        </div>
        <div scCardBody>
          <div scTableContainer>
            <table scTable>
              <thead scTableHeader>
                <tr scTableRow>
                  <th i18n="@@dashboards.ecommerce.order" scTableHeaderCell>
                    Order
                  </th>
                  <th i18n="@@dashboards.ecommerce.customer" scTableHeaderCell>
                    Customer
                  </th>
                  <th i18n="@@dashboards.ecommerce.product" scTableHeaderCell>
                    Product
                  </th>
                  <th i18n="@@dashboards.ecommerce.date" scTableHeaderCell>
                    Date
                  </th>
                  <th
                    i18n="@@dashboards.ecommerce.total"
                    scTableHeaderCell
                    class="text-end"
                  >
                    Total
                  </th>
                  <th i18n="@@dashboards.ecommerce.status" scTableHeaderCell>
                    Status
                  </th>
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
                    <td scTableCell>{{ f.day(order.date) }}</td>
                    <td scTableCell class="text-end tabular-nums">
                      {{ f.money(order.total) }}
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
          <h2 i18n="@@dashboards.ecommerce.bestSellers" scCardTitle>
            Best sellers
          </h2>
          <p i18n="@@dashboards.ecommerce.byReviews" scCardDescription>
            By reviews
          </p>
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
                  <p i18n="@@dashboards.ecommerce.reviews" scItemDescription>
                    {{ f.count(product.reviews) }} reviews ·
                    {{ labelOf(product.category) }}
                  </p>
                </div>
                <span class="text-sm font-medium tabular-nums">{{
                  f.money(product.price)
                }}</span>
              </a>
            }
          </div>
        </div>
        <div i18n="@@dashboards.ecommerce.goToTheShop" scCardFooter>
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
  /** Figures as the library writes them (the dashboard's choices). */
  private readonly f = injectFormats();

  private readonly labelOf = label;
  /** The template's words that sit in bindings, translated. */
  private readonly t = {
    dashboards: $localize`:@@dashboards.ecommerce.dashboards:Dashboards`,
  };

  private readonly revenue = REVENUE.map((row) => ({
    ...row,
    month: this.f.axisLabel(row.month),
  }));
  private readonly revenueConfig: ScChartConfig = {
    thisYear: {
      label: $localize`:@@dashboards.ecommerce.thisYear:This year`,
      color: 'var(--chart-4)',
    },
    lastYear: {
      label: $localize`:@@dashboards.ecommerce.lastYear:Last year`,
      color: 'var(--chart-2)',
    },
  };
  private readonly orders = ORDERS.slice(0, 6).map((order) => ({
    ...order,
    customer: personById(order.customerId),
    product: PRODUCTS.find((p) => p.id === order.productId)?.name ?? '',
  }));
  private readonly bestSellers = [...PRODUCTS]
    .sort((a, b) => b.reviews - a.reviews)
    .slice(0, 5);
  private readonly initialsOf = initials;
  private readonly badgeOf = orderBadge;
  private readonly thumbOf = thumbOf;
  private readonly short = (value: number) => this.f.compactMoney(value);
}
