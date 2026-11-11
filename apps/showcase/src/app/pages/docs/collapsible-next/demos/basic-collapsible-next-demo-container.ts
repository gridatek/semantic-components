import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { BasicCollapsibleNextDemo } from './basic-collapsible-next-demo';

@Component({
  selector: 'app-basic-collapsible-next-demo-container',
  imports: [DemoContainer, BasicCollapsibleNextDemo],
  template: `
    <app-demo-container
      title="Basic"
      demoUrl="/demos/collapsible-next/basic-collapsible-next-demo"
      [code]="code"
    >
      <app-basic-collapsible-next-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class BasicCollapsibleNextDemoContainer {
  readonly code = `import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScButton,
  ScCard,
  ScCardContent,
  ScCollapsibleNext,
  ScCollapsibleNextPanel,
  ScCollapsibleNextTrigger,
} from '@semantic-components/ui';
import { SiChevronDownIcon } from '@semantic-icons/lucide-icons';

/** In a card: the trigger a full-width button, its chevron turned when open. */
@Component({
  selector: 'app-basic-collapsible-next-demo',
  imports: [
    ScButton,
    ScCard,
    ScCardContent,
    ScCollapsibleNext,
    ScCollapsibleNextPanel,
    ScCollapsibleNextTrigger,
    SiChevronDownIcon,
  ],
  template: \`
    <div scCard class="w-full max-w-sm">
      <div scCardContent>
        <div scCollapsibleNext class="data-open:bg-muted rounded-md">
          <button
            scButton
            scCollapsibleNextTrigger
            variant="ghost"
            class="w-full"
          >
            Product details
            <svg
              siChevronDownIcon
              class="ms-auto transition-transform in-data-panel-open:rotate-180"
            ></svg>
          </button>
          <div scCollapsibleNextPanel>
            <div class="flex flex-col items-start gap-2 p-2.5 pt-0 text-sm">
              <p>
                This panel can be expanded or collapsed to reveal additional
                content.
              </p>
              <button scButton size="xs">Learn More</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class BasicCollapsibleNextDemo {}`;
}
