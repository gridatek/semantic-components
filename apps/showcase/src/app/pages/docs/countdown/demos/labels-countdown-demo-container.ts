import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { LabelsCountdownDemo } from './labels-countdown-demo';

@Component({
  selector: 'app-labels-countdown-demo-container',
  imports: [DemoContainer, LabelsCountdownDemo],
  template: `
    <app-demo-container title="Custom Labels" [code]="code">
      <app-labels-countdown-demo />
    </app-demo-container>
  `,
  host: { class: 'block' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LabelsCountdownDemoContainer {
  readonly code = `import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { ScCountdown } from '@semantic-components/ui-lab';

@Component({
  selector: 'app-labels-countdown-demo',
  imports: [ScCountdown],
  template: \`
    <div class="p-6 rounded-lg border inline-block">
      <sc-countdown
        [targetDate]="futureDate"
        daysLabel="D"
        hoursLabel="H"
        minutesLabel="M"
        secondsLabel="S"
      />
    </div>
  \`,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LabelsCountdownDemo {
  readonly futureDate = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
}`;
}
