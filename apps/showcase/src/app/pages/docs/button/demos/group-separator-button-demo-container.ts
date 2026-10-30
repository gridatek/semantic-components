import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { GroupSeparatorButtonDemo } from './group-separator-button-demo';

@Component({
  selector: 'app-group-separator-button-demo-container',
  imports: [DemoContainer, GroupSeparatorButtonDemo],
  template: `
    <app-demo-container
      title="Group Separator"
      demoUrl="/demos/button/group-separator-button-demo"
      [code]="code"
    >
      <app-group-separator-button-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class GroupSeparatorButtonDemoContainer {
  readonly code = `import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScButton,
  ScControlGroup,
  ScControlGroupSeparator,
} from '@semantic-components/ui';

@Component({
  selector: 'app-group-separator-button-demo',
  imports: [ScButton, ScControlGroup, ScControlGroupSeparator],
  template: \`
    <div scControlGroup aria-label="Clipboard">
      <button scButton variant="secondary" size="sm">Copy</button>
      <div scControlGroupSeparator></div>
      <button scButton variant="secondary" size="sm">Paste</button>
    </div>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class GroupSeparatorButtonDemo {}`;
}
