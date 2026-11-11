import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { BasicCollapsibleDemo } from './basic-collapsible-demo';

@Component({
  selector: 'app-basic-collapsible-demo-container',
  imports: [DemoContainer, BasicCollapsibleDemo],
  template: `
    <app-demo-container
      title="Basic"
      demoUrl="/demos/collapsible/basic-collapsible-demo"
      [code]="code"
    >
      <app-basic-collapsible-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class BasicCollapsibleDemoContainer {
  readonly code = `import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScButton,
  ScCard,
  ScCardContent,
  ScCollapsible,
  ScCollapsiblePanel,
  ScCollapsibleTrigger,
} from '@semantic-components/ui';
import { SiChevronDownIcon } from '@semantic-icons/lucide-icons';

/** In a card: the trigger a full-width button, its chevron turned when open. */
@Component({
  selector: 'app-basic-collapsible-demo',
  imports: [
    ScButton,
    ScCard,
    ScCardContent,
    ScCollapsible,
    ScCollapsiblePanel,
    ScCollapsibleTrigger,
    SiChevronDownIcon,
  ],
  template: \`
    <div scCard class="w-full max-w-sm">
      <div scCardContent>
        <div scCollapsible class="data-open:bg-muted rounded-md">
          <button scButton scCollapsibleTrigger variant="ghost" class="w-full">
            Product details
            <svg
              siChevronDownIcon
              class="ms-auto transition-transform in-data-panel-open:rotate-180"
            ></svg>
          </button>
          <div scCollapsiblePanel>
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
export class BasicCollapsibleDemo {}`;
}
