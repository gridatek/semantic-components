import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { BasicInputGroupDemo } from './basic-input-group-demo';

@Component({
  selector: 'app-basic-input-group-demo-container',
  imports: [DemoContainer, BasicInputGroupDemo],
  template: `
    <app-demo-container title="Basic" [code]="code">
      <app-basic-input-group-demo />
    </app-demo-container>
  `,
  host: { class: 'block' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BasicInputGroupDemoContainer {
  readonly code = `import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import {
  ScInputGroup,
  ScInputGroupAddon,
  ScInputGroupInput,
  ScInputGroupText,
} from '@semantic-components/ui-lab';
import { SiMailIcon } from '@semantic-icons/lucide-icons';

@Component({
  selector: 'app-basic-input-group-demo',
  imports: [
    ScInputGroup,
    ScInputGroupAddon,
    ScInputGroupInput,
    ScInputGroupText,
    SiMailIcon,
  ],
  template: \`
    <div sc-input-group>
      <div sc-input-group-addon>
        <span sc-input-group-text>
          <svg si-mail-icon></svg>
        </span>
      </div>
      <input sc-input-group-input placeholder="Email address" />
    </div>
  \`,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BasicInputGroupDemo {}`;
}
