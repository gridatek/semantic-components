import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { BasicInputDemo } from './basic-input-demo';

@Component({
  selector: 'app-basic-input-demo-container',
  imports: [DemoContainer, BasicInputDemo],
  template: `
    <app-demo-container
      title="Basic"
      demoUrl="/demos/input/basic-input-demo"
      [code]="code"
    >
      <app-basic-input-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class BasicInputDemoContainer {
  readonly code = `import { Component, ViewEncapsulation } from '@angular/core';
import { ScInput } from '@semantic-components/ui';

@Component({
  selector: 'app-basic-input-demo',
  imports: [ScInput],
  template: \`
    <input
      scInput
      placeholder="Enter text"
      aria-label="Text"
      class="max-w-xs"
    />
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class BasicInputDemo {}`;
}
