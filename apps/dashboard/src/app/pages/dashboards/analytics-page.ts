import { Component, ViewEncapsulation, computed, signal } from '@angular/core';
import {
  ScCard,
  ScCardAction,
  ScCardBody,
  ScCardDescription,
  ScCardHeader,
  ScCardTitle,
  ScProgress,
  ScProgressLabel,
  ScProgressRange,
  ScProgressTrack,
  ScProgressValueText,
  ScTable,
  ScTableBody,
  ScTableCell,
  ScTableContainer,
  ScTableHeader,
  ScTableHeaderCell,
  ScTableRow,
  ScToggleGroup,
  ScToggleGroupItem,
} from '@semantic-components/ui';
import {
  ScChart,
  ScChartArea,
  ScChartCategoryAxis,
  ScChartCenter,
  type ScChartConfig,
  ScChartCursor,
  ScChartGrid,
  ScChartPie,
  ScChartPlot,
} from '@semantic-components/ui/charts';
import {
  SiClockIcon,
  SiEyeIcon,
  SiMousePointerClickIcon,
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
import { PageHeader } from '../../layout/page-header';
import { ChartLegend, ChartTooltip } from '../../shared/chart-parts';
import { LOCALE, injectFormats } from '../../shared/formats';

type Range = '7d' | '30d' | '90d';

const TRAFFIC: Record<
  Range,
  { date: string; desktop: number; mobile: number }[]
> = {
  '7d': [
    { date: 'Mon', desktop: 1840, mobile: 1220 },
    { date: 'Tue', desktop: 2120, mobile: 1460 },
    { date: 'Wed', desktop: 1980, mobile: 1510 },
    { date: 'Thu', desktop: 2410, mobile: 1720 },
    { date: 'Fri', desktop: 2260, mobile: 1890 },
    { date: 'Sat', desktop: 1520, mobile: 2140 },
    { date: 'Sun', desktop: 1380, mobile: 2010 },
  ],
  '30d': [
    { date: 'Week 1', desktop: 12400, mobile: 9800 },
    { date: 'Week 2', desktop: 13900, mobile: 10400 },
    { date: 'Week 3', desktop: 13100, mobile: 11900 },
    { date: 'Week 4', desktop: 15200, mobile: 12600 },
  ],
  '90d': [
    { date: 'Jan', desktop: 38200, mobile: 29400 },
    { date: 'Feb', desktop: 41800, mobile: 33100 },
    { date: 'Mar', desktop: 46300, mobile: 38900 },
    { date: 'Apr', desktop: 44100, mobile: 41200 },
    { date: 'May', desktop: 51900, mobile: 45600 },
    { date: 'Jun', desktop: 54600, mobile: 49800 },
  ],
};

const SOURCES = [
  { source: 'organic', visits: 18420 },
  { source: 'direct', visits: 12850 },
  { source: 'referral', visits: 6930 },
  { source: 'social', visits: 5410 },
  { source: 'email', visits: 2280 },
];

const PAGES = [
  { path: '/', views: 48210, unique: 31840, bounce: 0.324 },
  { path: '/pricing', views: 21430, unique: 16920, bounce: 0.412 },
  { path: '/blog/streaming-video', views: 14880, unique: 12310, bounce: 0.538 },
  { path: '/docs/getting-started', views: 11250, unique: 8740, bounce: 0.276 },
  { path: '/apps/notes', views: 7920, unique: 5310, bounce: 0.351 },
];

/** Country names in the reader's language (Intl), from their region codes. */
const regions = new Intl.DisplayNames([LOCALE], { type: 'region' });
const COUNTRIES = [
  { name: regions.of('US') ?? 'US', share: 0.38 },
  { name: regions.of('GB') ?? 'GB', share: 0.17 },
  { name: regions.of('DE') ?? 'DE', share: 0.12 },
  { name: regions.of('IN') ?? 'IN', share: 0.11 },
  { name: regions.of('BR') ?? 'BR', share: 0.07 },
];

/** Analytics (Pro): visitors, where they come from, what they read. */
@Component({
  selector: 'app-analytics-page',
  imports: [
    ScCard,
    ScCardAction,
    ScCardBody,
    ScCardDescription,
    ScCardHeader,
    ScCardTitle,
    ScProgress,
    ScProgressLabel,
    ScProgressRange,
    ScProgressTrack,
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
    ScToggleGroup,
    ScToggleGroupItem,
    ScChart,
    ScChartArea,
    ScChartCategoryAxis,
    ScChartCenter,
    ScChartCursor,
    ScChartGrid,
    ScChartPie,
    ScChartPlot,
    SiClockIcon,
    SiEyeIcon,
    SiMousePointerClickIcon,
    SiTrendingDownIcon,
    SiTrendingUpIcon,
    SiUsersIcon,
    PageHeader,
    ChartLegend,
    ChartTooltip,
  ],
  template: `
    <app-page-header
      i18n-title="@@dashboards.analytics.analytics"
      title="Analytics"
      [trail]="[{ label: t.dashboards }, { label: t.analytics }]"
    />

    <div class="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      <dl appStatCard>
        <dt appStatCardLabel>
          <ng-container i18n="@@dashboards.analytics.visitors"
            >Visitors</ng-container
          >
          <svg siUsersIcon appStatCardIcon></svg>
        </dt>
        <dd appStatCardValue [value]="45820"></dd>
        <dd
          appStatCardChange
          [value]="0.124"
          [format]="{ style: 'percent', maximumFractionDigits: 1 }"
        >
          <svg siTrendingUpIcon></svg>
        </dd>
        <dd i18n="@@dashboards.analytics.fromLastMonth" appStatCardDescription>
          from last month
        </dd>
      </dl>
      <dl appStatCard>
        <dt appStatCardLabel>
          <ng-container i18n="@@dashboards.analytics.pageViews"
            >Page views</ng-container
          >
          <svg siEyeIcon appStatCardIcon></svg>
        </dt>
        <dd appStatCardValue [value]="128430"></dd>
        <dd
          appStatCardChange
          [value]="0.087"
          [format]="{ style: 'percent', maximumFractionDigits: 1 }"
        >
          <svg siTrendingUpIcon></svg>
        </dd>
        <dd i18n="@@dashboards.analytics.fromLastMonth" appStatCardDescription>
          from last month
        </dd>
      </dl>
      <dl appStatCard>
        <dt appStatCardLabel>
          <ng-container i18n="@@dashboards.analytics.bounceRate"
            >Bounce rate</ng-container
          >
          <svg siMousePointerClickIcon appStatCardIcon></svg>
        </dt>
        <dd
          appStatCardValue
          [value]="0.368"
          [format]="{ style: 'percent', maximumFractionDigits: 1 }"
        ></dd>
        <dd
          appStatCardChange
          good="down"
          [value]="-0.021"
          [format]="{ style: 'percent', maximumFractionDigits: 1 }"
        >
          <svg siTrendingDownIcon></svg>
        </dd>
        <dd i18n="@@dashboards.analytics.fromLastMonth" appStatCardDescription>
          from last month
        </dd>
      </dl>
      <dl appStatCard>
        <dt appStatCardLabel>
          <ng-container i18n="@@dashboards.analytics.avgSession"
            >Avg. session</ng-container
          >
          <svg siClockIcon appStatCardIcon></svg>
        </dt>
        <dd appStatCardValue>{{ f.duration({ minutes: 3, seconds: 42 }) }}</dd>
        <dd
          appStatCardChange
          [value]="0.046"
          [format]="{ style: 'percent', maximumFractionDigits: 1 }"
        >
          <svg siTrendingUpIcon></svg>
        </dd>
        <dd i18n="@@dashboards.analytics.fromLastMonth" appStatCardDescription>
          from last month
        </dd>
      </dl>
    </div>

    <div class="grid gap-4 xl:grid-cols-3">
      <div scCard class="xl:col-span-2">
        <div scCardHeader>
          <h2 i18n="@@dashboards.analytics.traffic" scCardTitle>Traffic</h2>
          <p i18n="@@dashboards.analytics.visitorsByDevice" scCardDescription>
            Visitors by device
          </p>
          <div scCardAction>
            <div
              i18n-aria-label="@@dashboards.analytics.period"
              scToggleGroup
              variant="outline"
              size="sm"
              aria-label="Period"
              [value]="[range()]"
              (valueChange)="choose($event)"
            >
              <button
                i18n="@@dashboards.analytics.n7Days"
                scToggleGroupItem
                value="7d"
              >
                {{ f.count(7) }} days
              </button>
              <button
                i18n="@@dashboards.analytics.n30Days"
                scToggleGroupItem
                value="30d"
              >
                {{ f.count(30) }} days
              </button>
              <button
                i18n="@@dashboards.analytics.n90Days"
                scToggleGroupItem
                value="90d"
              >
                {{ f.count(90) }} days
              </button>
            </div>
          </div>
        </div>
        <div scCardBody>
          <div
            scChart
            [config]="trafficConfig"
            [data]="traffic()"
            class="h-72 w-full"
          >
            <svg
              i18n-aria-label="@@dashboards.analytics.visitorsByDevice"
              scChartPlot
              categoryKey="date"
              aria-label="Visitors by device"
            >
              <g scChartGrid />
              <g scChartCategoryAxis />
              <g scChartCursor />
              <g scChartArea key="mobile" stack="a" curve="monotone" />
              <g scChartArea key="desktop" stack="a" curve="monotone" />
            </svg>
            <app-chart-tooltip />
            <app-chart-legend />
          </div>
        </div>
      </div>

      <div scCard>
        <div scCardHeader>
          <h2 i18n="@@dashboards.analytics.trafficSources" scCardTitle>
            Traffic sources
          </h2>
          <p i18n="@@dashboards.analytics.visitsThisMonth" scCardDescription>
            Visits this month
          </p>
        </div>
        <div scCardBody>
          <div
            scChart
            [config]="sourceConfig"
            [data]="sources"
            class="mx-auto aspect-square max-h-64"
          >
            <svg
              i18n-aria-label="@@dashboards.analytics.visitsBySource"
              scChartPlot
              categoryKey="source"
              aria-label="Visits by source"
            >
              <g
                scChartPie
                key="visits"
                [innerRadius]="0.6"
                [padAngle]="1"
                [strokeWidth]="0"
              />
              <g scChartCenter>
                <text
                  text-anchor="middle"
                  class="fill-foreground text-2xl font-bold"
                >
                  {{ totalVisits() }}
                </text>
                <text
                  text-anchor="middle"
                  dy="1.6em"
                  class="fill-muted-foreground text-sm"
                >
                  {{ visitsLabel }}
                </text>
              </g>
            </svg>
            <app-chart-tooltip hideLabel />
            <app-chart-legend />
          </div>
        </div>
      </div>
    </div>

    <div class="grid gap-4 xl:grid-cols-3">
      <div scCard class="xl:col-span-2">
        <div scCardHeader>
          <h2 i18n="@@dashboards.analytics.topPages" scCardTitle>Top pages</h2>
          <p
            i18n="@@dashboards.analytics.theMostReadThisMonth"
            scCardDescription
          >
            The most read this month
          </p>
        </div>
        <div scCardBody>
          <div scTableContainer>
            <table scTable>
              <thead scTableHeader>
                <tr scTableRow>
                  <th i18n="@@dashboards.analytics.page" scTableHeaderCell>
                    Page
                  </th>
                  <th
                    i18n="@@dashboards.analytics.views"
                    scTableHeaderCell
                    class="text-end"
                  >
                    Views
                  </th>
                  <th
                    i18n="@@dashboards.analytics.unique"
                    scTableHeaderCell
                    class="text-end"
                  >
                    Unique
                  </th>
                  <th
                    i18n="@@dashboards.analytics.bounce"
                    scTableHeaderCell
                    class="text-end"
                  >
                    Bounce
                  </th>
                </tr>
              </thead>
              <tbody scTableBody>
                @for (page of pages; track page.path) {
                  <tr scTableRow>
                    <td scTableCell class="font-medium">{{ page.path }}</td>
                    <td scTableCell class="text-end tabular-nums">
                      {{ f.count(page.views) }}
                    </td>
                    <td scTableCell class="text-end tabular-nums">
                      {{ f.count(page.unique) }}
                    </td>
                    <td scTableCell class="text-end tabular-nums">
                      {{ f.percent(page.bounce) }}
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
          <h2 i18n="@@dashboards.analytics.visitorsByCountry" scCardTitle>
            Visitors by country
          </h2>
          <p i18n="@@dashboards.analytics.shareOfThisMonthS" scCardDescription>
            Share of this month's visitors
          </p>
        </div>
        <div scCardBody class="flex flex-col gap-4">
          @for (country of countries; track country.name) {
            <div scProgress [value]="country.share * 100">
              <span scProgressLabel>{{ country.name }}</span>
              <span scProgressValueText>{{ f.percent(country.share) }}</span>
              <div scProgressTrack><div scProgressRange></div></div>
            </div>
          }
        </div>
      </div>
    </div>
  `,
  host: { class: 'flex flex-col gap-4' },
  encapsulation: ViewEncapsulation.None,
})
export class AnalyticsPage {
  /** Figures as the library writes them (the dashboard's choices). */
  private readonly f = injectFormats();
  /** The donut's centre word: SVG text, so not an i18n element. */
  private readonly visitsLabel = $localize`:@@dashboards.analytics.visits:Visits`;
  /** The template's words that sit in bindings, translated. */
  private readonly t = {
    dashboards: $localize`:@@dashboards.analytics.dashboards:Dashboards`,
    analytics: $localize`:@@dashboards.analytics.analytics:Analytics`,
  };

  private readonly range = signal<Range>('90d');
  private readonly traffic = computed(() =>
    TRAFFIC[this.range()].map((row) => ({
      ...row,
      date: this.f.axisLabel(row.date),
    })),
  );
  private readonly sources = SOURCES.map((row) => ({ ...row }));
  private readonly totalVisits = computed(() =>
    this.f.compact(SOURCES.reduce((sum, row) => sum + row.visits, 0)),
  );
  private readonly pages = PAGES;
  private readonly countries = COUNTRIES;
  private readonly trafficConfig: ScChartConfig = {
    desktop: {
      label: $localize`:@@dashboards.analytics.desktop:Desktop`,
      color: 'var(--chart-2)',
    },
    mobile: {
      label: $localize`:@@dashboards.analytics.mobile:Mobile`,
      color: 'var(--chart-4)',
    },
  };
  private readonly sourceConfig: ScChartConfig = {
    visits: { label: $localize`:@@dashboards.analytics.visits:Visits` },
    organic: {
      label: $localize`:@@dashboards.analytics.organic:Organic`,
      color: 'var(--chart-1)',
    },
    direct: {
      label: $localize`:@@dashboards.analytics.direct:Direct`,
      color: 'var(--chart-2)',
    },
    referral: {
      label: $localize`:@@dashboards.analytics.referral:Referral`,
      color: 'var(--chart-3)',
    },
    social: {
      label: $localize`:@@dashboards.analytics.social:Social`,
      color: 'var(--chart-4)',
    },
    email: {
      label: $localize`:@@dashboards.analytics.email:Email`,
      color: 'var(--chart-5)',
    },
  };

  private choose(value: readonly string[]): void {
    const next = value[0];
    if (next === '7d' || next === '30d' || next === '90d') this.range.set(next);
  }
}
