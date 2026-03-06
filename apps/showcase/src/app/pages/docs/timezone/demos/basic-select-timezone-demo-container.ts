import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { BasicSelectTimezoneDemo } from './basic-select-timezone-demo';

@Component({
  selector: 'app-basic-select-timezone-demo-container',
  imports: [DemoContainer, BasicSelectTimezoneDemo],
  template: `
    <app-demo-container title="Basic Select" [code]="code">
      <app-basic-select-timezone-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BasicSelectTimezoneDemoContainer {
  readonly code = `import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  inject,
} from '@angular/core';
import {
  ScTimezoneSelect,
  ScTimezoneService,
} from '@semantic-components/ui-lab';

@Component({
  selector: 'app-basic-select-timezone-demo',
  imports: [ScTimezoneSelect],
  template: \`
    <div class="space-y-4">
      <div class="max-w-xs">
        <sc-timezone-select></sc-timezone-select>
      </div>
      <p class="text-muted-foreground text-sm">
        Current: {{ timezoneService.currentTimezone().label }} ({{
          timezoneService.currentTimezone().offset
        }})
      </p>
    </div>
  \`,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BasicSelectTimezoneDemo {
  protected readonly timezoneService = inject(ScTimezoneService);
}`;
}
