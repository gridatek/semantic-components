import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { BasicBreadcrumbDemo } from './basic-breadcrumb-demo';

@Component({
  selector: 'app-basic-breadcrumb-demo-container',
  imports: [DemoContainer, BasicBreadcrumbDemo],
  template: `
    <app-demo-container
      title="Basic Breadcrumb"
      demoUrl="/demos/breadcrumb/basic-breadcrumb-demo"
      [code]="code"
    >
      <app-basic-breadcrumb-demo />
    </app-demo-container>
  `,
  host: { class: 'block' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BasicBreadcrumbDemoContainer {
  readonly code = `import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import {
  ScBreadcrumb,
  ScBreadcrumbItem,
  ScBreadcrumbLink,
  ScBreadcrumbList,
  ScBreadcrumbPage,
  ScBreadcrumbSeparator,
} from '@semantic-components/ui-lab';

@Component({
  selector: 'app-basic-breadcrumb-demo',
  imports: [
    ScBreadcrumb,
    ScBreadcrumbItem,
    ScBreadcrumbLink,
    ScBreadcrumbList,
    ScBreadcrumbPage,
    ScBreadcrumbSeparator,
  ],
  template: \`
    <nav sc-breadcrumb>
      <ol sc-breadcrumb-list>
        <li sc-breadcrumb-item>
          <a sc-breadcrumb-link href="#">Home</a>
        </li>
        <li sc-breadcrumb-separator></li>
        <li sc-breadcrumb-item>
          <a sc-breadcrumb-link href="#">Components</a>
        </li>
        <li sc-breadcrumb-separator></li>
        <li sc-breadcrumb-item>
          <span sc-breadcrumb-page>Breadcrumb</span>
        </li>
      </ol>
    </nav>
  \`,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BasicBreadcrumbDemo {}`;
}
