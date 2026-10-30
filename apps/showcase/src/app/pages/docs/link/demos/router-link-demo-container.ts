import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { RouterLinkDemo } from './router-link-demo';

@Component({
  selector: 'app-router-link-demo-container',
  imports: [DemoContainer, RouterLinkDemo],
  template: `
    <app-demo-container
      title="Router Link"
      demoUrl="/demos/link/router-link-demo"
      [code]="code"
    >
      <app-router-link-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class RouterLinkDemoContainer {
  readonly code = `import { Component, ViewEncapsulation } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ScLink } from '@semantic-components/ui';

@Component({
  selector: 'app-router-link-demo',
  imports: [ScLink, RouterLink],
  template: \`
    <a scLink variant="outline" routerLink="/docs/components/button">
      Go to Button
    </a>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class RouterLinkDemo {}`;
}
