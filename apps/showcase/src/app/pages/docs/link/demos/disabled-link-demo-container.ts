import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { DisabledLinkDemo } from './disabled-link-demo';

@Component({
  selector: 'app-disabled-link-demo-container',
  imports: [DemoContainer, DisabledLinkDemo],
  template: `
    <app-demo-container
      title="Disabled"
      demoUrl="/demos/link/disabled-link-demo"
      [code]="code"
    >
      <app-disabled-link-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class DisabledLinkDemoContainer {
  readonly code = `import { Component, ViewEncapsulation } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ScLink } from '@semantic-components/ui';

@Component({
  selector: 'app-disabled-link-demo',
  imports: [ScLink, RouterLink],
  template: \`
    <div class="flex flex-wrap items-center gap-2">
      <a scLink href="/docs/components/button" disabled>Button docs</a>
      <a scLink variant="outline" routerLink="/docs/components/badge" disabled>
        Badge docs
      </a>
    </div>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class DisabledLinkDemo {}`;
}
