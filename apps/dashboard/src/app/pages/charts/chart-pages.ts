import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScCard,
  ScCardBody,
  ScCardDescription,
  ScCardHeader,
  ScCardTitle,
} from '@semantic-components/ui';
import {
  ScChart,
  ScChartArea,
  ScChartBar,
  ScChartCategoryAxis,
  ScChartCenter,
  type ScChartConfig,
  ScChartCursor,
  ScChartGrid,
  ScChartLabels,
  ScChartLine,
  ScChartPie,
  ScChartPlot,
  ScChartPolarAngleAxis,
  ScChartPolarGrid,
  ScChartRadar,
  ScChartRadialBar,
  ScChartValueAxis,
} from '@semantic-components/ui/charts';
import { PageHeader } from '../../layout/page-header';
import { ChartLegend, ChartTooltip } from '../../shared/chart-parts';
import { injectFormats } from '../../shared/formats';

/** Visitors by month and device: the charts' shared series. */
const MONTHS = [
  { month: 'January', desktop: 186, mobile: 80 },
  { month: 'February', desktop: 305, mobile: 200 },
  { month: 'March', desktop: 237, mobile: 120 },
  { month: 'April', desktop: 73, mobile: 190 },
  { month: 'May', desktop: 209, mobile: 130 },
  { month: 'June', desktop: 214, mobile: 140 },
];

/** Visitors by browser: the round charts' categories. */
const BROWSERS = [
  { browser: 'chrome', visitors: 275 },
  { browser: 'safari', visitors: 200 },
  { browser: 'firefox', visitors: 187 },
  { browser: 'edge', visitors: 173 },
  { browser: 'other', visitors: 90 },
];

const DEVICES: ScChartConfig = {
  desktop: {
    label: $localize`:@@charts.chartPages.desktop:Desktop`,
    color: 'var(--chart-2)',
  },
  mobile: {
    label: $localize`:@@charts.chartPages.mobile:Mobile`,
    color: 'var(--chart-4)',
  },
};

const BROWSER_CONFIG: ScChartConfig = {
  visitors: { label: $localize`:@@charts.chartPages.visitors:Visitors` },
  chrome: {
    label: $localize`:@@charts.chartPages.chrome:Chrome`,
    color: 'var(--chart-1)',
  },
  safari: {
    label: $localize`:@@charts.chartPages.safari:Safari`,
    color: 'var(--chart-2)',
  },
  firefox: {
    label: $localize`:@@charts.chartPages.firefox:Firefox`,
    color: 'var(--chart-3)',
  },
  edge: {
    label: $localize`:@@charts.chartPages.edge:Edge`,
    color: 'var(--chart-4)',
  },
  other: {
    label: $localize`:@@charts.chartPages.other:Other`,
    color: 'var(--chart-5)',
  },
};

const CARD_IMPORTS = [
  ScCard,
  ScCardBody,
  ScCardDescription,
  ScCardHeader,
  ScCardTitle,
  PageHeader,
];

/** Each page's data: fresh copies (a chart takes mutable rows). */
abstract class ChartPage {
  /** Figures as the library writes them (the dashboard's choices). */
  protected readonly f = injectFormats();
  /** The donut's centre word: SVG text, so not an i18n element. */
  private readonly visitorsLabel = $localize`:@@charts.chartPages.visitors:Visitors`;
  private readonly months = MONTHS.map((row) => ({
    ...row,
    month: this.f.axisLabel(row.month),
  }));
  private readonly browsers = BROWSERS.map((row) => ({ ...row }));
  private readonly devices = DEVICES;
  private readonly desktopOnly: ScChartConfig = {
    desktop: DEVICES['desktop'],
  };
  private readonly browserConfig = BROWSER_CONFIG;
  private readonly total = BROWSERS.reduce((sum, row) => sum + row.visitors, 0);
  /** The months are short already (axisLabel). */
  private readonly short = (month: string) => month;
  private readonly name = (_: number, category: string) => category;
}

/** Line charts (Pro): one series, two, with dots, in steps. */
@Component({
  selector: 'app-line-charts-page',
  imports: [
    ...CARD_IMPORTS,
    ScChart,
    ScChartPlot,
    ScChartCategoryAxis,
    ScChartCursor,
    ScChartGrid,
    ScChartLine,
    ChartLegend,
    ChartTooltip,
  ],
  template: `
    <app-page-header
      i18n-title="@@charts.chartPages.lineCharts"
      title="Line Charts"
      [trail]="[{ label: t.charts }, { label: t.line }]"
    />
    <div class="grid gap-4 lg:grid-cols-2">
      <div scCard>
        <div scCardHeader>
          <h2 i18n="@@charts.chartPages.line" scCardTitle>Line</h2>
          <p i18n="@@charts.chartPages.desktopVisitors" scCardDescription>
            Desktop visitors
          </p>
        </div>
        <div scCardBody>
          <div
            scChart
            [config]="desktopOnly"
            [data]="months"
            class="h-64 w-full"
          >
            <svg
              i18n-aria-label="@@charts.chartPages.desktopVisitorsByMonth"
              scChartPlot
              categoryKey="month"
              aria-label="Desktop visitors by month"
            >
              <g scChartGrid />
              <g scChartCategoryAxis [tickFormatter]="short" />
              <g scChartCursor />
              <g scChartLine key="desktop" />
            </svg>
            <app-chart-tooltip />
          </div>
        </div>
      </div>
      <div scCard>
        <div scCardHeader>
          <h2 i18n="@@charts.chartPages.twoLines" scCardTitle>Two lines</h2>
          <p i18n="@@charts.chartPages.desktopAndMobile" scCardDescription>
            Desktop and mobile
          </p>
        </div>
        <div scCardBody>
          <div scChart [config]="devices" [data]="months" class="h-64 w-full">
            <svg
              i18n-aria-label="@@charts.chartPages.visitorsByDeviceAndMonth"
              scChartPlot
              categoryKey="month"
              aria-label="Visitors by device and month"
            >
              <g scChartGrid />
              <g scChartCategoryAxis [tickFormatter]="short" />
              <g scChartCursor />
              <g scChartLine key="desktop" curve="monotone" />
              <g scChartLine key="mobile" curve="monotone" />
            </svg>
            <app-chart-tooltip />
            <app-chart-legend />
          </div>
        </div>
      </div>
      <div scCard>
        <div scCardHeader>
          <h2 i18n="@@charts.chartPages.withDots" scCardTitle>With dots</h2>
          <p i18n="@@charts.chartPages.eachMonthMarked" scCardDescription>
            Each month marked
          </p>
        </div>
        <div scCardBody>
          <div
            scChart
            [config]="desktopOnly"
            [data]="months"
            class="h-64 w-full"
          >
            <svg
              i18n-aria-label="@@charts.chartPages.desktopVisitorsByMonth"
              scChartPlot
              categoryKey="month"
              aria-label="Desktop visitors by month"
            >
              <g scChartGrid />
              <g scChartCategoryAxis [tickFormatter]="short" />
              <g scChartCursor />
              <g scChartLine key="desktop" curve="linear" dots />
            </svg>
            <app-chart-tooltip />
          </div>
        </div>
      </div>
      <div scCard>
        <div scCardHeader>
          <h2 i18n="@@charts.chartPages.steps" scCardTitle>Steps</h2>
          <p i18n="@@charts.chartPages.changesAsSteps" scCardDescription>
            Changes as steps
          </p>
        </div>
        <div scCardBody>
          <div
            scChart
            [config]="desktopOnly"
            [data]="months"
            class="h-64 w-full"
          >
            <svg
              i18n-aria-label="@@charts.chartPages.desktopVisitorsByMonth"
              scChartPlot
              categoryKey="month"
              aria-label="Desktop visitors by month"
            >
              <g scChartGrid />
              <g scChartCategoryAxis [tickFormatter]="short" />
              <g scChartCursor />
              <g scChartLine key="desktop" curve="step" />
            </svg>
            <app-chart-tooltip />
          </div>
        </div>
      </div>
    </div>
  `,
  host: { class: 'flex flex-col gap-4' },
  encapsulation: ViewEncapsulation.None,
})
export class LineChartsPage extends ChartPage {
  /** The template's words that sit in bindings, translated. */
  private readonly t = {
    charts: $localize`:@@charts.chartPages.charts:Charts`,
    line: $localize`:@@charts.chartPages.line:Line`,
  };
}

/** Area charts (Pro): filled, stacked, with a scale, in steps. */
@Component({
  selector: 'app-area-charts-page',
  imports: [
    ...CARD_IMPORTS,
    ScChart,
    ScChartPlot,
    ScChartArea,
    ScChartCategoryAxis,
    ScChartCursor,
    ScChartGrid,
    ScChartValueAxis,
    ChartLegend,
    ChartTooltip,
  ],
  template: `
    <app-page-header
      i18n-title="@@charts.chartPages.areaCharts"
      title="Area Charts"
      [trail]="[{ label: t.charts }, { label: t.area }]"
    />
    <div class="grid gap-4 lg:grid-cols-2">
      <div scCard>
        <div scCardHeader>
          <h2 i18n="@@charts.chartPages.area" scCardTitle>Area</h2>
          <p i18n="@@charts.chartPages.desktopVisitors" scCardDescription>
            Desktop visitors
          </p>
        </div>
        <div scCardBody>
          <div
            scChart
            [config]="desktopOnly"
            [data]="months"
            class="h-64 w-full"
          >
            <svg
              i18n-aria-label="@@charts.chartPages.desktopVisitorsByMonth"
              scChartPlot
              categoryKey="month"
              aria-label="Desktop visitors by month"
            >
              <g scChartGrid />
              <g scChartCategoryAxis [tickFormatter]="short" />
              <g scChartCursor />
              <g scChartArea key="desktop" />
            </svg>
            <app-chart-tooltip />
          </div>
        </div>
      </div>
      <div scCard>
        <div scCardHeader>
          <h2 i18n="@@charts.chartPages.stacked" scCardTitle>Stacked</h2>
          <p i18n="@@charts.chartPages.mobileUnderDesktop" scCardDescription>
            Mobile under desktop
          </p>
        </div>
        <div scCardBody>
          <div scChart [config]="devices" [data]="months" class="h-64 w-full">
            <svg
              i18n-aria-label="@@charts.chartPages.visitorsByDeviceAndMonth"
              scChartPlot
              categoryKey="month"
              aria-label="Visitors by device and month"
            >
              <g scChartGrid />
              <g scChartCategoryAxis [tickFormatter]="short" />
              <g scChartCursor />
              <g scChartArea key="mobile" stack="a" />
              <g scChartArea key="desktop" stack="a" />
            </svg>
            <app-chart-tooltip />
            <app-chart-legend />
          </div>
        </div>
      </div>
      <div scCard>
        <div scCardHeader>
          <h2 i18n="@@charts.chartPages.withAScale" scCardTitle>
            With a scale
          </h2>
          <p i18n="@@charts.chartPages.valuesAlongTheSide" scCardDescription>
            Values along the side
          </p>
        </div>
        <div scCardBody>
          <div scChart [config]="devices" [data]="months" class="h-64 w-full">
            <svg
              i18n-aria-label="@@charts.chartPages.visitorsByDeviceAndMonth"
              scChartPlot
              categoryKey="month"
              aria-label="Visitors by device and month"
            >
              <g scChartGrid />
              <g scChartCategoryAxis [tickFormatter]="short" />
              <g scChartValueAxis />
              <g scChartCursor />
              <g scChartArea key="mobile" curve="monotone" />
              <g scChartArea key="desktop" curve="monotone" />
            </svg>
            <app-chart-tooltip />
          </div>
        </div>
      </div>
      <div scCard>
        <div scCardHeader>
          <h2 i18n="@@charts.chartPages.steps" scCardTitle>Steps</h2>
          <p i18n="@@charts.chartPages.changesAsSteps" scCardDescription>
            Changes as steps
          </p>
        </div>
        <div scCardBody>
          <div
            scChart
            [config]="desktopOnly"
            [data]="months"
            class="h-64 w-full"
          >
            <svg
              i18n-aria-label="@@charts.chartPages.desktopVisitorsByMonth"
              scChartPlot
              categoryKey="month"
              aria-label="Desktop visitors by month"
            >
              <g scChartGrid />
              <g scChartCategoryAxis [tickFormatter]="short" />
              <g scChartCursor />
              <g scChartArea key="desktop" curve="step" />
            </svg>
            <app-chart-tooltip />
          </div>
        </div>
      </div>
    </div>
  `,
  host: { class: 'flex flex-col gap-4' },
  encapsulation: ViewEncapsulation.None,
})
export class AreaChartsPage extends ChartPage {
  /** The template's words that sit in bindings, translated. */
  private readonly t = {
    charts: $localize`:@@charts.chartPages.charts:Charts`,
    area: $localize`:@@charts.chartPages.area:Area`,
  };
}

/** Bar charts (Pro): one series, side by side, stacked, across. */
@Component({
  selector: 'app-bar-charts-page',
  imports: [
    ...CARD_IMPORTS,
    ScChart,
    ScChartPlot,
    ScChartBar,
    ScChartCategoryAxis,
    ScChartCursor,
    ScChartGrid,
    ChartLegend,
    ChartTooltip,
  ],
  template: `
    <app-page-header
      i18n-title="@@charts.chartPages.barCharts"
      title="Bar Charts"
      [trail]="[{ label: t.charts }, { label: t.bar }]"
    />
    <div class="grid gap-4 lg:grid-cols-2">
      <div scCard>
        <div scCardHeader>
          <h2 i18n="@@charts.chartPages.bar" scCardTitle>Bar</h2>
          <p i18n="@@charts.chartPages.desktopVisitors" scCardDescription>
            Desktop visitors
          </p>
        </div>
        <div scCardBody>
          <div
            scChart
            [config]="desktopOnly"
            [data]="months"
            class="h-64 w-full"
          >
            <svg
              i18n-aria-label="@@charts.chartPages.desktopVisitorsByMonth"
              scChartPlot
              categoryKey="month"
              aria-label="Desktop visitors by month"
            >
              <g scChartGrid />
              <g scChartCategoryAxis [tickFormatter]="short" />
              <g scChartCursor />
              <g scChartBar key="desktop" />
            </svg>
            <app-chart-tooltip />
          </div>
        </div>
      </div>
      <div scCard>
        <div scCardHeader>
          <h2 i18n="@@charts.chartPages.sideBySide" scCardTitle>
            Side by side
          </h2>
          <p i18n="@@charts.chartPages.desktopAndMobile" scCardDescription>
            Desktop and mobile
          </p>
        </div>
        <div scCardBody>
          <div scChart [config]="devices" [data]="months" class="h-64 w-full">
            <svg
              i18n-aria-label="@@charts.chartPages.visitorsByDeviceAndMonth"
              scChartPlot
              categoryKey="month"
              aria-label="Visitors by device and month"
            >
              <g scChartGrid />
              <g scChartCategoryAxis [tickFormatter]="short" />
              <g scChartCursor />
              <g scChartBar key="desktop" />
              <g scChartBar key="mobile" />
            </svg>
            <app-chart-tooltip indicator="dashed" />
            <app-chart-legend />
          </div>
        </div>
      </div>
      <div scCard>
        <div scCardHeader>
          <h2 i18n="@@charts.chartPages.stacked" scCardTitle>Stacked</h2>
          <p i18n="@@charts.chartPages.oneBarPerMonth" scCardDescription>
            One bar per month
          </p>
        </div>
        <div scCardBody>
          <div scChart [config]="devices" [data]="months" class="h-64 w-full">
            <svg
              i18n-aria-label="@@charts.chartPages.visitorsByDeviceAndMonth"
              scChartPlot
              categoryKey="month"
              aria-label="Visitors by device and month"
            >
              <g scChartGrid />
              <g scChartCategoryAxis [tickFormatter]="short" />
              <g scChartCursor />
              <g scChartBar key="desktop" stack="a" />
              <g scChartBar key="mobile" stack="a" />
            </svg>
            <app-chart-tooltip />
            <app-chart-legend />
          </div>
        </div>
      </div>
      <div scCard>
        <div scCardHeader>
          <h2 i18n="@@charts.chartPages.across" scCardTitle>Across</h2>
          <p i18n="@@charts.chartPages.barsFromTheSide" scCardDescription>
            Bars from the side
          </p>
        </div>
        <div scCardBody>
          <div
            scChart
            [config]="desktopOnly"
            [data]="months"
            class="h-64 w-full"
          >
            <svg
              i18n-aria-label="@@charts.chartPages.desktopVisitorsByMonth"
              scChartPlot
              categoryKey="month"
              layout="vertical"
              aria-label="Desktop visitors by month"
            >
              <g scChartCategoryAxis [tickFormatter]="short" [width]="32" />
              <g scChartCursor />
              <g scChartBar key="desktop" />
            </svg>
            <app-chart-tooltip />
          </div>
        </div>
      </div>
    </div>
  `,
  host: { class: 'flex flex-col gap-4' },
  encapsulation: ViewEncapsulation.None,
})
export class BarChartsPage extends ChartPage {
  /** The template's words that sit in bindings, translated. */
  private readonly t = {
    charts: $localize`:@@charts.chartPages.charts:Charts`,
    bar: $localize`:@@charts.chartPages.bar:Bar`,
  };
}

/** Pie and donut charts (Pro): whole, hollow, with the total, labelled. */
@Component({
  selector: 'app-pie-charts-page',
  imports: [
    ...CARD_IMPORTS,
    ScChart,
    ScChartCenter,
    ScChartLabels,
    ScChartPie,
    ScChartPlot,
    ChartLegend,
    ChartTooltip,
  ],
  template: `
    <app-page-header
      i18n-title="@@charts.chartPages.pieDonutCharts"
      title="Pie & Donut Charts"
      [trail]="[{ label: t.charts }, { label: t.pieDonut }]"
    />
    <div class="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      <div scCard>
        <div scCardHeader>
          <h2 i18n="@@charts.chartPages.pie" scCardTitle>Pie</h2>
          <p i18n="@@charts.chartPages.visitorsByBrowser" scCardDescription>
            Visitors by browser
          </p>
        </div>
        <div scCardBody>
          <div
            scChart
            [config]="browserConfig"
            [data]="browsers"
            class="mx-auto aspect-square max-h-60"
          >
            <svg
              i18n-aria-label="@@charts.chartPages.visitorsByBrowser"
              scChartPlot
              categoryKey="browser"
              aria-label="Visitors by browser"
            >
              <g scChartPie key="visitors" />
            </svg>
            <app-chart-tooltip hideLabel />
          </div>
        </div>
      </div>
      <div scCard>
        <div scCardHeader>
          <h2 i18n="@@charts.chartPages.donut" scCardTitle>Donut</h2>
          <p i18n="@@charts.chartPages.withALegend" scCardDescription>
            With a legend
          </p>
        </div>
        <div scCardBody>
          <div
            scChart
            [config]="browserConfig"
            [data]="browsers"
            class="mx-auto aspect-square max-h-60"
          >
            <svg
              i18n-aria-label="@@charts.chartPages.visitorsByBrowser"
              scChartPlot
              categoryKey="browser"
              aria-label="Visitors by browser"
            >
              <g
                scChartPie
                key="visitors"
                [innerRadius]="0.6"
                [padAngle]="1"
                [strokeWidth]="0"
              />
            </svg>
            <app-chart-tooltip hideLabel />
            <app-chart-legend />
          </div>
        </div>
      </div>
      <div scCard>
        <div scCardHeader>
          <h2 i18n="@@charts.chartPages.donutWithTotal" scCardTitle>
            Donut with total
          </h2>
          <p i18n="@@charts.chartPages.theSumInTheMiddle" scCardDescription>
            The sum in the middle
          </p>
        </div>
        <div scCardBody>
          <div
            scChart
            [config]="browserConfig"
            [data]="browsers"
            class="mx-auto aspect-square max-h-60"
          >
            <svg
              i18n-aria-label="@@charts.chartPages.visitorsByBrowser"
              scChartPlot
              categoryKey="browser"
              aria-label="Visitors by browser"
            >
              <g
                scChartPie
                key="visitors"
                [innerRadius]="0.6"
                [strokeWidth]="0"
              />
              <g scChartCenter>
                <text
                  text-anchor="middle"
                  class="fill-foreground text-3xl font-bold"
                >
                  {{ f.count(total) }}
                </text>
                <text
                  text-anchor="middle"
                  dy="1.6em"
                  class="fill-muted-foreground"
                >
                  {{ visitorsLabel }}
                </text>
              </g>
            </svg>
            <app-chart-tooltip hideLabel />
          </div>
        </div>
      </div>
      <div scCard>
        <div scCardHeader>
          <h2 i18n="@@charts.chartPages.labelled" scCardTitle>Labelled</h2>
          <p i18n="@@charts.chartPages.valuesOutside" scCardDescription>
            Values outside
          </p>
        </div>
        <div scCardBody>
          <div
            scChart
            [config]="browserConfig"
            [data]="browsers"
            class="mx-auto aspect-square max-h-60"
          >
            <svg
              i18n-aria-label="@@charts.chartPages.visitorsByBrowser"
              scChartPlot
              categoryKey="browser"
              [margin]="{ top: 24, right: 40, bottom: 24, left: 40 }"
              aria-label="Visitors by browser"
            >
              <g scChartPie key="visitors">
                <g scChartLabels position="outside" [offset]="12" />
              </g>
            </svg>
            <app-chart-tooltip hideLabel />
          </div>
        </div>
      </div>
    </div>
  `,
  host: { class: 'flex flex-col gap-4' },
  encapsulation: ViewEncapsulation.None,
})
export class PieChartsPage extends ChartPage {
  /** In the user's numbering system. */

  /** The template's words that sit in bindings, translated. */
  private readonly t = {
    charts: $localize`:@@charts.chartPages.charts:Charts`,
    pieDonut: $localize`:@@charts.chartPages.pieDonut:Pie & Donut`,
  };
}

/** Radar charts (Pro): one series, two, as lines. */
@Component({
  selector: 'app-radar-charts-page',
  imports: [
    ...CARD_IMPORTS,
    ScChart,
    ScChartPlot,
    ScChartPolarAngleAxis,
    ScChartPolarGrid,
    ScChartRadar,
    ChartLegend,
    ChartTooltip,
  ],
  template: `
    <app-page-header
      i18n-title="@@charts.chartPages.radarCharts"
      title="Radar Charts"
      [trail]="[{ label: t.charts }, { label: t.radar }]"
    />
    <div class="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      <div scCard>
        <div scCardHeader>
          <h2 i18n="@@charts.chartPages.radar" scCardTitle>Radar</h2>
          <p i18n="@@charts.chartPages.desktopVisitors" scCardDescription>
            Desktop visitors
          </p>
        </div>
        <div scCardBody>
          <div
            scChart
            [config]="desktopOnly"
            [data]="months"
            class="mx-auto aspect-square max-h-64"
          >
            <svg
              i18n-aria-label="@@charts.chartPages.desktopVisitorsByMonth"
              scChartPlot
              categoryKey="month"
              aria-label="Desktop visitors by month"
            >
              <g scChartPolarGrid />
              <g scChartPolarAngleAxis [tickFormatter]="short" />
              <g scChartRadar key="desktop" dots />
            </svg>
            <app-chart-tooltip />
          </div>
        </div>
      </div>
      <div scCard>
        <div scCardHeader>
          <h2 i18n="@@charts.chartPages.twoSeries" scCardTitle>Two series</h2>
          <p i18n="@@charts.chartPages.desktopAndMobile" scCardDescription>
            Desktop and mobile
          </p>
        </div>
        <div scCardBody>
          <div
            scChart
            [config]="devices"
            [data]="months"
            class="mx-auto aspect-square max-h-64"
          >
            <svg
              i18n-aria-label="@@charts.chartPages.visitorsByDeviceAndMonth"
              scChartPlot
              categoryKey="month"
              aria-label="Visitors by device and month"
            >
              <g scChartPolarGrid />
              <g scChartPolarAngleAxis [tickFormatter]="short" />
              <g scChartRadar key="desktop" />
              <g scChartRadar key="mobile" />
            </svg>
            <app-chart-tooltip />
            <app-chart-legend />
          </div>
        </div>
      </div>
      <div scCard>
        <div scCardHeader>
          <h2 i18n="@@charts.chartPages.lines" scCardTitle>Lines</h2>
          <p i18n="@@charts.chartPages.onARoundGrid" scCardDescription>
            On a round grid
          </p>
        </div>
        <div scCardBody>
          <div
            scChart
            [config]="devices"
            [data]="months"
            class="mx-auto aspect-square max-h-64"
          >
            <svg
              i18n-aria-label="@@charts.chartPages.visitorsByDeviceAndMonth"
              scChartPlot
              categoryKey="month"
              aria-label="Visitors by device and month"
            >
              <g scChartPolarGrid shape="circle" />
              <g scChartPolarAngleAxis [tickFormatter]="short" />
              <g scChartRadar key="desktop" stroke [fillOpacity]="0" />
              <g scChartRadar key="mobile" stroke [fillOpacity]="0" />
            </svg>
            <app-chart-tooltip indicator="line" />
          </div>
        </div>
      </div>
    </div>
  `,
  host: { class: 'flex flex-col gap-4' },
  encapsulation: ViewEncapsulation.None,
})
export class RadarChartsPage extends ChartPage {
  /** The template's words that sit in bindings, translated. */
  private readonly t = {
    charts: $localize`:@@charts.chartPages.charts:Charts`,
    radar: $localize`:@@charts.chartPages.radar:Radar`,
  };
}

/** Radial charts (Pro): rings, with their track, labelled. */
@Component({
  selector: 'app-radial-charts-page',
  imports: [
    ...CARD_IMPORTS,
    ScChart,
    ScChartLabels,
    ScChartPlot,
    ScChartRadialBar,
    ChartLegend,
    ChartTooltip,
  ],
  template: `
    <app-page-header
      i18n-title="@@charts.chartPages.radialCharts"
      title="Radial Charts"
      [trail]="[{ label: t.charts }, { label: t.radial }]"
    />
    <div class="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      <div scCard>
        <div scCardHeader>
          <h2 i18n="@@charts.chartPages.radial" scCardTitle>Radial</h2>
          <p i18n="@@charts.chartPages.oneRingPerBrowser" scCardDescription>
            One ring per browser
          </p>
        </div>
        <div scCardBody>
          <div
            scChart
            [config]="browserConfig"
            [data]="browsers"
            class="mx-auto aspect-square max-h-64"
          >
            <svg
              i18n-aria-label="@@charts.chartPages.visitorsByBrowser"
              scChartPlot
              categoryKey="browser"
              aria-label="Visitors by browser"
            >
              <g scChartRadialBar key="visitors" colorBy="category" />
            </svg>
            <app-chart-tooltip hideLabel />
          </div>
        </div>
      </div>
      <div scCard>
        <div scCardHeader>
          <h2 i18n="@@charts.chartPages.withATrack" scCardTitle>
            With a track
          </h2>
          <p i18n="@@charts.chartPages.andALegend" scCardDescription>
            And a legend
          </p>
        </div>
        <div scCardBody>
          <div
            scChart
            [config]="browserConfig"
            [data]="browsers"
            class="mx-auto aspect-square max-h-64"
          >
            <svg
              i18n-aria-label="@@charts.chartPages.visitorsByBrowser"
              scChartPlot
              categoryKey="browser"
              aria-label="Visitors by browser"
            >
              <g scChartRadialBar key="visitors" colorBy="category" track />
            </svg>
            <app-chart-tooltip hideLabel />
            <app-chart-legend />
          </div>
        </div>
      </div>
      <div scCard>
        <div scCardHeader>
          <h2 i18n="@@charts.chartPages.labelled" scCardTitle>Labelled</h2>
          <p i18n="@@charts.chartPages.eachRingNamed" scCardDescription>
            Each ring named
          </p>
        </div>
        <div scCardBody>
          <div
            scChart
            [config]="browserConfig"
            [data]="browsers"
            class="mx-auto aspect-square max-h-64"
          >
            <svg
              i18n-aria-label="@@charts.chartPages.visitorsByBrowser"
              scChartPlot
              categoryKey="browser"
              aria-label="Visitors by browser"
              [startAngle]="-90"
              [endAngle]="380"
            >
              <g scChartRadialBar key="visitors" colorBy="category" track>
                <g
                  scChartLabels
                  position="start"
                  class="fill-white capitalize mix-blend-difference"
                  [formatter]="name"
                />
              </g>
            </svg>
            <app-chart-tooltip hideLabel />
          </div>
        </div>
      </div>
    </div>
  `,
  host: { class: 'flex flex-col gap-4' },
  encapsulation: ViewEncapsulation.None,
})
export class RadialChartsPage extends ChartPage {
  /** The template's words that sit in bindings, translated. */
  private readonly t = {
    charts: $localize`:@@charts.chartPages.charts:Charts`,
    radial: $localize`:@@charts.chartPages.radial:Radial`,
  };
}
