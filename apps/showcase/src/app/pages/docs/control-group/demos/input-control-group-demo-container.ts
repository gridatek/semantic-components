import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { InputControlGroupDemo } from './input-control-group-demo';

@Component({
  selector: 'app-input-control-group-demo-container',
  imports: [DemoContainer, InputControlGroupDemo],
  template: `
    <app-demo-container
      title="Input"
      demoUrl="/demos/control-group/input-control-group-demo"
      [code]="code"
    >
      <app-input-control-group-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class InputControlGroupDemoContainer {
  readonly code = `import { Component, ViewEncapsulation } from '@angular/core';
import { ScButton, ScControlGroup, ScInput } from '@semantic-components/ui';
import { SiSearchIcon } from '@semantic-icons/lucide-icons';

@Component({
  selector: 'app-input-control-group-demo',
  imports: [ScButton, ScControlGroup, ScInput, SiSearchIcon],
  template: \`
    <div scControlGroup aria-label="Search">
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
export class InputControlGroupDemo {}`;
}
