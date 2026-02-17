import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { ButtonInputGroupDemo } from './button-input-group-demo';

@Component({
  selector: 'app-button-input-group-demo-container',
  imports: [DemoContainer, ButtonInputGroupDemo],
  template: `
    <app-demo-container
      title="With Button"
      demoUrl="/demos/input-group/button-input-group-demo"
      [code]="code"
    >
      <app-button-input-group-demo />
    </app-demo-container>
  `,
  host: { class: 'block' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonInputGroupDemoContainer {
  readonly code = `import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import {
  ScInputGroup,
  ScInputGroupAddon,
  ScInputGroupButton,
  ScInput,
  ScInputGroupText,
} from '@semantic-components/ui';
import { SiSearchIcon, SiXIcon } from '@semantic-icons/lucide-icons';

@Component({
  selector: 'app-button-input-group-demo',
  imports: [
    ScInputGroup,
    ScInputGroupAddon,
    ScInputGroupButton,
    ScInput,
    ScInputGroupText,
    SiSearchIcon,
    SiXIcon,
  ],
  template: \`
    <div scInputGroup>
      <div scInputGroupAddon>
        <span scInputGroupText>
          <svg si-search-icon></svg>
        </span>
      </div>
      <input scInput variant="group" placeholder="Search..." />
      <div scInputGroupAddon align="inline-end">
        <button scInputGroupButton size="icon-xs">
          <svg si-x-icon></svg>
        </button>
      </div>
    </div>
  \`,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonInputGroupDemo {}`;
}
