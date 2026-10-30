import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { OutlineButtonDemo } from './outline-button-demo';

@Component({
  selector: 'app-outline-button-demo-container',
  imports: [DemoContainer, OutlineButtonDemo],
  template: `
    <app-demo-container
      title="Outline"
      demoUrl="/demos/button/outline-button-demo"
      [code]="code"
    >
      <app-outline-button-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class OutlineButtonDemoContainer {
  readonly code = `import { Component, ViewEncapsulation } from '@angular/core';
import { ScButton } from '@semantic-components/ui';

@Component({
  selector: 'app-outline-button-demo',
  imports: [ScButton],
  template: \` <button scButton variant="outline">Outline</button> \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class OutlineButtonDemo {}`;
}
