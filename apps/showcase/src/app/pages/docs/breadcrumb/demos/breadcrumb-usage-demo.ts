import { Component, ViewEncapsulation } from '@angular/core';
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

@Component({
  selector: 'app-breadcrumb-usage-demo',
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
  template: `
    <nav scBreadcrumb aria-label="Breadcrumb">
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
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class BreadcrumbUsageDemo {}
