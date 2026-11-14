import { Component, ViewEncapsulation, input } from '@angular/core';
import { ScSeparator } from '@semantic-components/ui';
import { ARTICLES, type Article } from '../article-directory/articles-data';
import { ArticleSidebar } from './article-sidebar';
import { EditHeader } from './edit-header';
import { EditorToolbar } from './editor-toolbar';

/**
 * shadcn's Sera screen "Edit Article" (sera/edit-article): the toolbar and
 * the article as it is set — no editor behind it, as shadcn's — and its side
 * cards.
 */
@Component({
  selector: 'app-edit-article',
  imports: [ArticleSidebar, EditHeader, EditorToolbar, ScSeparator],
  template: `
    <div
      class="bg-muted ring-foreground/5 w-full flex-1 pt-4 font-sans ring-1 [--gap:--spacing(4)] sm:pt-0 md:[--gap:--spacing(6)] xl:[--gap:--spacing(8)] 2xl:py-8"
    >
      <app-edit-header />
      <div scSeparator class="hidden sm:block"></div>
      <div class="w-full px-(--page-gutter) py-(--gap)">
        <div
          class="grid grid-cols-1 items-start gap-6 xl:grid-cols-[minmax(0,1fr)_300px]"
        >
          <section class="border-border/70 bg-background flex flex-col border">
            <app-editor-toolbar />
            <div
              class="mx-auto flex max-w-2xl flex-1 flex-col gap-8 px-10 py-10 leading-loose md:px-14 lg:py-18"
            >
              <h2
                class="font-heading text-4xl leading-12 font-medium tracking-wide uppercase"
              >
                {{ article()?.title ?? 'Untitled Article' }}
              </h2>
              @if (article()) {
                <p>
                  As cities continue to expand at an unprecedented rate, the
                  architectural paradigm is shifting from mere expansion to
                  sustainable integration. The concrete jungles of the 20th
                  century are making way for structures that breathe, adapt, and
                  give back to their environments.
                </p>
                <p>
                  Historically, urban development has been a zero-sum game with
                  nature.
                </p>
                <h3 class="font-heading text-2xl tracking-wide uppercase">
                  The Living Building Challenge
                </h3>
                <p>
                  Sterling's latest project in downtown Seattle is a testament
                  to this new philosophy. "We are no longer designing static
                  structures," Sterling explained during a recent site visit.
                  "We are engineering localized ecosystems."
                </p>
                <p>
                  The building features a facade of responsive biomaterials that
                  adjust their porosity based on humidity and temperature,
                  significantly reducing the need for artificial climate
                  control. Rainwater is not merely channeled away but captured,
                  filtered through a series of integrated rooftop wetlands, and
                  reused within the building's greywater system.
                </p>
                <p class="text-muted-foreground text-sm">
                  This shift requires more than just innovative materials; it
                  demands a fundamental change in how we value space. Check with
                  engineering team for specific stats.
                </p>
              } @else {
                <p class="text-muted-foreground">Start writing…</p>
              }
            </div>
          </section>
          <app-article-sidebar [article]="article()" />
        </div>
      </div>
    </div>
  `,
  host: { class: 'block' },
  encapsulation: ViewEncapsulation.None,
})
export class EditArticle {
  /**
   * The article being edited: its title and details (the text is shadcn's,
   * the same for every one). shadcn's first by default; null, a new one.
   */
  readonly article = input<Article | null>(ARTICLES[0]);
}
