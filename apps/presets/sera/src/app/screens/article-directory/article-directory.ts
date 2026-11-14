import { Component, ViewEncapsulation } from '@angular/core';
import { ScSeparator } from '@semantic-components/ui';
import { ArticleList } from './article-list';
import { DirectoryHeader } from './directory-header';

/** shadcn's Sera screen "Article Directory" (sera/article-directory). */
@Component({
  selector: 'app-article-directory',
  imports: [ArticleList, DirectoryHeader, ScSeparator],
  template: `
    <div
      class="bg-muted ring-foreground/5 w-full flex-1 pt-4 font-sans ring-1 [--gap:--spacing(4)] sm:pt-0 md:[--gap:--spacing(6)] xl:[--gap:--spacing(8)] 2xl:py-8"
    >
      <app-directory-header />
      <div scSeparator class="hidden sm:block"></div>
      <div class="w-full p-(--gap)">
        <app-article-list />
      </div>
    </div>
  `,
  host: { class: 'block' },
  encapsulation: ViewEncapsulation.None,
})
export class ArticleDirectory {}
