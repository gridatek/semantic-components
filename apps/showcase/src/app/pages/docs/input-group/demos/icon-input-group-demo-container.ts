import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { IconInputGroupDemo } from './icon-input-group-demo';

@Component({
  selector: 'app-icon-input-group-demo-container',
  imports: [DemoContainer, IconInputGroupDemo],
  template: `
    <app-demo-container
      title="Icon"
      demoUrl="/demos/input-group/icon-input-group-demo"
      [code]="code"
    >
      <app-icon-input-group-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IconInputGroupDemoContainer {
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
import {
  SiCheckIcon,
  SiCreditCardIcon,
  SiInfoIcon,
  SiMailIcon,
  SiSearchIcon,
  SiStarIcon,
} from '@semantic-icons/lucide-icons';

@Component({
  selector: 'app-icon-input-group-demo',
  imports: [
    ScInput,
    ScInputGroup,
    ScInputGroupAddon,
    ScInputGroupText,
    SiSearchIcon,
    SiMailIcon,
    SiCreditCardIcon,
    SiCheckIcon,
    SiStarIcon,
    SiInfoIcon,
  ],
  template: \`
    <div class="grid w-full max-w-sm gap-6">
      <div scInputGroup>
        <div scInputGroupAddon>
          <span scInputGroupText>
            <svg siSearchIcon></svg>
          </span>
        </div>
        <input scInput placeholder="Search..." />
      </div>
      <div scInputGroup>
        <div scInputGroupAddon>
          <span scInputGroupText>
            <svg siMailIcon></svg>
          </span>
        </div>
        <input scInput type="email" placeholder="Enter your email" />
      </div>
      <div scInputGroup>
        <div scInputGroupAddon>
          <span scInputGroupText>
            <svg siCreditCardIcon></svg>
          </span>
        </div>
        <input scInput placeholder="Card number" />
        <div scInputGroupAddon align="inline-end">
          <span scInputGroupText>
            <svg siCheckIcon></svg>
          </span>
        </div>
      </div>
      <div scInputGroup>
        <input scInput placeholder="Card number" />
        <div scInputGroupAddon align="inline-end">
          <span scInputGroupText>
            <svg siStarIcon></svg>
            <svg siInfoIcon></svg>
          </span>
        </div>
      </div>
    </div>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IconInputGroupDemo {}`;
}
