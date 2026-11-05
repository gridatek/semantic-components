import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { InputGroupKbdDemo } from './input-group-kbd-demo';

@Component({
  selector: 'app-input-group-kbd-demo-container',
  imports: [DemoContainer, InputGroupKbdDemo],
  template: `
    <app-demo-container
      title="Input group"
      demoUrl="/demos/kbd/input-group-kbd-demo"
      [code]="code"
    >
      <app-input-group-kbd-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class InputGroupKbdDemoContainer {
  readonly code = `import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScInput,
  ScInputGroup,
  ScInputGroupAddon,
  ScKbd,
} from '@semantic-components/ui';
import { SiSearchIcon } from '@semantic-icons/lucide-icons';

/** The shortcut in a search field; some styles give the key the input’s background. */
@Component({
  selector: 'app-input-group-kbd-demo',
  imports: [ScInput, ScInputGroup, ScInputGroupAddon, ScKbd, SiSearchIcon],
  template: \`
    <div class="flex w-full max-w-xs flex-col gap-6">
      <div scInputGroup>
        <input scInput placeholder="Search..." aria-label="Search" />
        <div scInputGroupAddon>
          <svg siSearchIcon></svg>
        </div>
        <div scInputGroupAddon align="inline-end">
          <kbd scKbd>⌘<span class="sr-only"> Command</span></kbd>
          <kbd scKbd>K</kbd>
        </div>
      </div>
    </div>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class InputGroupKbdDemo {}`;
}
