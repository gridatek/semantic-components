import { Component, ViewEncapsulation } from '@angular/core';
import { UsageCode } from '../../../../components/usage-code/usage-code';
import { NumberTickerUsageDemo } from './number-ticker-usage-demo';

@Component({
  selector: 'app-number-ticker-usage-demo-container',
  imports: [UsageCode, NumberTickerUsageDemo],
  template: `
    <app-usage-code [code]="code">
      <ng-template><app-number-ticker-usage-demo /></ng-template>
    </app-usage-code>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class NumberTickerUsageDemoContainer {
  private readonly code = `import { Component, ViewEncapsulation, signal } from '@angular/core';
import { ScButton, ScFrame } from '@semantic-components/ui';
import { ScNumberTicker } from '@semantic-components/ui';

/** The number counts to its new value, easing out. Screen readers get only the value; with reduced motion, it is there at once. */
@Component({
  selector: 'app-number-ticker-usage-demo',
  imports: [ScFrame, ScNumberTicker, ScButton],
  template: \`
    <div scFrame class="bg-muted/30 grid h-32 w-64 place-items-center">
      <span scNumberTicker [value]="count()" class="text-5xl font-bold"></span>
    </div>
    <div class="flex gap-2">
      <button scButton (click)="count.set(count() + 100)">+100</button>
      <button scButton variant="secondary" (click)="count.set(0)">Reset</button>
    </div>
  \`,
  host: { class: 'flex w-full flex-col items-center gap-4' },
  encapsulation: ViewEncapsulation.None,
})
export class NumberTickerUsageDemo {
  private readonly count = signal(0);
}`;
}
