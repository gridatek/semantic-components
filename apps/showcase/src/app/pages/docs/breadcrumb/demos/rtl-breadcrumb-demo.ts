import { Component, ViewEncapsulation } from '@angular/core';
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

/** Right to left: from the right, the separators pointing left. */
@Component({
  selector: 'app-rtl-breadcrumb-demo',
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
  template: `
    <nav scBreadcrumb dir="rtl" lang="ar" aria-label="مسار التنقل">
      <ol scBreadcrumbList>
        <li scBreadcrumbItem>
          <a scBreadcrumbLink routerLink="/">الرئيسية</a>
        </li>
        <li scBreadcrumbSeparator><svg siChevronRightIcon></svg></li>
        <li scBreadcrumbItem>
          <span scBreadcrumbEllipsis><svg siEllipsisIcon></svg></span>
        </li>
        <li scBreadcrumbSeparator><svg siChevronRightIcon></svg></li>
        <li scBreadcrumbItem>
          <a scBreadcrumbLink routerLink="/docs/components">المكونات</a>
        </li>
        <li scBreadcrumbSeparator><svg siChevronRightIcon></svg></li>
        <li scBreadcrumbItem>
          <span scBreadcrumbPage>مسار التنقل</span>
        </li>
      </ol>
    </nav>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class RtlBreadcrumbDemo {}
