import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { IconOnlyTimezoneDemo } from './icon-only-timezone-demo';

@Component({
  selector: 'app-icon-only-timezone-demo-container',
  imports: [DemoContainer, IconOnlyTimezoneDemo],
  template: `
    <app-demo-container title="Icon Only" [code]="code">
      <app-icon-only-timezone-demo />
    </app-demo-container>
  `,
  host: { class: 'block' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IconOnlyTimezoneDemoContainer {
  readonly code = `import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { ScTimezoneDisplay } from '@semantic-components/ui-lab';

@Component({
  selector: 'app-icon-only-timezone-demo',
  imports: [ScTimezoneDisplay],
  template: \`
    <div class="flex items-center gap-4">
      <button sc-timezone-display [iconOnly]="true" size="icon"></button>
      <span class="text-sm text-muted-foreground">Clock icon only</span>
    </div>
  \`,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IconOnlyTimezoneDemo {}`;
}
