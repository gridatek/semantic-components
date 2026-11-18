import { Component, ViewEncapsulation, computed, input } from '@angular/core';
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
import { cn } from 'cn';

export interface Crumb {
  readonly label: string;
  readonly url?: string;
}

/**
 * A page's title and where it is (shadcndashboard's BreadcrumbComp): the
 * title as the page's h1, the trail from Home. Actions go in its content.
 */
@Component({
  selector: 'app-page-header',
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
    <div class="flex min-w-0 flex-col gap-1">
      <h1 class="text-2xl font-semibold tracking-tight">{{ title() }}</h1>
      <nav
        i18n-aria-label="@@layout.pageHeader.breadcrumb"
        scBreadcrumb
        aria-label="Breadcrumb"
      >
        <ol scBreadcrumbList>
          <li i18n="@@layout.pageHeader.home" scBreadcrumbItem>
            <a scBreadcrumbLink routerLink="/">Home</a>
          </li>
          @for (crumb of trail(); track crumb.label) {
            <li scBreadcrumbSeparator>
              <svg siChevronRightIcon class="rtl:-scale-x-100"></svg>
            </li>
            <li scBreadcrumbItem>
              @if (crumb.url) {
                <a scBreadcrumbLink [routerLink]="crumb.url">{{
                  crumb.label
                }}</a>
              } @else {
                <span scBreadcrumbPage>{{ crumb.label }}</span>
              }
            </li>
          }
        </ol>
      </nav>
    </div>
    <div class="flex flex-wrap items-center gap-2">
      <ng-content />
    </div>
  `,
  host: { '[class]': 'class()' },
  encapsulation: ViewEncapsulation.None,
})
export class PageHeader {
  readonly title = input.required<string>();
  /** After Home; the last one is the page (no link). */
  readonly trail = input<readonly Crumb[]>([]);
  readonly classInput = input<string>('', { alias: 'class' });

  private readonly class = computed(() =>
    cn('flex flex-wrap items-end justify-between gap-4', this.classInput()),
  );
}
