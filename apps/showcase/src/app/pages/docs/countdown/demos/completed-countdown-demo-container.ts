import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { CompletedCountdownDemo } from './completed-countdown-demo';

@Component({
  selector: 'app-completed-countdown-demo-container',
  imports: [DemoContainer, CompletedCountdownDemo],
  template: `
    <app-demo-container title="Completed" [code]="code">
      <app-completed-countdown-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CompletedCountdownDemoContainer {
  readonly code = `import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { ScCountdown } from '@semantic-components/ui-lab';

@Component({
  selector: 'app-completed-countdown-demo',
  imports: [ScCountdown],
  template: \`
    <div class="inline-block rounded-lg border p-6">
      <div scCountdown #cd="scCountdown" [targetDate]="pastDate" class="gap-3">
        <div
          class="bg-muted flex min-w-[70px] flex-col items-center rounded-lg p-3"
        >
          <span class="font-mono text-3xl font-bold tabular-nums">
            {{ cd.padNumber(cd.time().days) }}
          </span>
          <span class="text-muted-foreground text-xs tracking-wider uppercase">
            Days
          </span>
        </div>
        <span class="text-muted-foreground -mt-5 text-3xl font-bold">:</span>
        <div
          class="bg-muted flex min-w-[70px] flex-col items-center rounded-lg p-3"
        >
          <span class="font-mono text-3xl font-bold tabular-nums">
            {{ cd.padNumber(cd.time().hours) }}
          </span>
          <span class="text-muted-foreground text-xs tracking-wider uppercase">
            Hours
          </span>
        </div>
        <span class="text-muted-foreground -mt-5 text-3xl font-bold">:</span>
        <div
          class="bg-muted flex min-w-[70px] flex-col items-center rounded-lg p-3"
        >
          <span class="font-mono text-3xl font-bold tabular-nums">
            {{ cd.padNumber(cd.time().minutes) }}
          </span>
          <span class="text-muted-foreground text-xs tracking-wider uppercase">
            Minutes
          </span>
        </div>
        <span class="text-muted-foreground -mt-5 text-3xl font-bold">:</span>
        <div
          class="bg-muted flex min-w-[70px] flex-col items-center rounded-lg p-3"
        >
          <span class="font-mono text-3xl font-bold tabular-nums">
            {{ cd.padNumber(cd.time().seconds) }}
          </span>
          <span class="text-muted-foreground text-xs tracking-wider uppercase">
            Seconds
          </span>
        </div>
      </div>
    </div>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CompletedCountdownDemo {
  readonly pastDate = new Date(Date.now() - 1000);
}`;
}
