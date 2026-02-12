import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { ScTimezoneBadge } from '@semantic-components/ui-lab';

@Component({
  selector: 'app-badge-no-icon-timezone-demo',
  imports: [ScTimezoneBadge],
  template: `
    <div class="flex items-center gap-4">
      <span sc-timezone-badge [showIcon]="false"></span>
      <span sc-timezone-badge [showIcon]="false" [showLabel]="true"></span>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BadgeNoIconTimezoneDemo {}
