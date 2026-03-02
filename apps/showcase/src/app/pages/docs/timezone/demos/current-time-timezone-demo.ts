import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  inject,
} from '@angular/core';
import {
  ScTimezoneBadge,
  ScTimezoneService,
} from '@semantic-components/ui-lab';

@Component({
  selector: 'app-current-time-timezone-demo',
  imports: [ScTimezoneBadge],
  template: `
    <div class="flex items-center gap-4 rounded-lg border p-4">
      <span scTimezoneBadge></span>
      <span class="font-mono text-lg">
        {{ timezoneService.currentTimeFormatted() }}
      </span>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CurrentTimeTimezoneDemo {
  protected readonly timezoneService = inject(ScTimezoneService);
}
