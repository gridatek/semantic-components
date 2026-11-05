import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { VerticalTabsDemo } from './vertical-tabs-demo';

@Component({
  selector: 'app-vertical-tabs-demo-container',
  imports: [DemoContainer, VerticalTabsDemo],
  template: `
    <app-demo-container
      title="Vertical"
      demoUrl="/demos/tabs/vertical-tabs-demo"
      [code]="code"
    >
      <app-vertical-tabs-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class VerticalTabsDemoContainer {
  readonly code = `import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScTabs,
  ScTabsContent,
  ScTabsList,
  ScTabsPanel,
  ScTabsTab,
} from '@semantic-components/ui';

/** orientation="vertical": the list beside the panels; ArrowUp and ArrowDown move. */
@Component({
  selector: 'app-vertical-tabs-demo',
  imports: [ScTabs, ScTabsList, ScTabsTab, ScTabsPanel, ScTabsContent],
  template: \`
    <div scTabs value="account" orientation="vertical">
      <div scTabsList>
        <button scTabsTab value="account">Account</button>
        <button scTabsTab value="password">Password</button>
        <button scTabsTab value="notifications">Notifications</button>
      </div>
      <div scTabsPanel value="account" class="text-muted-foreground p-2">
        <ng-template scTabsContent> Your name and email. </ng-template>
      </div>
      <div scTabsPanel value="password" class="text-muted-foreground p-2">
        <ng-template scTabsContent> Change your password. </ng-template>
      </div>
      <div scTabsPanel value="notifications" class="text-muted-foreground p-2">
        <ng-template scTabsContent> What we tell you, and how. </ng-template>
      </div>
    </div>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class VerticalTabsDemo {}`;
}
