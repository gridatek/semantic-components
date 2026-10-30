import { Component, ViewEncapsulation } from '@angular/core';
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
})
export class IconInputGroupDemoContainer {
  readonly code = `import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScInput,
  ScInputGroup,
  ScInputGroupAddon,
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
    SiCheckIcon,
    SiCreditCardIcon,
    SiInfoIcon,
    SiMailIcon,
    SiSearchIcon,
    SiStarIcon,
  ],
  template: \`
    <div class="grid w-full max-w-sm gap-6">
      <div scInputGroup>
        <input scInput placeholder="Search..." aria-label="Search" />
        <div scInputGroupAddon>
          <svg siSearchIcon></svg>
        </div>
      </div>
      <div scInputGroup>
        <input
          scInput
          type="email"
          placeholder="Enter your email"
          aria-label="Email"
        />
        <div scInputGroupAddon>
          <svg siMailIcon></svg>
        </div>
      </div>
      <div scInputGroup>
        <input
          scInput
          placeholder="Card number"
          aria-label="Card number"
          inputmode="numeric"
        />
        <div scInputGroupAddon>
          <svg siCreditCardIcon></svg>
        </div>
        <div scInputGroupAddon align="inline-end">
          <svg siCheckIcon></svg>
        </div>
      </div>
      <div scInputGroup>
        <input
          scInput
          placeholder="Card number"
          aria-label="Saved card number"
          inputmode="numeric"
        />
        <div scInputGroupAddon align="inline-end">
          <svg siStarIcon></svg>
          <svg siInfoIcon></svg>
        </div>
      </div>
    </div>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class IconInputGroupDemo {}`;
}
