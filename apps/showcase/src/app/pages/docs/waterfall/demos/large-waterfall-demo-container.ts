import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { LargeWaterfallDemo } from './large-waterfall-demo';

@Component({
  selector: 'app-large-waterfall-demo-container',
  imports: [DemoContainer, LargeWaterfallDemo],
  template: `
    <app-demo-container
      title="Large trace"
      [code]="code"
      demoUrl="/demos/waterfall/large-waterfall-demo"
    >
      <app-large-waterfall-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class LargeWaterfallDemoContainer {
  private readonly code = `import { Component, ViewEncapsulation } from '@angular/core';
import {
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

/** A large trace — 400 jobs of four steps — closed: only the rows shown are drawn (rows()); a scrolling box, the row under focus kept in view. */
@Component({
  selector: 'app-large-waterfall-demo',
  imports: [
    ScWaterfall,
    ScWaterfallAxis,
    ScWaterfallBar,
    ScWaterfallColumnHeader,
    ScWaterfallHeaderRow,
    ScWaterfallIndicator,
    ScWaterfallRow,
    ScWaterfallRowHeader,
    SiChevronRightIcon,
  ],
  template: \`
    <div
      scWaterfall
      #waterfall="scWaterfall"
      aria-label="Build jobs"
      class="h-80 w-full max-w-2xl overflow-y-auto"
      [items]="jobs"
    >
      <div scWaterfallHeaderRow class="bg-background sticky top-0 z-10">
        <div scWaterfallColumnHeader class="w-48">Job</div>
        <div
          scWaterfallColumnHeader
          aria-label="Timeline"
          class="min-w-24 flex-1"
        >
          <div scWaterfallAxis></div>
        </div>
      </div>
      @for (row of waterfall.rows(); track row.item.value) {
        <div scWaterfallRow [row]="row">
          <div scWaterfallRowHeader>
            <button scWaterfallIndicator><svg siChevronRightIcon></svg></button>
            {{ row.item.label }}
          </div>
          <div scWaterfallBar></div>
        </div>
      }
    </div>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class LargeWaterfallDemo {
  private readonly jobs: ScWaterfallItem[] = Array.from(
    { length: 400 },
    (_, i) => {
      const start = i * 25;
      const steps = ['checkout', 'install', 'build', 'test'];
      return {
        value: \`job-\${i + 1}\`,
        label: \`Job \${i + 1}\`,
        start,
        duration: 400,
        children: steps.map((step, s) => ({
          value: \`job-\${i + 1}-\${step}\`,
          label: step,
          start: start + s * 100,
          duration: 100,
        })),
      };
    },
  );
}`;
}
