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
} from '@semantic-components/ui';

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
    <nav scBreadcrumb>
      <ol scBreadcrumbList>
        <li scBreadcrumbItem>
          <a scBreadcrumbLink href="#">Home</a>
        </li>
        <li scBreadcrumbSeparator></li>
        <li scBreadcrumbItem>
          <span scBreadcrumbEllipsis></span>
        </li>
        <li scBreadcrumbSeparator></li>
        <li scBreadcrumbItem>
          <a scBreadcrumbLink href="#">Components</a>
        </li>
        <li scBreadcrumbSeparator></li>
        <li scBreadcrumbItem>
          <span scBreadcrumbPage>Breadcrumb</span>
        </li>
      </ol>
    </nav>
  \`,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EllipsisBreadcrumbDemo {}`;
}
