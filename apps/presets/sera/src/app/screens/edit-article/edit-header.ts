import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScBadge,
  ScBreadcrumb,
  ScBreadcrumbItem,
  ScBreadcrumbLink,
  ScBreadcrumbList,
  ScButton,
} from '@semantic-components/ui';
import {
  SiArrowLeftIcon,
  SiExternalLinkIcon,
} from '@semantic-icons/lucide-icons';

/** Back to the articles, the title, the draft's state and its actions. */
@Component({
  selector: 'app-edit-header',
  imports: [
    ScBadge,
    ScBreadcrumb,
    ScBreadcrumbItem,
    ScBreadcrumbLink,
    ScBreadcrumbList,
    ScButton,
    SiArrowLeftIcon,
    SiExternalLinkIcon,
  ],
  template: `
    <header
      class="mx-auto flex w-full flex-col items-center justify-center gap-(--gap) px-(--gap) py-(--gap) sm:flex-row sm:justify-between"
    >
      <div class="flex flex-col gap-2 text-center sm:text-start">
        <nav scBreadcrumb aria-label="Breadcrumb">
          <ol scBreadcrumbList>
            <li scBreadcrumbItem>
              <a scBreadcrumbLink href="#" class="flex items-center gap-1.5">
                <svg siArrowLeftIcon class="size-3.5"></svg>
                Back to articles
              </a>
            </li>
          </ol>
        </nav>
        <h1
          class="font-heading line-clamp-1 text-3xl tracking-wide uppercase md:text-3xl lg:text-4xl"
        >
          Edit Article
        </h1>
      </div>
      <div class="flex items-center gap-2 md:gap-4">
        <span scBadge title="2 minutes ago">Autosaved</span>
        <div class="flex items-center gap-2 md:gap-4">
          <button scButton variant="link">
            Preview
            <svg siExternalLinkIcon data-icon="inline-end"></svg>
          </button>
          <button scButton>Submit Draft</button>
        </div>
      </div>
    </header>
  `,
  host: { class: 'block' },
  encapsulation: ViewEncapsulation.None,
})
export class EditHeader {}
