import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { ScBadge } from '@semantic-components/ui';
import {
  SiCheckIcon,
  SiCircleXIcon,
  SiClockIcon,
} from '@semantic-icons/lucide-icons';

@Component({
  selector: 'app-with-icons-badge-demo',
  imports: [ScBadge, SiCheckIcon, SiClockIcon, SiCircleXIcon],
  template: `
    <div class="flex flex-wrap items-center gap-2">
      <div scBadge class="gap-1">
        <svg siCheckIcon class="size-3"></svg>
        Completed
      </div>
      <div scBadge variant="secondary" class="gap-1">
        <svg siClockIcon class="size-3"></svg>
        Pending
      </div>
      <div scBadge variant="destructive" class="gap-1">
        <svg siCircleXIcon class="size-3"></svg>
        Error
      </div>
    </div>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WithIconsBadgeDemo {}
