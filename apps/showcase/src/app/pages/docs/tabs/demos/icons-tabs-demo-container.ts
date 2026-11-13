import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { IconsTabsDemo } from './icons-tabs-demo';

@Component({
  selector: 'app-icons-tabs-demo-container',
  imports: [DemoContainer, IconsTabsDemo],
  template: `
    <app-demo-container
      title="Icons"
      demoUrl="/demos/tabs/icons-tabs-demo"
      [code]="code"
    >
      <app-icons-tabs-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class IconsTabsDemoContainer {
  readonly code = `import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScTabs,
  ScTabsList,
  ScTabsPanel,
  ScTabsPanelContent,
  ScTabsTab,
} from '@semantic-components/ui';
import { SiAppWindowIcon, SiCodeIcon } from '@semantic-icons/lucide-icons';

/** Your icons in the tabs, sized by them. */
@Component({
  selector: 'app-icons-tabs-demo',
  imports: [
    ScTabs,
    ScTabsList,
    ScTabsTab,
    ScTabsPanel,
    ScTabsPanelContent,
    SiAppWindowIcon,
    SiCodeIcon,
  ],
  template: \`
    <div scTabs value="preview">
      <div scTabsList>
        <button scTabsTab value="preview">
          <svg siAppWindowIcon></svg>
          Preview
        </button>
        <button scTabsTab value="code">
          <svg siCodeIcon></svg>
          Code
        </button>
      </div>
      <div scTabsPanel value="preview" class="text-muted-foreground p-2">
        <ng-template scTabsPanelContent> The rendered page. </ng-template>
      </div>
      <div scTabsPanel value="code" class="text-muted-foreground p-2">
        <ng-template scTabsPanelContent> Its source. </ng-template>
      </div>
    </div>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class IconsTabsDemo {}`;
}
