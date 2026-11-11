import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { HiddenUntilFoundCollapsibleDemo } from './hidden-until-found-collapsible-demo';

@Component({
  selector: 'app-hidden-until-found-collapsible-demo-container',
  imports: [DemoContainer, HiddenUntilFoundCollapsibleDemo],
  template: `
    <app-demo-container
      title="Hidden until found"
      demoUrl="/demos/collapsible/hidden-until-found-collapsible-demo"
      [code]="code"
    >
      <app-hidden-until-found-collapsible-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class HiddenUntilFoundCollapsibleDemoContainer {
  readonly code = `import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScButton,
  ScCollapsible,
  ScCollapsiblePanel,
  ScCollapsibleTrigger,
} from '@semantic-components/ui';
import { SiChevronDownIcon } from '@semantic-icons/lucide-icons';

/** hiddenUntilFound: closed, still searched by the browser's find-in-page (Ctrl+F); a match opens it. */
@Component({
  selector: 'app-hidden-until-found-collapsible-demo',
  imports: [
    ScButton,
    ScCollapsible,
    ScCollapsiblePanel,
    ScCollapsibleTrigger,
    SiChevronDownIcon,
  ],
  template: \`
    <div scCollapsible class="w-full max-w-sm">
      <button
        scButton
        scCollapsibleTrigger
        variant="ghost"
        class="w-full justify-between"
      >
        Shipping details
        <svg
          siChevronDownIcon
          class="transition-transform in-data-panel-open:rotate-180"
        ></svg>
      </button>
      <div scCollapsiblePanel hiddenUntilFound>
        <p class="text-muted-foreground p-2.5 text-sm">
          Standard shipping takes 3–5 business days. Search this page for
          "business days": the panel opens.
        </p>
      </div>
    </div>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class HiddenUntilFoundCollapsibleDemo {}`;
}
