import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { LinkItemDemo } from './link-item-demo';

@Component({
  selector: 'app-link-item-demo-container',
  imports: [DemoContainer, LinkItemDemo],
  template: `
    <app-demo-container
      title="Link"
      demoUrl="/demos/item/link-item-demo"
      [code]="code"
    >
      <app-link-item-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class LinkItemDemoContainer {
  readonly code = `import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScItem,
  ScItemActions,
  ScItemBody,
  ScItemDescription,
  ScItemTitle,
} from '@semantic-components/ui';
import {
  SiChevronRightIcon,
  SiExternalLinkIcon,
} from '@semantic-icons/lucide-icons';

/** scItem on a link: the whole item goes there, named by its text; to a new tab, it says so. */
@Component({
  selector: 'app-link-item-demo',
  imports: [
    ScItem,
    ScItemActions,
    ScItemBody,
    ScItemDescription,
    ScItemTitle,
    SiChevronRightIcon,
    SiExternalLinkIcon,
  ],
  template: \`
    <div class="flex w-full max-w-md flex-col gap-4">
      <a scItem href="#link">
        <div scItemBody>
          <div scItemTitle>Visit our documentation</div>
          <p scItemDescription>Learn how to get started with our components.</p>
        </div>
        <div scItemActions>
          <svg siChevronRightIcon class="size-4"></svg>
        </div>
      </a>
      <a
        scItem
        variant="outline"
        href="https://angular.dev"
        target="_blank"
        rel="noopener noreferrer"
      >
        <div scItemBody>
          <div scItemTitle>
            External resource<span class="sr-only"> (opens in a new tab)</span>
          </div>
          <p scItemDescription>Opens in a new tab with security attributes.</p>
        </div>
        <div scItemActions>
          <svg siExternalLinkIcon class="size-4"></svg>
        </div>
      </a>
    </div>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class LinkItemDemo {}`;
}
