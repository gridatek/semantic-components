import {
  ChangeDetectionStrategy,
  Component,
  inject,
  ViewEncapsulation,
} from '@angular/core';
import {
  ScTimezoneSelect,
  ScTimezoneService,
} from '@semantic-components/ui-lab';

@Component({
  selector: 'app-basic-select-timezone-demo',
  imports: [ScTimezoneSelect],
  template: `
    <div class="space-y-4">
      <div class="max-w-xs">
        <sc-timezone-select></sc-timezone-select>
      </div>
      <p class="text-sm text-muted-foreground">
        Current: {{ timezoneService.currentTimezone().label }} ({{
          timezoneService.currentTimezone().offset
        }})
      </p>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BasicSelectTimezoneDemo {
  protected readonly timezoneService = inject(ScTimezoneService);
}
