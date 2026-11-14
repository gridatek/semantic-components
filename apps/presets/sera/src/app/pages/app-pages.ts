import {
  Component,
  ViewEncapsulation,
  computed,
  input,
  signal,
} from '@angular/core';
import { ArticleDirectory } from '../screens/article-directory/article-directory';
import {
  ARTICLES,
  articlesOf,
} from '../screens/article-directory/articles-data';
import { AudienceAnalytics } from '../screens/audience-analytics/audience-analytics';
import { EditArticle } from '../screens/edit-article/edit-article';
import { EmptyState } from '../screens/empty-state/empty-state';
import { MediaLibraryTable } from '../screens/media-library-table/media-library-table';
import { MediaLibrary } from '../screens/media-library/media-library';

/** The site's pages: shadcn's screens, wired to the routes and to each other. */

@Component({
  selector: 'app-dashboard-page',
  imports: [AudienceAnalytics],
  template: `<app-audience-analytics />`,
  host: { class: 'block' },
  encapsulation: ViewEncapsulation.None,
})
export class DashboardPage {}

/** The articles, all or an issue's (`?issue=`); an issue without any is empty. */
@Component({
  selector: 'app-articles-page',
  imports: [ArticleDirectory, EmptyState],
  template: `
    @if (hasArticles()) {
      <app-article-directory [issue]="issue() ?? null" />
    } @else {
      <app-empty-state />
    }
  `,
  host: { class: 'block' },
  encapsulation: ViewEncapsulation.None,
})
export class ArticlesPage {
  /** The query's `issue`. */
  readonly issue = input<string | undefined>();
  protected readonly hasArticles = computed(
    () => articlesOf(this.issue() ?? null).length > 0,
  );
}

/** An article to edit (`:id`), or a new one (`new`). */
@Component({
  selector: 'app-edit-article-page',
  imports: [EditArticle],
  template: `<app-edit-article [article]="article()" />`,
  host: { class: 'block' },
  encapsulation: ViewEncapsulation.None,
})
export class EditArticlePage {
  /** The route's `id`. */
  readonly id = input.required<string>();
  protected readonly article = computed(
    () => ARTICLES.find((article) => article.id === this.id()) ?? null,
  );
}

/** The media, as a grid (its details beside) or a table (its filters beside). */
@Component({
  selector: 'app-media-page',
  imports: [MediaLibrary, MediaLibraryTable],
  template: `
    @if (view() === 'grid') {
      <app-media-library [(view)]="view" />
    } @else {
      <app-media-library-table [(view)]="view" />
    }
  `,
  host: { class: 'block' },
  encapsulation: ViewEncapsulation.None,
})
export class MediaPage {
  protected readonly view = signal<'grid' | 'table' | null>('grid');
}
