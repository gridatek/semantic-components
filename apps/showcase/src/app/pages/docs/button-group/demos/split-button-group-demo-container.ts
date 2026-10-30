import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { SplitButtonGroupDemo } from './split-button-group-demo';

@Component({
  selector: 'app-split-button-group-demo-container',
  imports: [DemoContainer, SplitButtonGroupDemo],
  template: `
    <app-demo-container
      title="Split"
      demoUrl="/demos/button-group/split-button-group-demo"
      [code]="code"
    >
      <app-split-button-group-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class SplitButtonGroupDemoContainer {
  readonly code = `import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScButton,
  ScButtonGroup,
  ScButtonGroupSeparator,
} from '@semantic-components/ui';
import { SiPlusIcon } from '@semantic-icons/lucide-icons';

@Component({
  selector: 'app-split-button-group-demo',
  imports: [ScButton, ScButtonGroup, ScButtonGroupSeparator, SiPlusIcon],
  template: \`
    <div scButtonGroup aria-label="Split button">
      <button scButton variant="secondary">Button</button>
      <div scButtonGroupSeparator></div>
      <button scButton variant="secondary" size="icon">
        <svg siPlusIcon></svg>
        <span class="sr-only">Add</span>
      </button>
    </div>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class SplitButtonGroupDemo {}`;
}
