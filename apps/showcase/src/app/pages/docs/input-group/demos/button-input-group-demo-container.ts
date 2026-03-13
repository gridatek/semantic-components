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
  host: { class: 'block w-full' },
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
  ScButton,
  ScInput,
  ScInputGroup,
  ScInputGroupAddon,
  ScInputGroupText,
} from '@semantic-components/ui';
import { SiSearchIcon, SiXIcon } from '@semantic-icons/lucide-icons';

@Component({
  selector: 'app-button-input-group-demo',
  imports: [
    ScInputGroup,
    ScInputGroupAddon,
    ScButton,
    ScInput,
    ScInputGroupText,
    SiSearchIcon,
    SiXIcon,
  ],
  template: \`
    <div scInputGroup class="w-full max-w-sm">
      <div scInputGroupAddon>
        <span scInputGroupText>
          <svg siSearchIcon></svg>
        </span>
      </div>
      <input scInput placeholder="Search..." />
      <div scInputGroupAddon align="inline-end">
        <button scButton variant="ghost" size="icon-xs" aria-label="Clear">
          <svg siXIcon></svg>
        </button>
      </div>
    </div>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonInputGroupDemo {}`;
}
