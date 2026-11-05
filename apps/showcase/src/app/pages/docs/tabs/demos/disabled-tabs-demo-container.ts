import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { DisabledTabsDemo } from './disabled-tabs-demo';

@Component({
  selector: 'app-disabled-tabs-demo-container',
  imports: [DemoContainer, DisabledTabsDemo],
  template: `
    <app-demo-container
      title="Disabled"
      demoUrl="/demos/tabs/disabled-tabs-demo"
      [code]="code"
    >
      <app-disabled-tabs-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class DisabledTabsDemoContainer {
  readonly code = `import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScTabs,
  ScTabsContent,
  ScTabsList,
  ScTabsPanel,
  ScTabsTab,
} from '@semantic-components/ui';

/** A disabled tab: reached by the arrows, not selected. */
@Component({
  selector: 'app-disabled-tabs-demo',
  imports: [ScTabs, ScTabsList, ScTabsTab, ScTabsPanel, ScTabsContent],
  template: \`
    <div scTabs value="home">
      <div scTabsList>
        <button scTabsTab value="home">Home</button>
        <button scTabsTab value="settings" disabled>Disabled</button>
      </div>
      <div scTabsPanel value="home" class="text-muted-foreground p-2">
        <ng-template scTabsContent> The home tab. </ng-template>
      </div>
      <div scTabsPanel value="settings" class="text-muted-foreground p-2">
        <ng-template scTabsContent> Not reachable. </ng-template>
      </div>
    </div>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class DisabledTabsDemo {}`;
}
