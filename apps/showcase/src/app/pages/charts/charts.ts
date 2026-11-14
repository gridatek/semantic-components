import { Component, ViewEncapsulation } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ScLink } from '@semantic-components/ui';
import { AreaChartDemoContainer } from '../docs/area-chart/demos/area-chart-demo-container';
import { ExpandedAreaChartDemoContainer } from '../docs/area-chart/demos/expanded-area-chart-demo-container';
import { InteractiveAreaChartDemoContainer } from '../docs/area-chart/demos/interactive-area-chart-demo-container';
import { StackedAreaChartDemoContainer } from '../docs/area-chart/demos/stacked-area-chart-demo-container';
import { BarChartDemoContainer } from '../docs/bar-chart/demos/bar-chart-demo-container';
import { CustomLabelBarChartDemoContainer } from '../docs/bar-chart/demos/custom-label-bar-chart-demo-container';
import { HorizontalBarChartDemoContainer } from '../docs/bar-chart/demos/horizontal-bar-chart-demo-container';
import { LabelBarChartDemoContainer } from '../docs/bar-chart/demos/label-bar-chart-demo-container';
import { MultipleBarChartDemoContainer } from '../docs/bar-chart/demos/multiple-bar-chart-demo-container';
import { NegativeBarChartDemoContainer } from '../docs/bar-chart/demos/negative-bar-chart-demo-container';
import { StackedBarChartDemoContainer } from '../docs/bar-chart/demos/stacked-bar-chart-demo-container';
import { TooltipChartDemoContainer } from '../docs/chart/demos/tooltip-chart-demo-container';
import { FunnelChartDemoContainer } from '../docs/funnel-chart/demos/funnel-chart-demo-container';
import { LabelFunnelChartDemoContainer } from '../docs/funnel-chart/demos/label-funnel-chart-demo-container';
import { LabelLineChartDemoContainer } from '../docs/line-chart/demos/label-line-chart-demo-container';
import { LineChartDemoContainer } from '../docs/line-chart/demos/line-chart-demo-container';
import { MultipleLineChartDemoContainer } from '../docs/line-chart/demos/multiple-line-chart-demo-container';
import { StepLineChartDemoContainer } from '../docs/line-chart/demos/step-line-chart-demo-container';
import { DonutChartDemoContainer } from '../docs/pie-chart/demos/donut-chart-demo-container';
import { LabelPieChartDemoContainer } from '../docs/pie-chart/demos/label-pie-chart-demo-container';
import { PieChartDemoContainer } from '../docs/pie-chart/demos/pie-chart-demo-container';
import { StackedPieChartDemoContainer } from '../docs/pie-chart/demos/stacked-pie-chart-demo-container';
import { LinesRadarChartDemoContainer } from '../docs/radar-chart/demos/lines-radar-chart-demo-container';
import { MultipleRadarChartDemoContainer } from '../docs/radar-chart/demos/multiple-radar-chart-demo-container';
import { RadarChartDemoContainer } from '../docs/radar-chart/demos/radar-chart-demo-container';
import { GridRadialChartDemoContainer } from '../docs/radial-chart/demos/grid-radial-chart-demo-container';
import { LabelRadialChartDemoContainer } from '../docs/radial-chart/demos/label-radial-chart-demo-container';
import { RadialChartDemoContainer } from '../docs/radial-chart/demos/radial-chart-demo-container';
import { StackedRadialChartDemoContainer } from '../docs/radial-chart/demos/stacked-radial-chart-demo-container';
import { SankeyChartDemoContainer } from '../docs/sankey-chart/demos/sankey-chart-demo-container';
import { BubbleScatterChartDemoContainer } from '../docs/scatter-chart/demos/bubble-scatter-chart-demo-container';
import { ScatterChartDemoContainer } from '../docs/scatter-chart/demos/scatter-chart-demo-container';
import { LabelSunburstChartDemoContainer } from '../docs/sunburst-chart/demos/label-sunburst-chart-demo-container';
import { SunburstChartDemoContainer } from '../docs/sunburst-chart/demos/sunburst-chart-demo-container';
import { GroupedTreemapChartDemoContainer } from '../docs/treemap-chart/demos/grouped-treemap-chart-demo-container';
import { TreemapChartDemoContainer } from '../docs/treemap-chart/demos/treemap-chart-demo-container';

/**
 * Charts: every chart example, by type — as shadcn's gallery — each with its
 * code to copy, and a link to its type's docs.
 */
@Component({
  selector: 'app-charts',
  imports: [
    RouterLink,
    ScLink,
    AreaChartDemoContainer,
    StackedAreaChartDemoContainer,
    ExpandedAreaChartDemoContainer,
    InteractiveAreaChartDemoContainer,
    BarChartDemoContainer,
    MultipleBarChartDemoContainer,
    StackedBarChartDemoContainer,
    NegativeBarChartDemoContainer,
    HorizontalBarChartDemoContainer,
    LabelBarChartDemoContainer,
    CustomLabelBarChartDemoContainer,
    LineChartDemoContainer,
    MultipleLineChartDemoContainer,
    StepLineChartDemoContainer,
    LabelLineChartDemoContainer,
    PieChartDemoContainer,
    DonutChartDemoContainer,
    StackedPieChartDemoContainer,
    LabelPieChartDemoContainer,
    RadarChartDemoContainer,
    MultipleRadarChartDemoContainer,
    LinesRadarChartDemoContainer,
    RadialChartDemoContainer,
    StackedRadialChartDemoContainer,
    GridRadialChartDemoContainer,
    LabelRadialChartDemoContainer,
    ScatterChartDemoContainer,
    BubbleScatterChartDemoContainer,
    FunnelChartDemoContainer,
    LabelFunnelChartDemoContainer,
    TreemapChartDemoContainer,
    GroupedTreemapChartDemoContainer,
    SunburstChartDemoContainer,
    LabelSunburstChartDemoContainer,
    SankeyChartDemoContainer,
    TooltipChartDemoContainer,
  ],
  template: `
    <section
      class="flex flex-col items-center gap-2 px-6 py-8 text-center md:py-16 lg:py-20 xl:gap-4"
    >
      <h1
        class="text-primary max-w-4xl text-3xl leading-tight font-semibold tracking-tight text-balance lg:leading-[1.1] xl:text-5xl xl:tracking-tighter"
      >
        Charts
      </h1>
      <p class="text-foreground max-w-2xl text-base text-balance sm:text-lg">
        Charts made of parts, in your preset's look: area, bar, line, pie,
        radar, radial and more. Copy them into your app.
      </p>
      <div class="flex flex-wrap justify-center gap-2 pt-2">
        <a
          scLink
          variant="button"
          size="sm"
          routerLink="/docs/components/chart"
        >
          Get started
        </a>
      </div>
    </section>

    <nav
      aria-label="Chart types"
      class="bg-background/95 sticky top-14 z-10 border-y backdrop-blur"
    >
      <div
        class="mx-auto flex w-full max-w-6xl gap-1 overflow-x-auto px-4 py-2"
      >
        <a
          scLink
          variant="ghost"
          size="sm"
          routerLink="/charts"
          fragment="area-chart"
          >Area</a
        >
        <a
          scLink
          variant="ghost"
          size="sm"
          routerLink="/charts"
          fragment="bar-chart"
          >Bar</a
        >
        <a
          scLink
          variant="ghost"
          size="sm"
          routerLink="/charts"
          fragment="line-chart"
          >Line</a
        >
        <a
          scLink
          variant="ghost"
          size="sm"
          routerLink="/charts"
          fragment="pie-chart"
          >Pie</a
        >
        <a
          scLink
          variant="ghost"
          size="sm"
          routerLink="/charts"
          fragment="radar-chart"
          >Radar</a
        >
        <a
          scLink
          variant="ghost"
          size="sm"
          routerLink="/charts"
          fragment="radial-chart"
          >Radial</a
        >
        <a
          scLink
          variant="ghost"
          size="sm"
          routerLink="/charts"
          fragment="scatter-chart"
          >Scatter</a
        >
        <a
          scLink
          variant="ghost"
          size="sm"
          routerLink="/charts"
          fragment="funnel-chart"
          >Funnel</a
        >
        <a
          scLink
          variant="ghost"
          size="sm"
          routerLink="/charts"
          fragment="treemap-chart"
          >Treemap</a
        >
        <a
          scLink
          variant="ghost"
          size="sm"
          routerLink="/charts"
          fragment="sunburst-chart"
          >Sunburst</a
        >
        <a
          scLink
          variant="ghost"
          size="sm"
          routerLink="/charts"
          fragment="sankey-chart"
          >Sankey</a
        >
        <a
          scLink
          variant="ghost"
          size="sm"
          routerLink="/charts"
          fragment="chart"
          >Tooltip</a
        >
      </div>
    </nav>

    <div class="mx-auto w-full max-w-6xl px-4 pb-16">
      <section class="relative py-8" aria-labelledby="area-chart-title">
        <!-- Where a type's link stops: above the section by the site's header and
        the types' bar (the router scrolls to the element itself). -->
        <div id="area-chart" class="absolute -top-20" aria-hidden="true"></div>
        <div class="flex flex-wrap items-end justify-between gap-2 pb-4">
          <div class="flex flex-col gap-1">
            <h2
              id="area-chart-title"
              class="text-2xl font-semibold tracking-tight"
            >
              Area Charts
            </h2>
            <p class="text-muted-foreground text-sm">
              Series as areas, stacked or not, to 100% if you like; a time range
              to pick.
            </p>
          </div>
          <a scLink routerLink="/docs/components/area-chart">Docs</a>
        </div>
        <div class="grid gap-8 lg:grid-cols-2">
          <app-area-chart-demo-container />
          <app-stacked-area-chart-demo-container />
          <app-expanded-area-chart-demo-container />
          <app-interactive-area-chart-demo-container />
        </div>
      </section>

      <section class="relative py-8" aria-labelledby="bar-chart-title">
        <!-- Where a type's link stops: above the section by the site's header and
        the types' bar (the router scrolls to the element itself). -->
        <div id="bar-chart" class="absolute -top-20" aria-hidden="true"></div>
        <div class="flex flex-wrap items-end justify-between gap-2 pb-4">
          <div class="flex flex-col gap-1">
            <h2
              id="bar-chart-title"
              class="text-2xl font-semibold tracking-tight"
            >
              Bar Charts
            </h2>
            <p class="text-muted-foreground text-sm">
              Side by side, stacked, below zero, across; labels on them.
            </p>
          </div>
          <a scLink routerLink="/docs/components/bar-chart">Docs</a>
        </div>
        <div class="grid gap-8 lg:grid-cols-2">
          <app-bar-chart-demo-container />
          <app-multiple-bar-chart-demo-container />
          <app-stacked-bar-chart-demo-container />
          <app-negative-bar-chart-demo-container />
          <app-horizontal-bar-chart-demo-container />
          <app-label-bar-chart-demo-container />
          <app-custom-label-bar-chart-demo-container />
        </div>
      </section>

      <section class="relative py-8" aria-labelledby="line-chart-title">
        <!-- Where a type's link stops: above the section by the site's header and
        the types' bar (the router scrolls to the element itself). -->
        <div id="line-chart" class="absolute -top-20" aria-hidden="true"></div>
        <div class="flex flex-wrap items-end justify-between gap-2 pb-4">
          <div class="flex flex-col gap-1">
            <h2
              id="line-chart-title"
              class="text-2xl font-semibold tracking-tight"
            >
              Line Charts
            </h2>
            <p class="text-muted-foreground text-sm">
              Through their values: curved, straight or in steps; labels on the
              points.
            </p>
          </div>
          <a scLink routerLink="/docs/components/line-chart">Docs</a>
        </div>
        <div class="grid gap-8 lg:grid-cols-2">
          <app-line-chart-demo-container />
          <app-multiple-line-chart-demo-container />
          <app-step-line-chart-demo-container />
          <app-label-line-chart-demo-container />
        </div>
      </section>

      <section class="relative py-8" aria-labelledby="pie-chart-title">
        <!-- Where a type's link stops: above the section by the site's header and
        the types' bar (the router scrolls to the element itself). -->
        <div id="pie-chart" class="absolute -top-20" aria-hidden="true"></div>
        <div class="flex flex-wrap items-end justify-between gap-2 pb-4">
          <div class="flex flex-col gap-1">
            <h2
              id="pie-chart-title"
              class="text-2xl font-semibold tracking-tight"
            >
              Pie Charts
            </h2>
            <p class="text-muted-foreground text-sm">
              Slices of a whole: a pie, a donut with its total, rings.
            </p>
          </div>
          <a scLink routerLink="/docs/components/pie-chart">Docs</a>
        </div>
        <div class="grid gap-8 lg:grid-cols-2">
          <app-pie-chart-demo-container />
          <app-donut-chart-demo-container />
          <app-stacked-pie-chart-demo-container />
          <app-label-pie-chart-demo-container />
        </div>
      </section>

      <section class="relative py-8" aria-labelledby="radar-chart-title">
        <!-- Where a type's link stops: above the section by the site's header and
        the types' bar (the router scrolls to the element itself). -->
        <div id="radar-chart" class="absolute -top-20" aria-hidden="true"></div>
        <div class="flex flex-wrap items-end justify-between gap-2 pb-4">
          <div class="flex flex-col gap-1">
            <h2
              id="radar-chart-title"
              class="text-2xl font-semibold tracking-tight"
            >
              Radar Charts
            </h2>
            <p class="text-muted-foreground text-sm">
              Polygons over the categories, on a polygon or circle grid.
            </p>
          </div>
          <a scLink routerLink="/docs/components/radar-chart">Docs</a>
        </div>
        <div class="grid gap-8 lg:grid-cols-2">
          <app-radar-chart-demo-container />
          <app-multiple-radar-chart-demo-container />
          <app-lines-radar-chart-demo-container />
        </div>
      </section>

      <section class="relative py-8" aria-labelledby="radial-chart-title">
        <!-- Where a type's link stops: above the section by the site's header and
        the types' bar (the router scrolls to the element itself). -->
        <div
          id="radial-chart"
          class="absolute -top-20"
          aria-hidden="true"
        ></div>
        <div class="flex flex-wrap items-end justify-between gap-2 pb-4">
          <div class="flex flex-col gap-1">
            <h2
              id="radial-chart-title"
              class="text-2xl font-semibold tracking-tight"
            >
              Radial Charts
            </h2>
            <p class="text-muted-foreground text-sm">
              A ring per row, on its track, stacked on a half circle.
            </p>
          </div>
          <a scLink routerLink="/docs/components/radial-chart">Docs</a>
        </div>
        <div class="grid gap-8 lg:grid-cols-2">
          <app-radial-chart-demo-container />
          <app-stacked-radial-chart-demo-container />
          <app-grid-radial-chart-demo-container />
          <app-label-radial-chart-demo-container />
        </div>
      </section>

      <section class="relative py-8" aria-labelledby="scatter-chart-title">
        <!-- Where a type's link stops: above the section by the site's header and
        the types' bar (the router scrolls to the element itself). -->
        <div
          id="scatter-chart"
          class="absolute -top-20"
          aria-hidden="true"
        ></div>
        <div class="flex flex-wrap items-end justify-between gap-2 pb-4">
          <div class="flex flex-col gap-1">
            <h2
              id="scatter-chart-title"
              class="text-2xl font-semibold tracking-tight"
            >
              Scatter Charts
            </h2>
            <p class="text-muted-foreground text-sm">
              Points at two values, sized by a third: bubbles.
            </p>
          </div>
          <a scLink routerLink="/docs/components/scatter-chart">Docs</a>
        </div>
        <div class="grid gap-8 lg:grid-cols-2">
          <app-scatter-chart-demo-container />
          <app-bubble-scatter-chart-demo-container />
        </div>
      </section>

      <section class="relative py-8" aria-labelledby="funnel-chart-title">
        <!-- Where a type's link stops: above the section by the site's header and
        the types' bar (the router scrolls to the element itself). -->
        <div
          id="funnel-chart"
          class="absolute -top-20"
          aria-hidden="true"
        ></div>
        <div class="flex flex-wrap items-end justify-between gap-2 pb-4">
          <div class="flex flex-col gap-1">
            <h2
              id="funnel-chart-title"
              class="text-2xl font-semibold tracking-tight"
            >
              Funnel Charts
            </h2>
            <p class="text-muted-foreground text-sm">
              Stages narrowing to the next, named and valued.
            </p>
          </div>
          <a scLink routerLink="/docs/components/funnel-chart">Docs</a>
        </div>
        <div class="grid gap-8 lg:grid-cols-2">
          <app-funnel-chart-demo-container />
          <app-label-funnel-chart-demo-container />
        </div>
      </section>

      <section class="relative py-8" aria-labelledby="treemap-chart-title">
        <!-- Where a type's link stops: above the section by the site's header and
        the types' bar (the router scrolls to the element itself). -->
        <div
          id="treemap-chart"
          class="absolute -top-20"
          aria-hidden="true"
        ></div>
        <div class="flex flex-wrap items-end justify-between gap-2 pb-4">
          <div class="flex flex-col gap-1">
            <h2
              id="treemap-chart-title"
              class="text-2xl font-semibold tracking-tight"
            >
              Treemap Charts
            </h2>
            <p class="text-muted-foreground text-sm">
              Boxes as large as their value, in groups if you like.
            </p>
          </div>
          <a scLink routerLink="/docs/components/treemap-chart">Docs</a>
        </div>
        <div class="grid gap-8 lg:grid-cols-2">
          <app-treemap-chart-demo-container />
          <app-grouped-treemap-chart-demo-container />
        </div>
      </section>

      <section class="relative py-8" aria-labelledby="sunburst-chart-title">
        <!-- Where a type's link stops: above the section by the site's header and
        the types' bar (the router scrolls to the element itself). -->
        <div
          id="sunburst-chart"
          class="absolute -top-20"
          aria-hidden="true"
        ></div>
        <div class="flex flex-wrap items-end justify-between gap-2 pb-4">
          <div class="flex flex-col gap-1">
            <h2
              id="sunburst-chart-title"
              class="text-2xl font-semibold tracking-tight"
            >
              Sunburst Charts
            </h2>
            <p class="text-muted-foreground text-sm">
              Groups inside, their rows around them.
            </p>
          </div>
          <a scLink routerLink="/docs/components/sunburst-chart">Docs</a>
        </div>
        <div class="grid gap-8 lg:grid-cols-2">
          <app-sunburst-chart-demo-container />
          <app-label-sunburst-chart-demo-container />
        </div>
      </section>

      <section class="relative py-8" aria-labelledby="sankey-chart-title">
        <!-- Where a type's link stops: above the section by the site's header and
        the types' bar (the router scrolls to the element itself). -->
        <div
          id="sankey-chart"
          class="absolute -top-20"
          aria-hidden="true"
        ></div>
        <div class="flex flex-wrap items-end justify-between gap-2 pb-4">
          <div class="flex flex-col gap-1">
            <h2
              id="sankey-chart-title"
              class="text-2xl font-semibold tracking-tight"
            >
              Sankey Charts
            </h2>
            <p class="text-muted-foreground text-sm">
              Flows between nodes, as thick as their value.
            </p>
          </div>
          <a scLink routerLink="/docs/components/sankey-chart">Docs</a>
        </div>
        <div class="grid gap-8 lg:grid-cols-2">
          <app-sankey-chart-demo-container />
        </div>
      </section>

      <section class="relative py-8" aria-labelledby="chart-title">
        <!-- Where a type's link stops: above the section by the site's header and
        the types' bar (the router scrolls to the element itself). -->
        <div id="chart" class="absolute -top-20" aria-hidden="true"></div>
        <div class="flex flex-wrap items-end justify-between gap-2 pb-4">
          <div class="flex flex-col gap-1">
            <h2 id="chart-title" class="text-2xl font-semibold tracking-tight">
              Tooltip
            </h2>
            <p class="text-muted-foreground text-sm">
              The tooltip and the legend every chart shares: a dot, a line or a
              dash.
            </p>
          </div>
          <a scLink routerLink="/docs/components/chart">Docs</a>
        </div>
        <div class="grid gap-8 lg:grid-cols-2">
          <app-tooltip-chart-demo-container />
        </div>
      </section>
    </div>
  `,
  host: { class: 'block' },
  encapsulation: ViewEncapsulation.None,
})
export default class Charts {}
