import { Component, ViewEncapsulation } from '@angular/core';
import { ArticleDirectory } from '../../screens/article-directory/article-directory';
import { AudienceAnalytics } from '../../screens/audience-analytics/audience-analytics';
import { EditArticle } from '../../screens/edit-article/edit-article';
import { EmptyState } from '../../screens/empty-state/empty-state';
import { MediaLibraryTable } from '../../screens/media-library-table/media-library-table';
import { MediaLibrary } from '../../screens/media-library/media-library';

/**
 * shadcn's Sera announcement (apps/v4/app/(app)/(styles)/sera/page.tsx): its
 * header, then its screens in shadcn's order — Audience Analytics, Article
 * Directory, Empty State, Edit Article, Media Library, Media Library Table.
 */
@Component({
  selector: 'app-sera-page',
  imports: [
    ArticleDirectory,
    AudienceAnalytics,
    EditArticle,
    EmptyState,
    MediaLibrary,
    MediaLibraryTable,
  ],
  template: `
    <header class="mx-auto flex w-full flex-col gap-2 px-4 py-12 md:px-6">
      <h1 class="font-heading text-[2.875rem] leading-tight tracking-tight">
        Introducing Sera
      </h1>
      <p class="text-muted-foreground max-w-2xl text-pretty md:text-balance">
        Minimal. Editorial. Typographic. Underline Controls and Uppercase
        Headings. Shaped by Print Design Principles.
      </p>
    </header>
    <main class="flex flex-col gap-10 md:px-2 md:py-12">
      <app-audience-analytics />
      <app-article-directory />
      <app-empty-state />
      <app-edit-article />
      <app-media-library />
      <app-media-library-table />
    </main>
  `,
  host: { class: 'block' },
  encapsulation: ViewEncapsulation.None,
})
export default class SeraPage {}
