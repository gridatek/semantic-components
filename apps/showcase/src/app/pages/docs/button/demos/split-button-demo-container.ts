import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { SplitButtonDemo } from './split-button-demo';

@Component({
  selector: 'app-split-button-demo-container',
  imports: [DemoContainer, SplitButtonDemo],
  template: `
    <app-demo-container
      title="Split Button"
      demoUrl="/demos/button/split-button-demo"
      [code]="code"
    >
      <app-split-button-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class SplitButtonDemoContainer {
  readonly code = `import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScButton,
  ScControlGroup,
  ScControlGroupSeparator,
} from '@semantic-components/ui';
import { SiPlusIcon } from '@semantic-icons/lucide-icons';

@Component({
  selector: 'app-split-button-demo',
  imports: [ScButton, ScControlGroup, ScControlGroupSeparator, SiPlusIcon],
  template: \`
    <div scControlGroup aria-label="Split button">
      <button scButton variant="secondary">Button</button>
      <div scControlGroupSeparator></div>
      <button scButton variant="secondary" size="icon">
        <svg siPlusIcon></svg>
        <span class="sr-only">Add</span>
      </button>
    </div>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class SplitButtonDemo {}`;
}
