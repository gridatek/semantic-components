import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { LinkButtonDemo } from './link-button-demo';

@Component({
  selector: 'app-link-button-demo-container',
  imports: [DemoContainer, LinkButtonDemo],
  template: `
    <app-demo-container
      title="Link"
      demoUrl="/demos/button/link-button-demo"
      [code]="code"
    >
      <app-link-button-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class LinkButtonDemoContainer {
  readonly code = `import { Component, ViewEncapsulation } from '@angular/core';
import { ScButton } from '@semantic-components/ui';

@Component({
  selector: 'app-link-button-demo',
  imports: [ScButton],
  template: \` <button scButton variant="link">Link</button> \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class LinkButtonDemo {}`;
}
