import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { ButtonOffsetTimezoneDemo } from './button-offset-timezone-demo';

@Component({
  selector: 'app-button-offset-timezone-demo-container',
  imports: [DemoContainer, ButtonOffsetTimezoneDemo],
  template: `
    <app-demo-container title="Button with Offset" [code]="code">
      <app-button-offset-timezone-demo />
    </app-demo-container>
  `,
  host: { class: 'block' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonOffsetTimezoneDemoContainer {
  readonly code = `import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { ScTimezoneButton } from '@semantic-components/ui-lab';

@Component({
  selector: 'app-button-offset-timezone-demo',
  imports: [ScTimezoneButton],
  template: \`
    <button sc-timezone-button variant="outline" [showOffset]="true"></button>
  \`,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonOffsetTimezoneDemo {}`;
}
