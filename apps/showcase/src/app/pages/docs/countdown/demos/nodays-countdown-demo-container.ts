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
  host: { class: 'block' },
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
    <div class="p-4 rounded-lg border inline-block">
      <sc-countdown
        [targetDate]="shortFuture"
        [showDays]="false"
        variant="compact"
      />
    </div>
  \`,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NodaysCountdownDemo {
  readonly shortFuture = new Date(Date.now() + 2 * 60 * 60 * 1000);
}`;
}
