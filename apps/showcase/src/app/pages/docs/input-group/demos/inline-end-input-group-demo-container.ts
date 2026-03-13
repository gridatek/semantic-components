import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { InlineEndInputGroupDemo } from './inline-end-input-group-demo';

@Component({
  selector: 'app-inline-end-input-group-demo-container',
  imports: [DemoContainer, InlineEndInputGroupDemo],
  template: `
    <app-demo-container
      title="Inline End"
      demoUrl="/demos/input-group/inline-end-input-group-demo"
      [code]="code"
    >
      <app-inline-end-input-group-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InlineEndInputGroupDemoContainer {
  readonly code = `import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import {
  ScInput,
  ScInputGroup,
  ScInputGroupAddon,
  ScInputGroupText,
} from '@semantic-components/ui';
import { SiEyeOffIcon } from '@semantic-icons/lucide-icons';

@Component({
  selector: 'app-inline-end-input-group-demo',
  imports: [
    ScInput,
    ScInputGroup,
    ScInputGroupAddon,
    ScInputGroupText,
    SiEyeOffIcon,
  ],
  template: \`
    <div scInputGroup class="w-full max-w-sm">
      <input
        scInput
        variant="group"
        type="password"
        placeholder="Enter password"
      />
      <div scInputGroupAddon align="inline-end">
        <span scInputGroupText>
          <svg siEyeOffIcon></svg>
        </span>
      </div>
    </div>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InlineEndInputGroupDemo {}`;
}
