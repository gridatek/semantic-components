import { Component, ViewEncapsulation } from '@angular/core';
import { RouterLink } from '@angular/router';
import {
  ScBreadcrumb,
  ScBreadcrumbItem,
  ScBreadcrumbLink,
  ScBreadcrumbList,
  ScLink,
} from '@semantic-components/ui';
import { SiArrowLeftIcon, SiPlusIcon } from '@semantic-icons/lucide-icons';

/** Back to the dashboard, the title, a new article. */
@Component({
  selector: 'app-directory-header',
  imports: [
    RouterLink,
    ScBreadcrumb,
    ScBreadcrumbItem,
    ScBreadcrumbLink,
    ScBreadcrumbList,
    ScLink,
    SiArrowLeftIcon,
    SiPlusIcon,
  ],
  template: `
    <header
      class="flex w-full flex-col items-center justify-center gap-(--gap) px-(--page-gutter) py-(--gap) sm:flex-row sm:justify-between"
    >
      <div class="flex flex-col gap-2 text-center sm:text-start">
        <nav scBreadcrumb aria-label="Breadcrumb">
          <ol scBreadcrumbList class="justify-center md:justify-start">
            <li scBreadcrumbItem>
              <a
                scBreadcrumbLink
                routerLink="/dashboard"
                class="inline-flex items-center gap-1.5"
              >
                <svg siArrowLeftIcon class="size-3"></svg>
                Editorial Dashboard
              </a>
            </li>
          </ol>
        </nav>
        <h1
          class="font-heading line-clamp-1 text-3xl tracking-wide uppercase md:text-3xl lg:text-4xl"
        >
          Article Directory
        </h1>
      </div>
      <div class="flex gap-2 sm:ms-auto md:gap-4">
        <a scLink variant="button" routerLink="/articles/new">
          <svg siPlusIcon data-icon="inline-start"></svg>
          New Article
        </a>
      </div>
    </header>
  `,
  host: { class: 'block' },
  encapsulation: ViewEncapsulation.None,
})
export class DirectoryHeader {}
