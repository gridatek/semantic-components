import {
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
  template: `
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
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BasicBreadcrumbDemo {}
