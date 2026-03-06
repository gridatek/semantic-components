import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { DisabledCollapsibleDemo } from './disabled-collapsible-demo';

@Component({
  selector: 'app-disabled-collapsible-demo-container',
  imports: [DemoContainer, DisabledCollapsibleDemo],
  template: `
    <app-demo-container title="Disabled" [code]="code">
      <app-disabled-collapsible-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DisabledCollapsibleDemoContainer {
  readonly code = `import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import {
  ScCollapsible,
  ScCollapsibleBody,
  ScCollapsibleContent,
  ScCollapsiblePanel,
  ScCollapsibleTrigger,
} from '@semantic-components/ui';
import { SiChevronDownIcon } from '@semantic-icons/lucide-icons';

@Component({
  selector: 'app-disabled-collapsible-demo',
  imports: [
    ScCollapsible,
    ScCollapsibleBody,
    ScCollapsibleContent,
    ScCollapsiblePanel,
    ScCollapsibleTrigger,
    SiChevronDownIcon,
  ],
  template: \`
    <div scCollapsible [disabled]="true" class="w-[350px] space-y-2">
      <div class="flex items-center justify-between space-x-4 px-4">
        <h4 class="text-muted-foreground text-sm font-semibold">
          Disabled Collapsible
        </h4>
        <button
          scCollapsibleTrigger
          panelId="collapsible-disabled"
          [disabled]="true"
          class="border-input bg-background hover:bg-accent hover:text-accent-foreground focus-visible:ring-ring inline-flex h-9 w-9 cursor-pointer items-center justify-center rounded-md border text-sm font-medium shadow-xs transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50"
        >
          <svg siChevronDownIcon class="size-4"></svg>
          <span class="sr-only">Toggle</span>
        </button>
      </div>
      <div scCollapsiblePanel panelId="collapsible-disabled">
        <ng-template scCollapsibleContent>
          <sc-collapsible-body>
            <div class="rounded-md border px-4 py-3 text-sm">
              This content is hidden.
            </div>
          </sc-collapsible-body>
        </ng-template>
      </div>
    </div>
  \`,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DisabledCollapsibleDemo {}`;
}
