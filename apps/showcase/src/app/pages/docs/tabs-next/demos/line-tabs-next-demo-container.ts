import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { LineTabsNextDemo } from './line-tabs-next-demo';

@Component({
  selector: 'app-line-tabs-next-demo-container',
  imports: [DemoContainer, LineTabsNextDemo],
  template: `
    <app-demo-container
      title="Line"
      demoUrl="/demos/tabs-next/line-tabs-next-demo"
      [code]="code"
    >
      <app-line-tabs-next-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class LineTabsNextDemoContainer {
  readonly code = `import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScTabsNext,
  ScTabsNextContent,
  ScTabsNextList,
  ScTabsNextPanel,
  ScTabsNextTab,
} from '@semantic-components/ui';

/** variant="line": the selected tab underlined, no box. */
@Component({
  selector: 'app-line-tabs-next-demo',
  imports: [
    ScTabsNext,
    ScTabsNextList,
    ScTabsNextTab,
    ScTabsNextPanel,
    ScTabsNextContent,
  ],
  template: \`
    <div scTabsNext value="overview">
      <div scTabsNextList variant="line">
        <button scTabsNextTab value="overview">Overview</button>
        <button scTabsNextTab value="analytics">Analytics</button>
        <button scTabsNextTab value="reports">Reports</button>
      </div>
      <div scTabsNextPanel value="overview" class="text-muted-foreground p-2">
        <ng-template scTabsNextContent>
          Your key metrics at a glance.
        </ng-template>
      </div>
      <div scTabsNextPanel value="analytics" class="text-muted-foreground p-2">
        <ng-template scTabsNextContent> Trends and engagement. </ng-template>
      </div>
      <div scTabsNextPanel value="reports" class="text-muted-foreground p-2">
        <ng-template scTabsNextContent> Reports ready to export. </ng-template>
      </div>
    </div>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class LineTabsNextDemo {}`;
}
