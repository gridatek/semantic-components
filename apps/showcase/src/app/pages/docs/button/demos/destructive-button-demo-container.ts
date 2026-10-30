import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { DestructiveButtonDemo } from './destructive-button-demo';

@Component({
  selector: 'app-destructive-button-demo-container',
  imports: [DemoContainer, DestructiveButtonDemo],
  template: `
    <app-demo-container
      title="Destructive"
      demoUrl="/demos/button/destructive-button-demo"
      [code]="code"
    >
      <app-destructive-button-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class DestructiveButtonDemoContainer {
  readonly code = `import { Component, ViewEncapsulation } from '@angular/core';
import { ScButton } from '@semantic-components/ui';

@Component({
  selector: 'app-destructive-button-demo',
  imports: [ScButton],
  template: \` <button scButton variant="destructive">Destructive</button> \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class DestructiveButtonDemo {}`;
}
