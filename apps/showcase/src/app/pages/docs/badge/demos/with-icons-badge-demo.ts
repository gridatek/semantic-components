import { Component, ViewEncapsulation } from '@angular/core';
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
        <svg siCheckIcon></svg>
        Completed
      </div>
      <div scBadge variant="secondary" class="gap-1">
        <svg siClockIcon></svg>
        Pending
      </div>
      <div scBadge variant="destructive" class="gap-1">
        <svg siCircleXIcon></svg>
        Error
      </div>
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class WithIconsBadgeDemo {}
