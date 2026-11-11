import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { DisabledCollapsibleDemo } from './disabled-collapsible-demo';

@Component({
  selector: 'app-disabled-collapsible-demo-container',
  imports: [DemoContainer, DisabledCollapsibleDemo],
  template: `
    <app-demo-container
      title="Disabled"
      demoUrl="/demos/collapsible/disabled-collapsible-demo"
      [code]="code"
    >
      <app-disabled-collapsible-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class DisabledCollapsibleDemoContainer {
  readonly code = `import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScButton,
  ScCollapsible,
  ScCollapsiblePanel,
  ScCollapsibleTrigger,
} from '@semantic-components/ui';
import { SiChevronDownIcon } from '@semantic-icons/lucide-icons';

/** disabled: its trigger does nothing. */
@Component({
  selector: 'app-disabled-collapsible-demo',
  imports: [
    ScButton,
    ScCollapsible,
    ScCollapsiblePanel,
    ScCollapsibleTrigger,
    SiChevronDownIcon,
  ],
  template: \`
    <div scCollapsible disabled class="w-full max-w-sm">
      <button
        scButton
        scCollapsibleTrigger
        variant="ghost"
        class="w-full justify-between"
      >
        Archived notes
        <svg siChevronDownIcon></svg>
      </button>
      <div scCollapsiblePanel>
        <p class="text-muted-foreground p-2.5 text-sm">Not shown: disabled.</p>
      </div>
    </div>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class DisabledCollapsibleDemo {}`;
}
