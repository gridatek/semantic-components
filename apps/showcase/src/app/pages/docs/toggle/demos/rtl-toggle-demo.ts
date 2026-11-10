import { Component, ViewEncapsulation, signal } from '@angular/core';
import { ScToggle } from '@semantic-components/ui';
import { SiBookmarkIcon } from '@semantic-icons/lucide-icons';

/** In a right-to-left page: the icon at the start, on the right. */
@Component({
  selector: 'app-rtl-toggle-demo',
  imports: [ScToggle, SiBookmarkIcon],
  template: `
    <div dir="rtl" lang="ar">
      <button scToggle variant="outline" size="sm" [(pressed)]="bookmarked">
        <svg
          siBookmarkIcon
          class="group-aria-pressed/toggle:fill-foreground"
        ></svg>
        إشارة مرجعية
      </button>
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class RtlToggleDemo {
  protected readonly bookmarked = signal(false);
}
