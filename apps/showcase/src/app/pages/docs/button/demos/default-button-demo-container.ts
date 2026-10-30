import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { DefaultButtonDemo } from './default-button-demo';

@Component({
  selector: 'app-default-button-demo-container',
  imports: [DemoContainer, DefaultButtonDemo],
  template: `
    <app-demo-container
      title="Default"
      demoUrl="/demos/button/default-button-demo"
      [code]="code"
    >
      <app-default-button-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class DefaultButtonDemoContainer {
  readonly code = `import { Component, ViewEncapsulation } from '@angular/core';
import { ScButton } from '@semantic-components/ui';

@Component({
  selector: 'app-default-button-demo',
  imports: [ScButton],
  template: \` <button scButton>Button</button> \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class DefaultButtonDemo {}`;
}
