import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
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
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonGroupSplitDemoContainer {
  readonly code = `import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import {
  ScButton,
  ScButtonGroup,
  ScButtonGroupSeparator,
} from '@semantic-components/ui';
import { SiChevronDownIcon } from '@semantic-icons/lucide-icons';

@Component({
  selector: 'app-button-group-split-demo',
  imports: [ScButton, ScButtonGroup, ScButtonGroupSeparator, SiChevronDownIcon],
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
  template: \`
    <div scButtonGroup>
      <button scButton variant="outline">Save</button>
      <div scButtonGroupSeparator></div>
      <button scButton variant="outline" size="icon" aria-label="More options">
        <svg siChevronDownIcon></svg>
      </button>
    </div>
  \`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonGroupSplitDemo {}`;
}
