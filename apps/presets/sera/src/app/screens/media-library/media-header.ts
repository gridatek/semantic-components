import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScBreadcrumb,
  ScBreadcrumbItem,
  ScBreadcrumbLink,
  ScBreadcrumbList,
  ScButton,
} from '@semantic-components/ui';
import {
  SiArrowLeftIcon,
  SiSlidersHorizontalIcon,
  SiUploadIcon,
} from '@semantic-icons/lucide-icons';

/** Back to asset management, the title, filters and upload. */
@Component({
  selector: 'app-media-header',
  imports: [
    ScBreadcrumb,
    ScBreadcrumbItem,
    ScBreadcrumbLink,
    ScBreadcrumbList,
    ScButton,
    SiArrowLeftIcon,
    SiSlidersHorizontalIcon,
    SiUploadIcon,
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
                Asset management
              </a>
            </li>
          </ol>
        </nav>
        <h1
          class="font-heading line-clamp-1 text-3xl tracking-wide uppercase md:text-3xl lg:text-4xl"
        >
          Media Library
        </h1>
      </div>
      <div class="flex gap-2 sm:ms-auto md:gap-4">
        <button
          scButton
          variant="outline"
          class="bg-background hover:bg-background/80"
        >
          <svg siSlidersHorizontalIcon data-icon="inline-start"></svg>
          Filters
        </button>
        <button scButton>
          <svg siUploadIcon data-icon="inline-start"></svg>
          Upload Assets
        </button>
      </div>
    </header>
  `,
  host: { class: 'block' },
  encapsulation: ViewEncapsulation.None,
})
export class MediaHeader {}
