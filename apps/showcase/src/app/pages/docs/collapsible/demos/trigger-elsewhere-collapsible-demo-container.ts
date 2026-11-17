import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { TriggerElsewhereCollapsibleDemo } from './trigger-elsewhere-collapsible-demo';

@Component({
  selector: 'app-trigger-elsewhere-collapsible-demo-container',
  imports: [DemoContainer, TriggerElsewhereCollapsibleDemo],
  template: `
    <app-demo-container
      title="Trigger elsewhere"
      demoUrl="/demos/collapsible/trigger-elsewhere-collapsible-demo"
      [code]="code"
    >
      <app-trigger-elsewhere-collapsible-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class TriggerElsewhereCollapsibleDemoContainer {
  private readonly code = `import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScButton,
  ScCollapsible,
  ScCollapsiblePanel,
  ScCollapsibleTrigger,
  ScFrame,
} from '@semantic-components/ui';

/**
 * The trigger elsewhere: \`[scCollapsibleTrigger]="filters"\` controls the
 * collapsible it names, not one around it — a button in a header, its panel
 * further down.
 */
@Component({
  selector: 'app-trigger-elsewhere-collapsible-demo',
  imports: [
    ScButton,
    ScCollapsible,
    ScCollapsiblePanel,
    ScCollapsibleTrigger,
    ScFrame,
  ],
  template: \`
    <div class="flex w-full max-w-sm flex-col gap-3">
      <div class="flex items-center justify-between gap-4">
        <h3 class="text-sm font-semibold">Orders</h3>
        <button
          scButton
          variant="outline"
          size="sm"
          [scCollapsibleTrigger]="filters"
        >
          Filters
        </button>
      </div>
      <p class="text-muted-foreground text-sm">Showing all 24 orders.</p>
      <div scCollapsible #filters="scCollapsible">
        <div scCollapsiblePanel>
          <ul scFrame class="flex flex-col gap-1 p-3 text-sm">
            <li>Status: any</li>
            <li>Date: last 30 days</li>
            <li>Total: any</li>
          </ul>
        </div>
      </div>
    </div>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class TriggerElsewhereCollapsibleDemo {}`;
}
