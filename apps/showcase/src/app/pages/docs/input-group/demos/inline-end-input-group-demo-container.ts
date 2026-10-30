import { Component, ViewEncapsulation } from '@angular/core';
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
})
export class InlineEndInputGroupDemoContainer {
  readonly code = `import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScField,
  ScFieldDescription,
  ScInput,
  ScInputGroup,
  ScInputGroupAddon,
  ScLabel,
} from '@semantic-components/ui';
import { SiEyeOffIcon } from '@semantic-icons/lucide-icons';

@Component({
  selector: 'app-inline-end-input-group-demo',
  imports: [
    ScField,
    ScFieldDescription,
    ScInput,
    ScInputGroup,
    ScInputGroupAddon,
    ScLabel,
    SiEyeOffIcon,
  ],
  template: \`
    <div scField class="max-w-sm">
      <label scLabel>Password</label>
      <div scInputGroup>
        <input
          scInput
          type="password"
          placeholder="Enter password"
          autocomplete="current-password"
        />
        <div scInputGroupAddon align="inline-end">
          <svg siEyeOffIcon></svg>
        </div>
      </div>
      <p scFieldDescription>Icon positioned at the end.</p>
    </div>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class InlineEndInputGroupDemo {}`;
}
