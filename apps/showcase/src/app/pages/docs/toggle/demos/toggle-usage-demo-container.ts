import { Component, ViewEncapsulation } from '@angular/core';
import { UsageCode } from '../../../../components/usage-code/usage-code';
import { ToggleUsageDemo } from './toggle-usage-demo';

@Component({
  selector: 'app-toggle-usage-demo-container',
  imports: [UsageCode, ToggleUsageDemo],
  template: `
    <app-usage-code [code]="code">
      <ng-template><app-toggle-usage-demo /></ng-template>
    </app-usage-code>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class ToggleUsageDemoContainer {
  readonly code = `import { Component, ViewEncapsulation, signal } from '@angular/core';
import { ScToggle } from '@semantic-components/ui';
import { SiBookmarkIcon } from '@semantic-icons/lucide-icons';

/** A toggle with an icon and its text; the icon filled when pressed. */
@Component({
  selector: 'app-toggle-usage-demo',
  imports: [ScToggle, SiBookmarkIcon],
  template: \`
    <button scToggle variant="outline" size="sm" [(pressed)]="bookmarked">
      <svg
        siBookmarkIcon
        class="group-aria-pressed/toggle:fill-foreground"
      ></svg>
      Bookmark
    </button>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class ToggleUsageDemo {
  protected readonly bookmarked = signal(false);
}`;
}
