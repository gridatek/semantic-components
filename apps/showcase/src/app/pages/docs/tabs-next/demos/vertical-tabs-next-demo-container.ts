import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { VerticalTabsNextDemo } from './vertical-tabs-next-demo';

@Component({
  selector: 'app-vertical-tabs-next-demo-container',
  imports: [DemoContainer, VerticalTabsNextDemo],
  template: `
    <app-demo-container
      title="Vertical"
      demoUrl="/demos/tabs-next/vertical-tabs-next-demo"
      [code]="code"
    >
      <app-vertical-tabs-next-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class VerticalTabsNextDemoContainer {
  readonly code = `import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScTabsNext,
  ScTabsNextContent,
  ScTabsNextList,
  ScTabsNextPanel,
  ScTabsNextTab,
} from '@semantic-components/ui';

/** orientation="vertical": the list beside the panels; ArrowUp and ArrowDown move. */
@Component({
  selector: 'app-vertical-tabs-next-demo',
  imports: [
    ScTabsNext,
    ScTabsNextList,
    ScTabsNextTab,
    ScTabsNextPanel,
    ScTabsNextContent,
  ],
  template: \`
    <div scTabsNext value="account" orientation="vertical">
      <div scTabsNextList>
        <button scTabsNextTab value="account">Account</button>
        <button scTabsNextTab value="password">Password</button>
        <button scTabsNextTab value="notifications">Notifications</button>
      </div>
      <div scTabsNextPanel value="account" class="text-muted-foreground p-2">
        <ng-template scTabsNextContent> Your name and email. </ng-template>
      </div>
      <div scTabsNextPanel value="password" class="text-muted-foreground p-2">
        <ng-template scTabsNextContent> Change your password. </ng-template>
      </div>
      <div
        scTabsNextPanel
        value="notifications"
        class="text-muted-foreground p-2"
      >
        <ng-template scTabsNextContent>
          What we tell you, and how.
        </ng-template>
      </div>
    </div>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class VerticalTabsNextDemo {}`;
}
