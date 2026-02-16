import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { NoAbbrTimezoneDemo } from './no-abbr-timezone-demo';

@Component({
  selector: 'app-no-abbr-timezone-demo-container',
  imports: [DemoContainer, NoAbbrTimezoneDemo],
  template: `
    <app-demo-container title="No Abbreviation" [code]="code">
      <app-no-abbr-timezone-demo />
    </app-demo-container>
  `,
  host: { class: 'block' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NoAbbrTimezoneDemoContainer {
  readonly code = `import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { ScTimezoneSelect } from '@semantic-components/ui-lab';

@Component({
  selector: 'app-no-abbr-timezone-demo',
  imports: [ScTimezoneSelect],
  template: \`
    <div class="max-w-xs">
      <sc-timezone-select [showAbbr]="false"></sc-timezone-select>
    </div>
  \`,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NoAbbrTimezoneDemo {}`;
}
