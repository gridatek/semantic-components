import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { SecondaryButtonDemo } from './secondary-button-demo';

@Component({
  selector: 'app-secondary-button-demo-container',
  imports: [DemoContainer, SecondaryButtonDemo],
  template: `
    <app-demo-container
      title="Secondary"
      demoUrl="/demos/button/secondary-button-demo"
      [code]="code"
    >
      <app-secondary-button-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class SecondaryButtonDemoContainer {
  readonly code = `import { Component, ViewEncapsulation } from '@angular/core';
import { ScButton } from '@semantic-components/ui';

@Component({
  selector: 'app-secondary-button-demo',
  imports: [ScButton],
  template: \` <button scButton variant="secondary">Secondary</button> \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class SecondaryButtonDemo {}`;
}
