import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { LinkBreadcrumbDemo } from './link-breadcrumb-demo';

@Component({
  selector: 'app-link-breadcrumb-demo-container',
  imports: [DemoContainer, LinkBreadcrumbDemo],
  template: `
    <app-demo-container
      title="Link Component"
      demoUrl="/demos/breadcrumb/link-breadcrumb-demo"
      [code]="code"
    >
      <app-link-breadcrumb-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class LinkBreadcrumbDemoContainer {
  readonly code = `import { Component, ViewEncapsulation } from '@angular/core';
import { RouterLink } from '@angular/router';
import {
  ScBreadcrumb,
  ScBreadcrumbItem,
  ScBreadcrumbLink,
  ScBreadcrumbList,
  ScBreadcrumbPage,
  ScBreadcrumbSeparator,
} from '@semantic-components/ui';
import { SiChevronRightIcon } from '@semantic-icons/lucide-icons';

/** Your router's links: scBreadcrumbLink on an a with routerLink. */
@Component({
  selector: 'app-link-breadcrumb-demo',
  imports: [
    RouterLink,
    ScBreadcrumb,
    ScBreadcrumbItem,
    ScBreadcrumbLink,
    ScBreadcrumbList,
    ScBreadcrumbPage,
    ScBreadcrumbSeparator,
    SiChevronRightIcon,
  ],
  template: \`
    <nav scBreadcrumb aria-label="Site">
      <ol scBreadcrumbList>
        <li scBreadcrumbItem>
          <a scBreadcrumbLink routerLink="/">Home</a>
        </li>
        <li scBreadcrumbSeparator><svg siChevronRightIcon></svg></li>
        <li scBreadcrumbItem>
          <a scBreadcrumbLink routerLink="/docs/components">Components</a>
        </li>
        <li scBreadcrumbSeparator><svg siChevronRightIcon></svg></li>
        <li scBreadcrumbItem>
          <span scBreadcrumbPage>Breadcrumb</span>
        </li>
      </ol>
    </nav>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class LinkBreadcrumbDemo {}`;
}
