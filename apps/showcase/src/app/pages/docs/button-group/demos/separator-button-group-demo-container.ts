import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { SeparatorButtonGroupDemo } from './separator-button-group-demo';

@Component({
  selector: 'app-separator-button-group-demo-container',
  imports: [DemoContainer, SeparatorButtonGroupDemo],
  template: `
    <app-demo-container
      title="Separator"
      demoUrl="/demos/button-group/separator-button-group-demo"
      [code]="code"
    >
      <app-separator-button-group-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class SeparatorButtonGroupDemoContainer {
  readonly code = `import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScButton,
  ScButtonGroup,
  ScButtonGroupSeparator,
} from '@semantic-components/ui';

@Component({
  selector: 'app-separator-button-group-demo',
  imports: [ScButton, ScButtonGroup, ScButtonGroupSeparator],
  template: \`
    <div scButtonGroup aria-label="Clipboard">
      <button scButton variant="secondary" size="sm">Copy</button>
      <div scButtonGroupSeparator></div>
      <button scButton variant="secondary" size="sm">Paste</button>
    </div>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class SeparatorButtonGroupDemo {}`;
}
