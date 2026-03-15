import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { NodaysCountdownDemo } from './nodays-countdown-demo';

@Component({
  selector: 'app-nodays-countdown-demo-container',
  imports: [DemoContainer, NodaysCountdownDemo],
  template: `
    <app-demo-container title="Without Days" [code]="code">
      <app-nodays-countdown-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NodaysCountdownDemoContainer {
  readonly code = `import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { ScCountdown } from '@semantic-components/ui-lab';

@Component({
  selector: 'app-nodays-countdown-demo',
  imports: [ScCountdown],
  template: \`
    <div class="inline-block rounded-lg border p-4">
      <div
        scCountdown
        #cd="scCountdown"
        [targetDate]="shortFuture"
        class="gap-1"
      >
        <div class="flex flex-col items-center">
          <span class="font-mono text-2xl font-bold tabular-nums">
            {{ cd.padNumber(cd.time().hours) }}
          </span>
          <span class="text-muted-foreground text-xs">Hours</span>
        </div>
        <span class="text-muted-foreground -mt-3 text-2xl font-bold">:</span>
        <div class="flex flex-col items-center">
          <span class="font-mono text-2xl font-bold tabular-nums">
            {{ cd.padNumber(cd.time().minutes) }}
          </span>
          <span class="text-muted-foreground text-xs">Minutes</span>
        </div>
        <span class="text-muted-foreground -mt-3 text-2xl font-bold">:</span>
        <div class="flex flex-col items-center">
          <span class="font-mono text-2xl font-bold tabular-nums">
            {{ cd.padNumber(cd.time().seconds) }}
          </span>
          <span class="text-muted-foreground text-xs">Seconds</span>
        </div>
      </div>
    </div>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NodaysCountdownDemo {
  readonly shortFuture = new Date(Date.now() + 2 * 60 * 60 * 1000);
}`;
}
