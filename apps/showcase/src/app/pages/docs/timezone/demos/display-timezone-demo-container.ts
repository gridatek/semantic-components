import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { DisplayTimezoneDemo } from './display-timezone-demo';

@Component({
  selector: 'app-display-timezone-demo-container',
  imports: [DemoContainer, DisplayTimezoneDemo],
  template: `
    <app-demo-container title="Display" [code]="code">
      <app-display-timezone-demo />
    </app-demo-container>
  `,
  host: { class: 'block' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DisplayTimezoneDemoContainer {
  readonly code = `import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { ScTimezoneDisplay } from '@semantic-components/ui-lab';

@Component({
  selector: 'app-display-timezone-demo',
  imports: [ScTimezoneDisplay],
  template: \`
    <div class="flex items-center gap-4">
      <button sc-timezone-display></button>
      <span class="text-sm text-muted-foreground">
        Shows current timezone abbreviation
      </span>
    </div>
  \`,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DisplayTimezoneDemo {}`;
}
