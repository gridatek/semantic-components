import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScChart,
  ScChartCategoryAxis,
  type ScChartConfig,
  ScChartGrid,
  ScChartPlot,
  ScChartScatter,
  ScChartTooltip,
  ScChartValueAxis,
} from '@semantic-components/ui/charts';

@Component({
  selector: 'app-bubble-scatter-chart-demo',
  imports: [
    ScChart,
    ScChartPlot,
    ScChartGrid,
    ScChartCategoryAxis,
    ScChartValueAxis,
    ScChartScatter,
    ScChartTooltip,
  ],
  template: `
    <div scChart class="aspect-video max-h-72" [config]="config" [data]="data">
      <svg
        scChartPlot
        categoryKey="city"
        aria-label="Rent and salary by city, sized by population"
      >
        <g scChartGrid [vertical]="true" />
        <g scChartCategoryAxis />
        <g scChartValueAxis />
        <g
          scChartScatter
          key="rent"
          xKey="salary"
          sizeKey="population"
          [radius]="16"
        />
      </svg>
      <div scChartTooltip></div>
    </div>
  `,
  host: { class: 'block w-full max-w-xl' },
  encapsulation: ViewEncapsulation.None,
})
export class BubbleScatterChartDemo {
  readonly data = [
    { city: 'Lisbon', salary: 1600, rent: 1100, population: 3 },
    { city: 'Madrid', salary: 2100, rent: 1250, population: 7 },
    { city: 'Paris', salary: 3000, rent: 1500, population: 11 },
    { city: 'Berlin', salary: 3200, rent: 1300, population: 4 },
    { city: 'Amsterdam', salary: 3400, rent: 1900, population: 2 },
    { city: 'London', salary: 3600, rent: 2200, population: 9 },
    { city: 'Zurich', salary: 6500, rent: 2600, population: 1 },
  ];
  readonly config: ScChartConfig = {
    salary: { label: 'Salary (€)' },
    rent: { label: 'Rent (€)', color: 'var(--chart-2)' },
    population: { label: 'Population (M)' },
  };
}
