import { Component, ViewEncapsulation } from '@angular/core';
import { ScBadge } from '@semantic-components/ui';
import { SiBadgeCheckIcon, SiBookmarkIcon } from '@semantic-icons/lucide-icons';

/** data-icon="inline-start" or "inline-end": less padding on that side. */
@Component({
  selector: 'app-icon-badge-demo',
  imports: [ScBadge, SiBadgeCheckIcon, SiBookmarkIcon],
  template: `
    <div class="flex flex-wrap justify-center gap-2">
      <span scBadge variant="secondary">
        <svg siBadgeCheckIcon data-icon="inline-start"></svg>
        Verified
      </span>
      <span scBadge variant="outline">
        Bookmark
        <svg siBookmarkIcon data-icon="inline-end"></svg>
      </span>
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class IconBadgeDemo {}
