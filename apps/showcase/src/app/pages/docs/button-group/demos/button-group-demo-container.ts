import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { ButtonGroupDemo } from './button-group-demo';

@Component({
  selector: 'app-button-group-demo-container',
  imports: [DemoContainer, ButtonGroupDemo],
  encapsulation: ViewEncapsulation.None,
  template: `
    <app-demo-container
      title="Button Group"
      demoUrl="/demos/button-group/button-group-demo"
      [code]="code"
    >
      <app-button-group-demo />
    </app-demo-container>
  `,
  host: { class: 'block' },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonGroupDemoContainer {
  readonly code = `import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import {
  ScButton,
  ScButtonGroup,
  ScButtonGroupSeparator,
  ScButtonGroupText,
} from '@semantic-components/ui';

@Component({
  selector: 'app-button-group-demo',
  imports: [ScButton, ScButtonGroup, ScButtonGroupSeparator, ScButtonGroupText],
  encapsulation: ViewEncapsulation.None,
  template: \`
    <div class="flex flex-col gap-4">
      <div scButtonGroup>
        <button scButton variant="outline">First</button>
        <button scButton variant="outline">Second</button>
        <button scButton variant="outline">Third</button>
      </div>

      <div scButtonGroup>
        <div scButtonGroupText>Label</div>
        <button scButton variant="outline">Action</button>
      </div>

      <div scButtonGroup>
        <button scButton variant="outline">Left</button>
        <div scButtonGroupSeparator></div>
        <button scButton variant="outline">Right</button>
      </div>
    </div>
  \`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonGroupDemo {}`;
}
