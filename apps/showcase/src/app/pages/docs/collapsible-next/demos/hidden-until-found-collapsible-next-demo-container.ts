import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { HiddenUntilFoundCollapsibleNextDemo } from './hidden-until-found-collapsible-next-demo';

@Component({
  selector: 'app-hidden-until-found-collapsible-next-demo-container',
  imports: [DemoContainer, HiddenUntilFoundCollapsibleNextDemo],
  template: `
    <app-demo-container
      title="Hidden until found"
      demoUrl="/demos/collapsible-next/hidden-until-found-collapsible-next-demo"
      [code]="code"
    >
      <app-hidden-until-found-collapsible-next-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class HiddenUntilFoundCollapsibleNextDemoContainer {
  readonly code = `import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScButton,
  ScCollapsibleNext,
  ScCollapsibleNextPanel,
  ScCollapsibleNextTrigger,
} from '@semantic-components/ui';
import { SiChevronDownIcon } from '@semantic-icons/lucide-icons';

/** hiddenUntilFound: closed, still searched by the browser's find-in-page (Ctrl+F); a match opens it. */
@Component({
  selector: 'app-hidden-until-found-collapsible-next-demo',
  imports: [
    ScButton,
    ScCollapsibleNext,
    ScCollapsibleNextPanel,
    ScCollapsibleNextTrigger,
    SiChevronDownIcon,
  ],
  template: \`
    <div scCollapsibleNext class="w-full max-w-sm">
      <button
        scButton
        scCollapsibleNextTrigger
        variant="ghost"
        class="w-full justify-between"
      >
        Shipping details
        <svg
          siChevronDownIcon
          class="transition-transform in-data-panel-open:rotate-180"
        ></svg>
      </button>
      <div scCollapsibleNextPanel hiddenUntilFound>
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
export class HiddenUntilFoundCollapsibleNextDemo {}`;
}
