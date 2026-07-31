import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { ButtonGroupSplitDemo } from './button-group-split-demo';

@Component({
  selector: 'app-button-group-split-demo-container',
  imports: [DemoContainer, ButtonGroupSplitDemo],
  encapsulation: ViewEncapsulation.None,
  template: `
    <app-demo-container
      title="Split Button"
      demoUrl="/demos/button-group/button-group-split-demo"
      [code]="code"
    >
      <app-button-group-split-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
})
export class ButtonGroupSplitDemoContainer {
  readonly code = `import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScButton,
  ScButtonGroup,
  ScButtonGroupSeparator,
  ScMenu,
  ScMenuContent,
  ScMenuItem,
  ScMenuPortal,
  ScMenuProvider,
  ScMenuTrigger,
} from '@semantic-components/ui';
import { SiChevronDownIcon } from '@semantic-icons/lucide-icons';

@Component({
  selector: 'app-button-group-split-demo',
  imports: [
    ScButton,
    ScButtonGroup,
    ScButtonGroupSeparator,
    ScMenu,
    ScMenuContent,
    ScMenuItem,
    ScMenuPortal,
    ScMenuProvider,
    ScMenuTrigger,
    SiChevronDownIcon,
  ],
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
  template: \`
    <div scMenuProvider align="end">
      <div scButtonGroup>
        <button scButton variant="outline">Save</button>
        <div scButtonGroupSeparator></div>
        <button
          scButton
          scMenuTrigger
          variant="outline"
          size="icon"
          aria-label="More save options"
        >
          <svg siChevronDownIcon></svg>
        </button>
      </div>
      <ng-template scMenuPortal>
        <div scMenu>
          <ng-template scMenuContent>
            <div scMenuItem value="Save as draft">Save as draft</div>
            <div scMenuItem value="Save and publish">Save and publish</div>
            <div scMenuItem value="Save and close">Save and close</div>
          </ng-template>
        </div>
      </ng-template>
    </div>
  \`,
})
export class ButtonGroupSplitDemo {}`;
}
