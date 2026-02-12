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
    <app-demo-container title="With Button" [code]="code">
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
  ScInputGroupInput,
  ScInputGroupText,
} from '@semantic-components/ui-lab';
import { SiSearchIcon, SiXIcon } from '@semantic-icons/lucide-icons';

@Component({
  selector: 'app-button-input-group-demo',
  imports: [
    ScInputGroup,
    ScInputGroupAddon,
    ScInputGroupButton,
    ScInputGroupInput,
    ScInputGroupText,
    SiSearchIcon,
    SiXIcon,
  ],
  template: \`
    <div sc-input-group>
      <div sc-input-group-addon>
        <span sc-input-group-text>
          <svg si-search-icon></svg>
        </span>
      </div>
      <input sc-input-group-input placeholder="Search..." />
      <div sc-input-group-addon align="inline-end">
        <button sc-input-group-button size="icon-xs">
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
