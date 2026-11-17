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
import { axisLabel } from '../../shared/format';

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
  desktop: { label: $localize`Desktop`, color: 'var(--chart-2)' },
  mobile: { label: $localize`Mobile`, color: 'var(--chart-4)' },
};

const BROWSER_CONFIG: ScChartConfig = {
  visitors: { label: $localize`Visitors` },
  chrome: { label: $localize`Chrome`, color: 'var(--chart-1)' },
  safari: { label: $localize`Safari`, color: 'var(--chart-2)' },
  firefox: { label: $localize`Firefox`, color: 'var(--chart-3)' },
  edge: { label: $localize`Edge`, color: 'var(--chart-4)' },
  other: { label: $localize`Other`, color: 'var(--chart-5)' },
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
  /** The donut's centre word: SVG text, so not an i18n element. */
  protected readonly visitorsLabel = $localize`Visitors`;
  protected readonly months = MONTHS.map((row) => ({
    ...row,
    month: axisLabel(row.month),
  }));
  protected readonly browsers = BROWSERS.map((row) => ({ ...row }));
  protected readonly devices = DEVICES;
  protected readonly desktopOnly: ScChartConfig = {
    desktop: DEVICES['desktop'],
  };
  protected readonly browserConfig = BROWSER_CONFIG;
  protected readonly total = BROWSERS.reduce(
    (sum, row) => sum + row.visitors,
    0,
  );
  /** The months are short already (axisLabel). */
  protected readonly short = (month: string) => month;
  protected readonly name = (_: number, category: string) => category;
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
      i18n-title
      title="Line Charts"
      [trail]="[{ label: t.charts }, { label: t.line }]"
    />
    <div class="grid gap-4 lg:grid-cols-2">
      <div scCard>
        <div scCardHeader>
          <h2 i18n scCardTitle>Line</h2>
          <p i18n scCardDescription>Desktop visitors</p>
        </div>
        <div scCardBody>
          <div
            scChart
            [config]="desktopOnly"
            [data]="months"
            class="h-64 w-full"
          >
            <svg
              i18n-aria-label
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
          <h2 i18n scCardTitle>Two lines</h2>
          <p i18n scCardDescription>Desktop and mobile</p>
        </div>
        <div scCardBody>
          <div scChart [config]="devices" [data]="months" class="h-64 w-full">
            <svg
              i18n-aria-label
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
          <h2 i18n scCardTitle>With dots</h2>
          <p i18n scCardDescription>Each month marked</p>
        </div>
        <div scCardBody>
          <div
            scChart
            [config]="desktopOnly"
            [data]="months"
            class="h-64 w-full"
          >
            <svg
              i18n-aria-label
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
          <h2 i18n scCardTitle>Steps</h2>
          <p i18n scCardDescription>Changes as steps</p>
        </div>
        <div scCardBody>
          <div
            scChart
            [config]="desktopOnly"
            [data]="months"
            class="h-64 w-full"
          >
            <svg
              i18n-aria-label
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
    charts: $localize`Charts`,
    line: $localize`Line`,
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
      i18n-title
      title="Area Charts"
      [trail]="[{ label: t.charts }, { label: t.area }]"
    />
    <div class="grid gap-4 lg:grid-cols-2">
      <div scCard>
        <div scCardHeader>
          <h2 i18n scCardTitle>Area</h2>
          <p i18n scCardDescription>Desktop visitors</p>
        </div>
        <div scCardBody>
          <div
            scChart
            [config]="desktopOnly"
            [data]="months"
            class="h-64 w-full"
          >
            <svg
              i18n-aria-label
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
          <h2 i18n scCardTitle>Stacked</h2>
          <p i18n scCardDescription>Mobile under desktop</p>
        </div>
        <div scCardBody>
          <div scChart [config]="devices" [data]="months" class="h-64 w-full">
            <svg
              i18n-aria-label
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
          <h2 i18n scCardTitle>With a scale</h2>
          <p i18n scCardDescription>Values along the side</p>
        </div>
        <div scCardBody>
          <div scChart [config]="devices" [data]="months" class="h-64 w-full">
            <svg
              i18n-aria-label
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
          <h2 i18n scCardTitle>Steps</h2>
          <p i18n scCardDescription>Changes as steps</p>
        </div>
        <div scCardBody>
          <div
            scChart
            [config]="desktopOnly"
            [data]="months"
            class="h-64 w-full"
          >
            <svg
              i18n-aria-label
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
    charts: $localize`Charts`,
    area: $localize`Area`,
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
      i18n-title
      title="Bar Charts"
      [trail]="[{ label: t.charts }, { label: t.bar }]"
    />
    <div class="grid gap-4 lg:grid-cols-2">
      <div scCard>
        <div scCardHeader>
          <h2 i18n scCardTitle>Bar</h2>
          <p i18n scCardDescription>Desktop visitors</p>
        </div>
        <div scCardBody>
          <div
            scChart
            [config]="desktopOnly"
            [data]="months"
            class="h-64 w-full"
          >
            <svg
              i18n-aria-label
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
          <h2 i18n scCardTitle>Side by side</h2>
          <p i18n scCardDescription>Desktop and mobile</p>
        </div>
        <div scCardBody>
          <div scChart [config]="devices" [data]="months" class="h-64 w-full">
            <svg
              i18n-aria-label
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
          <h2 i18n scCardTitle>Stacked</h2>
          <p i18n scCardDescription>One bar per month</p>
        </div>
        <div scCardBody>
          <div scChart [config]="devices" [data]="months" class="h-64 w-full">
            <svg
              i18n-aria-label
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
          <h2 i18n scCardTitle>Across</h2>
          <p i18n scCardDescription>Bars from the side</p>
        </div>
        <div scCardBody>
          <div
            scChart
            [config]="desktopOnly"
            [data]="months"
            class="h-64 w-full"
          >
            <svg
              i18n-aria-label
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
    charts: $localize`Charts`,
    bar: $localize`Bar`,
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
      i18n-title
      title="Pie & Donut Charts"
      [trail]="[{ label: t.charts }, { label: t.pieDonut }]"
    />
    <div class="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      <div scCard>
        <div scCardHeader>
          <h2 i18n scCardTitle>Pie</h2>
          <p i18n scCardDescription>Visitors by browser</p>
        </div>
        <div scCardBody>
          <div
            scChart
            [config]="browserConfig"
            [data]="browsers"
            class="mx-auto aspect-square max-h-60"
          >
            <svg
              i18n-aria-label
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
          <h2 i18n scCardTitle>Donut</h2>
          <p i18n scCardDescription>With a legend</p>
        </div>
        <div scCardBody>
          <div
            scChart
            [config]="browserConfig"
            [data]="browsers"
            class="mx-auto aspect-square max-h-60"
          >
            <svg
              i18n-aria-label
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
          <h2 i18n scCardTitle>Donut with total</h2>
          <p i18n scCardDescription>The sum in the middle</p>
        </div>
        <div scCardBody>
          <div
            scChart
            [config]="browserConfig"
            [data]="browsers"
            class="mx-auto aspect-square max-h-60"
          >
            <svg
              i18n-aria-label
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
                  {{ total }}
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
          <h2 i18n scCardTitle>Labelled</h2>
          <p i18n scCardDescription>Values outside</p>
        </div>
        <div scCardBody>
          <div
            scChart
            [config]="browserConfig"
            [data]="browsers"
            class="mx-auto aspect-square max-h-60"
          >
            <svg
              i18n-aria-label
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
  /** The template's words that sit in bindings, translated. */
  private readonly t = {
    charts: $localize`Charts`,
    pieDonut: $localize`Pie & Donut`,
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
      i18n-title
      title="Radar Charts"
      [trail]="[{ label: t.charts }, { label: t.radar }]"
    />
    <div class="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      <div scCard>
        <div scCardHeader>
          <h2 i18n scCardTitle>Radar</h2>
          <p i18n scCardDescription>Desktop visitors</p>
        </div>
        <div scCardBody>
          <div
            scChart
            [config]="desktopOnly"
            [data]="months"
            class="mx-auto aspect-square max-h-64"
          >
            <svg
              i18n-aria-label
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
          <h2 i18n scCardTitle>Two series</h2>
          <p i18n scCardDescription>Desktop and mobile</p>
        </div>
        <div scCardBody>
          <div
            scChart
            [config]="devices"
            [data]="months"
            class="mx-auto aspect-square max-h-64"
          >
            <svg
              i18n-aria-label
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
          <h2 i18n scCardTitle>Lines</h2>
          <p i18n scCardDescription>On a round grid</p>
        </div>
        <div scCardBody>
          <div
            scChart
            [config]="devices"
            [data]="months"
            class="mx-auto aspect-square max-h-64"
          >
            <svg
              i18n-aria-label
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
    charts: $localize`Charts`,
    radar: $localize`Radar`,
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
      i18n-title
      title="Radial Charts"
      [trail]="[{ label: t.charts }, { label: t.radial }]"
    />
    <div class="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      <div scCard>
        <div scCardHeader>
          <h2 i18n scCardTitle>Radial</h2>
          <p i18n scCardDescription>One ring per browser</p>
        </div>
        <div scCardBody>
          <div
            scChart
            [config]="browserConfig"
            [data]="browsers"
            class="mx-auto aspect-square max-h-64"
          >
            <svg
              i18n-aria-label
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
          <h2 i18n scCardTitle>With a track</h2>
          <p i18n scCardDescription>And a legend</p>
        </div>
        <div scCardBody>
          <div
            scChart
            [config]="browserConfig"
            [data]="browsers"
            class="mx-auto aspect-square max-h-64"
          >
            <svg
              i18n-aria-label
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
          <h2 i18n scCardTitle>Labelled</h2>
          <p i18n scCardDescription>Each ring named</p>
        </div>
        <div scCardBody>
          <div
            scChart
            [config]="browserConfig"
            [data]="browsers"
            class="mx-auto aspect-square max-h-64"
          >
            <svg
              i18n-aria-label
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
    charts: $localize`Charts`,
    radial: $localize`Radial`,
  };
}
