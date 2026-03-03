import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { SaleCountdownDemo } from './sale-countdown-demo';

@Component({
  selector: 'app-sale-countdown-demo-container',
  imports: [DemoContainer, SaleCountdownDemo],
  template: `
    <app-demo-container title="Sale Timer" [code]="code">
      <app-sale-countdown-demo />
    </app-demo-container>
  `,
  host: { class: 'block' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SaleCountdownDemoContainer {
  readonly code = `import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { ScCountdownSimple } from '@semantic-components/ui-lab';

@Component({
  selector: 'app-sale-countdown-demo',
  imports: [ScCountdownSimple],
  template: \`
    <div
      class="bg-destructive/10 border-destructive/20 flex max-w-sm items-center gap-4 rounded-lg border p-4"
    >
      <div class="text-destructive">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          class="size-8"
        >
          <circle cx="12" cy="12" r="10" />
          <polyline points="12 6 12 12 16 14" />
        </svg>
      </div>
      <div class="flex-1">
        <div class="text-destructive font-semibold">Flash Sale Ends In</div>
        <sc-countdown-simple
          [targetDate]="shortFuture"
          format="hh:mm:ss"
          class="text-destructive text-xl font-bold"
        />
      </div>
    </div>
  \`,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SaleCountdownDemo {
  readonly shortFuture = new Date(Date.now() + 2 * 60 * 60 * 1000);
}`;
}
