import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { BasicCountdownDemo } from './basic-countdown-demo';

@Component({
  selector: 'app-basic-countdown-demo-container',
  imports: [DemoContainer, BasicCountdownDemo],
  template: `
    <app-demo-container title="Basic" [code]="code">
      <app-basic-countdown-demo />
    </app-demo-container>
  `,
  host: { class: 'block' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BasicCountdownDemoContainer {
  readonly code = `import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { ScCountdown } from '@semantic-components/ui-lab';

@Component({
  selector: 'app-basic-countdown-demo',
  imports: [ScCountdown],
  template: \`
    <div class="p-6 rounded-lg border inline-block">
      <sc-countdown [targetDate]="futureDate" />
    </div>
  \`,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BasicCountdownDemo {
  readonly futureDate = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
}`;
}
