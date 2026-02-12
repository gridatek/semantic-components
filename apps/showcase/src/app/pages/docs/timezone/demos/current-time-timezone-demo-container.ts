import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { CurrentTimeTimezoneDemo } from './current-time-timezone-demo';

@Component({
  selector: 'app-current-time-timezone-demo-container',
  imports: [DemoContainer, CurrentTimeTimezoneDemo],
  template: `
    <app-demo-container title="Current Time Display" [code]="code">
      <app-current-time-timezone-demo />
    </app-demo-container>
  `,
  host: { class: 'block' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CurrentTimeTimezoneDemoContainer {
  readonly code = `import {
  ChangeDetectionStrategy,
  Component,
  inject,
  ViewEncapsulation,
} from '@angular/core';
import { ScTimezoneBadge, ScTimezoneService } from '@semantic-components/ui-lab';

@Component({
  selector: 'app-current-time-timezone-demo',
  imports: [ScTimezoneBadge],
  template: \`
    <div class="flex items-center gap-4 rounded-lg border p-4">
      <span sc-timezone-badge></span>
      <span class="text-lg font-mono">
        {{ timezoneService.currentTimeFormatted() }}
      </span>
    </div>
  \`,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CurrentTimeTimezoneDemo {
  protected readonly timezoneService = inject(ScTimezoneService);
}`;
}
