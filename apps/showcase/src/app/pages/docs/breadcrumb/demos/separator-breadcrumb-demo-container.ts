import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { SeparatorBreadcrumbDemo } from './separator-breadcrumb-demo';

@Component({
  selector: 'app-separator-breadcrumb-demo-container',
  imports: [DemoContainer, SeparatorBreadcrumbDemo],
  template: `
    <app-demo-container
      title="Custom Separator"
      demoUrl="/demos/breadcrumb/separator-breadcrumb-demo"
      [code]="code"
    >
      <app-separator-breadcrumb-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class SeparatorBreadcrumbDemoContainer {
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
import { SiDotIcon } from '@semantic-icons/lucide-icons';

/** Your own separator: any icon inside it. */
@Component({
  selector: 'app-separator-breadcrumb-demo',
  imports: [
    RouterLink,
    ScBreadcrumb,
    ScBreadcrumbItem,
    ScBreadcrumbLink,
    ScBreadcrumbList,
    ScBreadcrumbPage,
    ScBreadcrumbSeparator,
    SiDotIcon,
  ],
  template: \`
    <nav scBreadcrumb aria-label="Path">
      <ol scBreadcrumbList>
        <li scBreadcrumbItem>
          <a scBreadcrumbLink routerLink="/">Home</a>
        </li>
        <li scBreadcrumbSeparator><svg siDotIcon></svg></li>
        <li scBreadcrumbItem>
          <a scBreadcrumbLink routerLink="/docs/components">Components</a>
        </li>
        <li scBreadcrumbSeparator><svg siDotIcon></svg></li>
        <li scBreadcrumbItem>
          <span scBreadcrumbPage>Breadcrumb</span>
        </li>
      </ol>
    </nav>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class SeparatorBreadcrumbDemo {}`;
}
