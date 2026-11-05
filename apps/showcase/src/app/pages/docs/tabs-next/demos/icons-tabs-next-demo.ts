import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScTabsNext,
  ScTabsNextContent,
  ScTabsNextList,
  ScTabsNextPanel,
  ScTabsNextTab,
} from '@semantic-components/ui';
import { SiAppWindowIcon, SiCodeIcon } from '@semantic-icons/lucide-icons';

/** Your icons in the tabs, sized by them. */
@Component({
  selector: 'app-icons-tabs-next-demo',
  imports: [
    ScTabsNext,
    ScTabsNextList,
    ScTabsNextTab,
    ScTabsNextPanel,
    ScTabsNextContent,
    SiAppWindowIcon,
    SiCodeIcon,
  ],
  template: `
    <div scTabsNext value="preview">
      <div scTabsNextList>
        <button scTabsNextTab value="preview">
          <svg siAppWindowIcon></svg>
          Preview
        </button>
        <button scTabsNextTab value="code">
          <svg siCodeIcon></svg>
          Code
        </button>
      </div>
      <div scTabsNextPanel value="preview" class="text-muted-foreground p-2">
        <ng-template scTabsNextContent> The rendered page. </ng-template>
      </div>
      <div scTabsNextPanel value="code" class="text-muted-foreground p-2">
        <ng-template scTabsNextContent> Its source. </ng-template>
      </div>
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class IconsTabsNextDemo {}
