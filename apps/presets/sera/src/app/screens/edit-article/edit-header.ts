import { Component, ViewEncapsulation, input, output } from '@angular/core';
import { RouterLink } from '@angular/router';
import {
  ScBadge,
  ScBreadcrumb,
  ScBreadcrumbItem,
  ScBreadcrumbLink,
  ScBreadcrumbList,
  ScButton,
} from '@semantic-components/ui';
import { SiArrowLeftIcon, SiEyeIcon } from '@semantic-icons/lucide-icons';

/** Back to the articles, the title, the draft's state and its actions. */
@Component({
  selector: 'app-edit-header',
  imports: [
    RouterLink,
    ScBadge,
    ScBreadcrumb,
    ScBreadcrumbItem,
    ScBreadcrumbLink,
    ScBreadcrumbList,
    ScButton,
    SiArrowLeftIcon,
    SiEyeIcon,
  ],
  template: `
    <header
      class="flex w-full flex-col items-center justify-center gap-(--gap) px-(--page-gutter) py-(--gap) sm:flex-row sm:justify-between"
    >
      <div class="flex flex-col gap-2 text-center sm:text-start">
        <nav scBreadcrumb aria-label="Breadcrumb">
          <ol scBreadcrumbList>
            <li scBreadcrumbItem>
              <a
                scBreadcrumbLink
                routerLink="/articles"
                class="flex items-center gap-1.5"
              >
                <svg siArrowLeftIcon class="size-3.5"></svg>
                Back to articles
              </a>
            </li>
          </ol>
        </nav>
        <h1
          class="font-heading line-clamp-1 text-3xl tracking-wide uppercase md:text-3xl lg:text-4xl"
        >
          {{ isNew() ? 'New Article' : 'Edit Article' }}
        </h1>
      </div>
      <div class="flex items-center gap-2 md:gap-4">
        <span scBadge role="status">{{ state() }}</span>
        <div class="flex items-center gap-2 md:gap-4">
          <button scButton variant="link" (click)="preview.emit()">
            Preview
            <svg siEyeIcon data-icon="inline-end"></svg>
          </button>
          <button scButton (click)="submit.emit()">Submit Draft</button>
        </div>
      </div>
    </header>
  `,
  host: { class: 'block' },
  encapsulation: ViewEncapsulation.None,
})
export class EditHeader {
  /** A new article: its title says so. */
  readonly isNew = input(false);
  /** What the draft is at: "Saved", "Unsaved changes"… */
  readonly state = input('');
  readonly preview = output();
  readonly submit = output();
}
