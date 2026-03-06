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
      <sc-countdown [targetDate]="pastDate" variant="cards" />
    </div>
  \`,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CompletedCountdownDemo {
  readonly pastDate = new Date(Date.now() - 1000);
}`;
}
