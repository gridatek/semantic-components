import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { SimpleCountdownDemo } from './simple-countdown-demo';

@Component({
  selector: 'app-simple-countdown-demo-container',
  imports: [DemoContainer, SimpleCountdownDemo],
  template: `
    <app-demo-container title="Simple" [code]="code">
      <app-simple-countdown-demo />
    </app-demo-container>
  `,
  host: { class: 'block' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SimpleCountdownDemoContainer {
  readonly code = `import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { ScCountdownSimple } from '@semantic-components/ui-lab';

@Component({
  selector: 'app-simple-countdown-demo',
  imports: [ScCountdownSimple],
  template: \`
    <div class="space-y-2">
      <div class="flex items-center gap-2">
        <span class="text-muted-foreground">Time remaining:</span>
        <sc-countdown-simple
          [targetDate]="futureDate"
          format="full"
          class="text-lg font-semibold"
        />
      </div>
      <div class="flex items-center gap-2">
        <span class="text-muted-foreground">HH:MM:SS:</span>
        <sc-countdown-simple
          [targetDate]="shortFuture"
          format="hh:mm:ss"
          class="text-lg"
        />
      </div>
      <div class="flex items-center gap-2">
        <span class="text-muted-foreground">MM:SS:</span>
        <sc-countdown-simple
          [targetDate]="veryShortFuture"
          format="mm:ss"
          class="text-lg"
        />
      </div>
    </div>
  \`,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SimpleCountdownDemo {
  readonly futureDate = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
  readonly shortFuture = new Date(Date.now() + 2 * 60 * 60 * 1000);
  readonly veryShortFuture = new Date(Date.now() + 5 * 60 * 1000);
}`;
}
