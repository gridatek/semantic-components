import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { DisabledTabsNextDemo } from './disabled-tabs-next-demo';

@Component({
  selector: 'app-disabled-tabs-next-demo-container',
  imports: [DemoContainer, DisabledTabsNextDemo],
  template: `
    <app-demo-container
      title="Disabled"
      demoUrl="/demos/tabs-next/disabled-tabs-next-demo"
      [code]="code"
    >
      <app-disabled-tabs-next-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class DisabledTabsNextDemoContainer {
  readonly code = `import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScTabsNext,
  ScTabsNextContent,
  ScTabsNextList,
  ScTabsNextPanel,
  ScTabsNextTab,
} from '@semantic-components/ui';

/** A disabled tab: reached by the arrows, not selected. */
@Component({
  selector: 'app-disabled-tabs-next-demo',
  imports: [
    ScTabsNext,
    ScTabsNextList,
    ScTabsNextTab,
    ScTabsNextPanel,
    ScTabsNextContent,
  ],
  template: \`
    <div scTabsNext value="home">
      <div scTabsNextList>
        <button scTabsNextTab value="home">Home</button>
        <button scTabsNextTab value="settings" disabled>Disabled</button>
      </div>
      <div scTabsNextPanel value="home" class="text-muted-foreground p-2">
        <ng-template scTabsNextContent> The home tab. </ng-template>
      </div>
      <div scTabsNextPanel value="settings" class="text-muted-foreground p-2">
        <ng-template scTabsNextContent> Not reachable. </ng-template>
      </div>
    </div>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class DisabledTabsNextDemo {}`;
}
