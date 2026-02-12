import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { ScTimezoneDisplay } from '@semantic-components/ui-lab';

@Component({
  selector: 'app-navigation-timezone-demo',
  imports: [ScTimezoneDisplay],
  template: `
    <div class="flex items-center justify-between rounded-lg border p-4">
      <div class="space-y-0.5">
        <span class="text-base font-medium">Timezone</span>
        <p class="text-sm text-muted-foreground">
          Your current timezone setting
        </p>
      </div>
      <button sc-timezone-display variant="outline"></button>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavigationTimezoneDemo {}
