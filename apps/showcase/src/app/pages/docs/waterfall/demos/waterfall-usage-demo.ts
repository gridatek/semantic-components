import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScWaterfall,
  ScWaterfallAxis,
  ScWaterfallBar,
  type ScWaterfallBarLabel,
  ScWaterfallCell,
  ScWaterfallColumnHeader,
  ScWaterfallHeaderRow,
  ScWaterfallIndicator,
  type ScWaterfallItem,
  ScWaterfallMark,
  ScWaterfallRow,
  ScWaterfallRowHeader,
} from '@semantic-components/ui';
import { SiChevronRightIcon } from '@semantic-icons/lucide-icons';

/** A page's requests on a shared time axis: a header, the axis (5 round times), a mark across the rows, a size column; each bar says its times and size. */
@Component({
  selector: 'app-waterfall-usage-demo',
  imports: [
    ScWaterfall,
    ScWaterfallAxis,
    ScWaterfallBar,
    ScWaterfallColumnHeader,
    ScWaterfallHeaderRow,
    ScWaterfallIndicator,
    ScWaterfallRow,
    ScWaterfallRowHeader,
    ScWaterfallCell,
    ScWaterfallMark,
    SiChevronRightIcon,
  ],
  template: `
    <!-- Its box scrolls sideways where its columns don't fit (a phone). -->
    <div class="w-full max-w-2xl overflow-x-auto">
      <div
        scWaterfall
        #waterfall="scWaterfall"
        aria-label="Network requests"
        class="min-w-max"
        [items]="requests"
        [barLabel]="label"
      >
        <div scWaterfallHeaderRow>
          <div scWaterfallColumnHeader class="w-48">Name</div>
          <div scWaterfallColumnHeader class="w-20">Size</div>
          <div
            scWaterfallColumnHeader
            aria-label="Timeline"
            class="min-w-24 flex-1"
          >
            <div scWaterfallAxis [maxTicks]="5">
              <span scWaterfallMark [time]="620">DOMContentLoaded</span>
            </div>
          </div>
        </div>
        @for (row of waterfall.rows(); track row.item.value) {
          <div scWaterfallRow [row]="row">
            <div scWaterfallRowHeader>
              <button scWaterfallIndicator>
                <svg siChevronRightIcon></svg>
              </button>
              {{ row.item.label }}
            </div>
            <div scWaterfallCell class="w-20 tabular-nums">
              {{ sizes[row.item.value] }}
            </div>
            <div scWaterfallBar></div>
          </div>
        }
      </div>
    </div>
  `,
  host: { class: 'flex w-full justify-center pt-4' },
  encapsulation: ViewEncapsulation.None,
})
export class WaterfallUsageDemo {
  private readonly requests: ScWaterfallItem[] = [
    { value: 'document', label: 'index.html', start: 0, duration: 180 },
    { value: 'styles', label: 'styles.css', start: 190, duration: 140 },
    { value: 'main', label: 'main.js', start: 200, duration: 380 },
    { value: 'font', label: 'inter.woff2', start: 340, duration: 120 },
    { value: 'api', label: '/api/session', start: 590, duration: 260 },
    { value: 'image', label: 'hero.avif', start: 700, duration: 420 },
  ];
  private readonly sizes: Record<string, string> = {
    document: '14 kB',
    styles: '32 kB',
    main: '184 kB',
    font: '48 kB',
    api: '2 kB',
    image: '96 kB',
  };
  private readonly label: ScWaterfallBarLabel = (item, { range }) =>
    `${range}, ${this.sizes[item.value]}`;
}
