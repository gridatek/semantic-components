import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { EllipsisBreadcrumbDemo } from './ellipsis-breadcrumb-demo';

@Component({
  selector: 'app-ellipsis-breadcrumb-demo-container',
  imports: [DemoContainer, EllipsisBreadcrumbDemo],
  template: `
    <app-demo-container
      title="Collapsed"
      demoUrl="/demos/breadcrumb/ellipsis-breadcrumb-demo"
      [code]="code"
    >
      <app-ellipsis-breadcrumb-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class EllipsisBreadcrumbDemoContainer {
  readonly code = `import { Component, ViewEncapsulation } from '@angular/core';
import { RouterLink } from '@angular/router';
import {
  ScBreadcrumb,
  ScBreadcrumbEllipsis,
  ScBreadcrumbItem,
  ScBreadcrumbLink,
  ScBreadcrumbList,
  ScBreadcrumbPage,
  ScBreadcrumbSeparator,
} from '@semantic-components/ui';
import {
  SiChevronRightIcon,
  SiEllipsisIcon,
} from '@semantic-icons/lucide-icons';

/** Collapsed: an ellipsis for the levels left out (hidden from screen readers). */
@Component({
  selector: 'app-ellipsis-breadcrumb-demo',
  imports: [
    RouterLink,
    ScBreadcrumb,
    ScBreadcrumbEllipsis,
    ScBreadcrumbItem,
    ScBreadcrumbLink,
    ScBreadcrumbList,
    ScBreadcrumbPage,
    ScBreadcrumbSeparator,
    SiChevronRightIcon,
    SiEllipsisIcon,
  ],
  template: \`
    <nav scBreadcrumb aria-label="Folder path">
      <ol scBreadcrumbList>
        <li scBreadcrumbItem>
          <a scBreadcrumbLink routerLink="/">Home</a>
        </li>
        <li scBreadcrumbSeparator><svg siChevronRightIcon></svg></li>
        <li scBreadcrumbItem>
          <span scBreadcrumbEllipsis><svg siEllipsisIcon></svg></span>
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
export class EllipsisBreadcrumbDemo {}`;
}
