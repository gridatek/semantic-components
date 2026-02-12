import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { EllipsisBreadcrumbDemo } from './ellipsis-breadcrumb-demo';

@Component({
  selector: 'app-ellipsis-breadcrumb-demo-container',
  imports: [DemoContainer, EllipsisBreadcrumbDemo],
  template: `
    <app-demo-container
      title="With Ellipsis"
      demoUrl="/demos/breadcrumb/ellipsis-breadcrumb-demo"
      [code]="code"
    >
      <app-ellipsis-breadcrumb-demo />
    </app-demo-container>
  `,
  host: { class: 'block' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EllipsisBreadcrumbDemoContainer {
  readonly code = `import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import {
  ScBreadcrumb,
  ScBreadcrumbEllipsis,
  ScBreadcrumbItem,
  ScBreadcrumbLink,
  ScBreadcrumbList,
  ScBreadcrumbPage,
  ScBreadcrumbSeparator,
} from '@semantic-components/ui-lab';

@Component({
  selector: 'app-ellipsis-breadcrumb-demo',
  imports: [
    ScBreadcrumb,
    ScBreadcrumbEllipsis,
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
          <span sc-breadcrumb-ellipsis></span>
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
export class EllipsisBreadcrumbDemo {}`;
}
