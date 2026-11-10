import { Component, ViewEncapsulation } from '@angular/core';
import { UsageCode } from '../../../../components/usage-code/usage-code';
import { ButtonPatternUsageDemo } from './button-pattern-usage-demo';

@Component({
  selector: 'app-button-pattern-usage-demo-container',
  imports: [UsageCode, ButtonPatternUsageDemo],
  template: `
    <app-usage-code [code]="code">
      <ng-template><app-button-pattern-usage-demo /></ng-template>
    </app-usage-code>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class ButtonPatternUsageDemoContainer {
  readonly code = `import { Component, ViewEncapsulation } from '@angular/core';
import { ScButtonPattern } from '@semantic-components/ui';

@Component({
  selector: 'app-button-pattern-usage-demo',
  imports: [ScButtonPattern],
  template: \` <div scButtonPattern (click)="handleClick()">Click me</div> \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class ButtonPatternUsageDemo {
  handleClick() {
    // no-op for demo
  }
}`;
}
