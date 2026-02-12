import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { DisplayOffsetTimezoneDemo } from './display-offset-timezone-demo';

@Component({
  selector: 'app-display-offset-timezone-demo-container',
  imports: [DemoContainer, DisplayOffsetTimezoneDemo],
  template: `
    <app-demo-container title="Display with Offset" [code]="code">
      <app-display-offset-timezone-demo />
    </app-demo-container>
  `,
  host: { class: 'block' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DisplayOffsetTimezoneDemoContainer {
  readonly code = `import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { ScTimezoneDisplay } from '@semantic-components/ui-lab';

@Component({
  selector: 'app-display-offset-timezone-demo',
  imports: [ScTimezoneDisplay],
  template: \`
    <div class="flex items-center gap-4">
      <button sc-timezone-display [showOffset]="true"></button>
      <span class="text-sm text-muted-foreground">
        Shows abbreviation and UTC offset
      </span>
    </div>
  \`,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DisplayOffsetTimezoneDemo {}`;
}
