import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { SeparatorCountdownDemo } from './separator-countdown-demo';

@Component({
  selector: 'app-separator-countdown-demo-container',
  imports: [DemoContainer, SeparatorCountdownDemo],
  template: `
    <app-demo-container title="Without Separator" [code]="code">
      <app-separator-countdown-demo />
    </app-demo-container>
  `,
  host: { class: 'block' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SeparatorCountdownDemoContainer {
  readonly code = `import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { ScCountdown } from '@semantic-components/ui-lab';

@Component({
  selector: 'app-separator-countdown-demo',
  imports: [ScCountdown],
  template: \`
    <div class="p-6 rounded-lg border inline-block">
      <sc-countdown [targetDate]="futureDate" [showSeparator]="false" />
    </div>
  \`,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SeparatorCountdownDemo {
  readonly futureDate = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
}`;
}
