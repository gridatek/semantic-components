import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { GhostButtonDemo } from './ghost-button-demo';

@Component({
  selector: 'app-ghost-button-demo-container',
  imports: [DemoContainer, GhostButtonDemo],
  template: `
    <app-demo-container
      title="Ghost"
      demoUrl="/demos/button/ghost-button-demo"
      [code]="code"
    >
      <app-ghost-button-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class GhostButtonDemoContainer {
  readonly code = `import { Component, ViewEncapsulation } from '@angular/core';
import { ScButton } from '@semantic-components/ui';

@Component({
  selector: 'app-ghost-button-demo',
  imports: [ScButton],
  template: \` <button scButton variant="ghost">Ghost</button> \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class GhostButtonDemo {}`;
}
