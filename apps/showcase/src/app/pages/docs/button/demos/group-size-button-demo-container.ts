import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { GroupSizeButtonDemo } from './group-size-button-demo';

@Component({
  selector: 'app-group-size-button-demo-container',
  imports: [DemoContainer, GroupSizeButtonDemo],
  template: `
    <app-demo-container
      title="Group Sizes"
      demoUrl="/demos/button/group-size-button-demo"
      [code]="code"
    >
      <app-group-size-button-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class GroupSizeButtonDemoContainer {
  readonly code = `import { Component, ViewEncapsulation } from '@angular/core';
import { ScButton, ScControlGroup } from '@semantic-components/ui';
import { SiPlusIcon } from '@semantic-icons/lucide-icons';

@Component({
  selector: 'app-group-size-button-demo',
  imports: [ScButton, ScControlGroup, SiPlusIcon],
  template: \`
    <div class="flex flex-col items-start gap-8">
      <div scControlGroup aria-label="Small">
        <button scButton variant="outline" size="sm">Small</button>
        <button scButton variant="outline" size="sm">Button</button>
        <button scButton variant="outline" size="sm">Group</button>
        <button scButton variant="outline" size="icon-sm">
          <svg siPlusIcon></svg>
          <span class="sr-only">Add</span>
        </button>
      </div>
      <div scControlGroup aria-label="Default">
        <button scButton variant="outline">Default</button>
        <button scButton variant="outline">Button</button>
        <button scButton variant="outline">Group</button>
        <button scButton variant="outline" size="icon">
          <svg siPlusIcon></svg>
          <span class="sr-only">Add</span>
        </button>
      </div>
      <div scControlGroup aria-label="Large">
        <button scButton variant="outline" size="lg">Large</button>
        <button scButton variant="outline" size="lg">Button</button>
        <button scButton variant="outline" size="lg">Group</button>
        <button scButton variant="outline" size="icon-lg">
          <svg siPlusIcon></svg>
          <span class="sr-only">Add</span>
        </button>
      </div>
    </div>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class GroupSizeButtonDemo {}`;
}
