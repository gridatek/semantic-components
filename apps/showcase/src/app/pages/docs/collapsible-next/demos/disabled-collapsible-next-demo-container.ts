import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { DisabledCollapsibleNextDemo } from './disabled-collapsible-next-demo';

@Component({
  selector: 'app-disabled-collapsible-next-demo-container',
  imports: [DemoContainer, DisabledCollapsibleNextDemo],
  template: `
    <app-demo-container
      title="Disabled"
      demoUrl="/demos/collapsible-next/disabled-collapsible-next-demo"
      [code]="code"
    >
      <app-disabled-collapsible-next-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class DisabledCollapsibleNextDemoContainer {
  readonly code = `import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScButton,
  ScCollapsibleNext,
  ScCollapsibleNextPanel,
  ScCollapsibleNextTrigger,
} from '@semantic-components/ui';
import { SiChevronDownIcon } from '@semantic-icons/lucide-icons';

/** disabled: its trigger does nothing. */
@Component({
  selector: 'app-disabled-collapsible-next-demo',
  imports: [
    ScButton,
    ScCollapsibleNext,
    ScCollapsibleNextPanel,
    ScCollapsibleNextTrigger,
    SiChevronDownIcon,
  ],
  template: \`
    <div scCollapsibleNext disabled class="w-full max-w-sm">
      <button
        scButton
        scCollapsibleNextTrigger
        variant="ghost"
        class="w-full justify-between"
      >
        Archived notes
        <svg siChevronDownIcon></svg>
      </button>
      <div scCollapsibleNextPanel>
        <p class="text-muted-foreground p-2.5 text-sm">Not shown: disabled.</p>
      </div>
    </div>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class DisabledCollapsibleNextDemo {}`;
}
