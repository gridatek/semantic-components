import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { InlineInputDemo } from './inline-input-demo';

@Component({
  selector: 'app-inline-input-demo-container',
  imports: [DemoContainer, InlineInputDemo],
  template: `
    <app-demo-container
      title="Inline"
      demoUrl="/demos/input/inline-input-demo"
      [code]="code"
    >
      <app-inline-input-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class InlineInputDemoContainer {
  readonly code = `import { Component, ViewEncapsulation } from '@angular/core';
import { ScButton, ScField, ScInput } from '@semantic-components/ui';

@Component({
  selector: 'app-inline-input-demo',
  imports: [ScButton, ScField, ScInput],
  template: \`
    <div scField orientation="horizontal" class="w-full max-w-sm">
      <input
        scInput
        type="search"
        placeholder="Search..."
        aria-label="Search"
      />
      <button scButton>Search</button>
    </div>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class InlineInputDemo {}`;
}
