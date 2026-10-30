import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { AsLinkButtonDemo } from './as-link-button-demo';

@Component({
  selector: 'app-as-link-button-demo-container',
  imports: [DemoContainer, AsLinkButtonDemo],
  template: `
    <app-demo-container
      title="As Link"
      demoUrl="/demos/button/as-link-button-demo"
      [code]="code"
    >
      <app-as-link-button-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class AsLinkButtonDemoContainer {
  readonly code = `import { Component, ViewEncapsulation } from '@angular/core';
import { ScLink } from '@semantic-components/ui';

@Component({
  selector: 'app-as-link-button-demo',
  imports: [ScLink],
  template: \` <a scLink href="/docs/components/link">Go to the Link docs</a> \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class AsLinkButtonDemo {}`;
}
