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
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SaleCountdownDemoContainer {
  readonly code = `import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { ScCountdown } from '@semantic-components/ui-lab';
import { SiClockIcon } from '@semantic-icons/lucide-icons';

@Component({
  selector: 'app-sale-countdown-demo',
  imports: [ScCountdown, SiClockIcon],
  template: \`
    <div
      class="bg-destructive/10 border-destructive/20 flex max-w-sm items-center gap-4 rounded-lg border p-4"
    >
      <div class="text-destructive">
        <svg siClockIcon class="size-8"></svg>
      </div>
      <div class="flex-1">
        <div class="text-destructive font-semibold">Flash Sale Ends In</div>
        <span
          scCountdown
          #cd="scCountdown"
          [targetDate]="shortFuture"
          class="text-destructive font-mono text-xl font-bold tabular-nums"
        >
          {{ cd.padNumber(cd.time().hours) }}:{{
            cd.padNumber(cd.time().minutes)
          }}:{{ cd.padNumber(cd.time().seconds) }}
        </span>
      </div>
    </div>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SaleCountdownDemo {
  readonly shortFuture = new Date(Date.now() + 2 * 60 * 60 * 1000);
}`;
}
