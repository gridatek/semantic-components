import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { VariantsStatCardDemo } from './variants-stat-card-demo';

@Component({
  selector: 'app-variants-stat-card-demo-container',
  imports: [DemoContainer, VariantsStatCardDemo],
  template: `
    <app-demo-container
      title="Variant Styles"
      demoUrl="/demos/stat-card/variants-stat-card-demo"
      [code]="code"
    >
      <app-variants-stat-card-demo />
    </app-demo-container>
  `,
  host: { class: 'block' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VariantsStatCardDemoContainer {
  readonly code = `import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import {
  ScStatCard,
  ScStatCardChange,
  ScStatCardLabel,
  ScStatCardValue,
} from '@semantic-components/ui-lab';

@Component({
  selector: 'app-variants-stat-card-demo',
  imports: [ScStatCard, ScStatCardLabel, ScStatCardValue, ScStatCardChange],
  template: \`
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div sc-stat-card variant="default">
        <div class="flex items-start justify-between">
          <div class="space-y-1">
            <p sc-stat-card-label>Default</p>
            <p sc-stat-card-value>1,234</p>
          </div>
        </div>
        <div class="mt-3 flex items-center gap-2">
          <span sc-stat-card-change trend="up">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
            >
              <path d="m18 15-6-6-6 6" />
            </svg>
            <span>+12%</span>
          </span>
        </div>
      </div>

      <div sc-stat-card variant="outline">
        <div class="flex items-start justify-between">
          <div class="space-y-1">
            <p sc-stat-card-label>Outline</p>
            <p sc-stat-card-value>5,678</p>
          </div>
        </div>
        <div class="mt-3 flex items-center gap-2">
          <span sc-stat-card-change trend="down">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
            >
              <path d="m6 9 6 6 6-6" />
            </svg>
            <span>-5%</span>
          </span>
        </div>
      </div>

      <div sc-stat-card variant="filled">
        <div class="flex items-start justify-between">
          <div class="space-y-1">
            <p sc-stat-card-label>Filled</p>
            <p sc-stat-card-value>9,012</p>
          </div>
        </div>
        <div class="mt-3 flex items-center gap-2">
          <span sc-stat-card-change trend="up">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
            >
              <path d="m18 15-6-6-6 6" />
            </svg>
            <span>+8%</span>
          </span>
        </div>
      </div>
    </div>
  \`,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VariantsStatCardDemo {}`;
}
