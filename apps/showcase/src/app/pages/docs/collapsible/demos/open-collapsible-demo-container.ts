import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { OpenCollapsibleDemo } from './open-collapsible-demo';

@Component({
  selector: 'app-open-collapsible-demo-container',
  imports: [DemoContainer, OpenCollapsibleDemo],
  template: `
    <app-demo-container title="Initially Open" [code]="code">
      <app-open-collapsible-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class OpenCollapsibleDemoContainer {
  readonly code = `import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScButton,
  ScCollapsible,
  ScCollapsibleBody,
  ScCollapsibleContent,
  ScCollapsiblePanel,
  ScCollapsibleTrigger,
} from '@semantic-components/ui';
import { SiChevronDownIcon } from '@semantic-icons/lucide-icons';

@Component({
  selector: 'app-open-collapsible-demo',
  imports: [
    ScButton,
    ScCollapsible,
    ScCollapsibleBody,
    ScCollapsibleContent,
    ScCollapsiblePanel,
    ScCollapsibleTrigger,
    SiChevronDownIcon,
  ],
  template: \`
    <div scCollapsible class="w-[350px] space-y-2">
      <div class="flex items-center justify-between space-x-4 px-4">
        <h4 class="text-sm font-semibold">Initially Open</h4>
        <button
          scButton
          scCollapsibleTrigger
          [panel]="colPanel.panel"
          [expanded]="true"
          #trigger="scCollapsibleTrigger"
          variant="outline"
          size="icon"
        >
          <svg
            siChevronDownIcon
            class="transition-transform duration-200"
            [class.rotate-180]="trigger.expanded()"
          ></svg>
          <span class="sr-only">Toggle</span>
        </button>
      </div>
      <div scCollapsiblePanel #colPanel="scCollapsiblePanel">
        <ng-template scCollapsibleContent>
          <div scCollapsibleBody>
            <div class="rounded-md border px-4 py-3 text-sm">
              This collapsible is open by default. You can toggle it closed by
              clicking the button.
            </div>
          </div>
        </ng-template>
      </div>
    </div>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class OpenCollapsibleDemo {}`;
}
