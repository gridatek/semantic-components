import { Component, ViewEncapsulation, signal } from '@angular/core';
import { ScToggle } from '@semantic-components/ui';
import { SiBookmarkIcon } from '@semantic-icons/lucide-icons';

/** A toggle with an icon and its text; the icon filled when pressed. */
@Component({
  selector: 'app-toggle-usage-demo',
  imports: [ScToggle, SiBookmarkIcon],
  template: `
    <button scToggle variant="outline" size="sm" [(pressed)]="bookmarked">
      <svg
        siBookmarkIcon
        class="group-aria-pressed/toggle:fill-foreground"
      ></svg>
      Bookmark
    </button>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class ToggleUsageDemo {
  protected readonly bookmarked = signal(false);
}
