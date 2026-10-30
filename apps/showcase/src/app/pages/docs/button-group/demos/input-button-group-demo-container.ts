import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { InputButtonGroupDemo } from './input-button-group-demo';

@Component({
  selector: 'app-input-button-group-demo-container',
  imports: [DemoContainer, InputButtonGroupDemo],
  template: `
    <app-demo-container
      title="Input"
      demoUrl="/demos/button-group/input-button-group-demo"
      [code]="code"
    >
      <app-input-button-group-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class InputButtonGroupDemoContainer {
  readonly code = `import { Component, ViewEncapsulation } from '@angular/core';
import { ScButton, ScButtonGroup, ScInput } from '@semantic-components/ui';
import { SiSearchIcon } from '@semantic-icons/lucide-icons';

@Component({
  selector: 'app-input-button-group-demo',
  imports: [ScButton, ScButtonGroup, ScInput, SiSearchIcon],
  template: \`
    <div scButtonGroup aria-label="Search">
      <input scInput placeholder="Search..." aria-label="Search" />
      <button scButton variant="outline">
        <svg siSearchIcon></svg>
        <span class="sr-only">Search</span>
      </button>
    </div>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class InputButtonGroupDemo {}`;
}
