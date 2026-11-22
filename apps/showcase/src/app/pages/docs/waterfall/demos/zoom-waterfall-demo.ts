import { Component, ViewEncapsulation, signal } from '@angular/core';
import {
  ScButton,
  ScWaterfall,
  ScWaterfallAxis,
  ScWaterfallBar,
  ScWaterfallColumnHeader,
  ScWaterfallHeaderRow,
  ScWaterfallIndicator,
  type ScWaterfallItem,
  ScWaterfallRow,
  ScWaterfallRowHeader,
} from '@semantic-components/ui';
import { SiChevronRightIcon } from '@semantic-icons/lucide-icons';

/** range: the time shown — zoom in, out, reset; bars and ticks follow, a bar out of it held to its edge. */
@Component({
  selector: 'app-zoom-waterfall-demo',
  imports: [
    ScWaterfall,
    ScWaterfallAxis,
    ScWaterfallBar,
    ScWaterfallColumnHeader,
    ScWaterfallHeaderRow,
    ScWaterfallIndicator,
    ScWaterfallRow,
    ScWaterfallRowHeader,
    ScButton,
    SiChevronRightIcon,
  ],
  template: `
    <div class="grid w-full max-w-2xl gap-3">
      <div class="flex gap-2">
        <button scButton variant="outline" size="sm" (click)="zoom(0.5)">
          Zoom in
        </button>
        <button scButton variant="outline" size="sm" (click)="zoom(2)">
          Zoom out
        </button>
        <button scButton variant="outline" size="sm" (click)="range.set(null)">
          Reset
        </button>
      </div>
      <div
        scWaterfall
        #waterfall="scWaterfall"
        aria-label="Dashboard render"
        [items]="steps"
        [range]="range()"
      >
        <div scWaterfallHeaderRow>
          <div scWaterfallColumnHeader class="w-48">Step</div>
          <div
            scWaterfallColumnHeader
            aria-label="Timeline"
            class="min-w-24 flex-1"
          >
            <div scWaterfallAxis [maxTicks]="6"></div>
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
            <div scWaterfallBar></div>
          </div>
        }
      </div>
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class ZoomWaterfallDemo {
  private readonly range = signal<readonly [number, number] | null>(null);
  private readonly steps: ScWaterfallItem[] = [
    { value: 'route', label: 'Resolve route', start: 0, duration: 40 },
    { value: 'data', label: 'Fetch data', start: 40, duration: 620 },
    { value: 'layout', label: 'Layout', start: 660, duration: 90 },
    { value: 'charts', label: 'Draw charts', start: 750, duration: 380 },
    { value: 'idle', label: 'Idle callbacks', start: 1130, duration: 170 },
  ];

  /** Around the middle of what is shown. */
  private zoom(factor: number): void {
    const [from, to] = this.range() ?? [0, 1300];
    const middle = (from + to) / 2;
    const half = ((to - from) * factor) / 2;
    this.range.set([Math.max(0, middle - half), middle + half]);
  }
}
