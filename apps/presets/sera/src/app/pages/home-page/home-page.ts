import { Component, ViewEncapsulation } from '@angular/core';
import { RouterLink } from '@angular/router';
import {
  ScCard,
  ScCardBody,
  ScCardDescription,
  ScCardFooter,
  ScCardHeader,
  ScCardTitle,
  ScLink,
  ScSeparator,
} from '@semantic-components/ui';
import {
  SiArrowRightIcon,
  SiMoveRightIcon,
} from '@semantic-icons/lucide-icons';
import {
  ISSUES,
  articlesOf,
} from '../../screens/article-directory/articles-data';

/** The site's pages, presented. */
const PAGES = [
  {
    path: '/dashboard',
    title: 'Dashboard',
    description:
      'Audience analytics for the editorial team: visitors, readers, traffic and the most read pieces.',
  },
  {
    path: '/articles',
    title: 'Articles',
    description:
      'Every piece in the pipeline, from drafting to published — open one to edit it.',
  },
  {
    path: '/media',
    title: 'Media',
    description:
      'The photography, video and documents of each issue, as a grid or a table.',
  },
];

/** Sera's principles, in shadcn's words. */
const PRINCIPLES = [
  {
    title: 'Typography first',
    text: 'Serif headings over a sans-serif body: Playfair Display and Noto Sans.',
  },
  {
    title: 'Print geometry',
    text: 'Square corners, hairline rules and generous margins, as on a printed page.',
  },
  {
    title: 'Quiet controls',
    text: 'Underlined links and buttons, uppercase labels with wide tracking.',
  },
];

/** The website's home: "Introducing Sera", its pages, its issues, its style. */
@Component({
  selector: 'app-home-page',
  imports: [
    RouterLink,
    ScCard,
    ScCardBody,
    ScCardDescription,
    ScCardFooter,
    ScCardHeader,
    ScCardTitle,
    ScLink,
    ScSeparator,
    SiArrowRightIcon,
    SiMoveRightIcon,
  ],
  template: `
    <section
      class="flex w-full flex-col items-start gap-6 px-(--page-gutter) py-20 md:py-28"
    >
      <p
        class="text-muted-foreground text-xs font-semibold tracking-widest uppercase"
      >
        A style for Semantic Components
      </p>
      <h1
        class="font-heading text-5xl leading-tight tracking-tight md:text-7xl"
      >
        Introducing Sera
      </h1>
      <p
        class="text-muted-foreground max-w-2xl text-lg text-pretty md:text-xl md:text-balance"
      >
        Minimal. Editorial. Typographic. Underline Controls and Uppercase
        Headings. Shaped by Print Design Principles.
      </p>
      <div class="flex flex-wrap items-center gap-4 pt-2">
        <a scLink variant="button" routerLink="/dashboard">
          Open the dashboard
          <svg siArrowRightIcon data-icon="inline-end"></svg>
        </a>
        <a scLink variant="outline" routerLink="/articles">Browse articles</a>
      </div>
    </section>

    <div scSeparator></div>

    <section aria-labelledby="inside" class="bg-muted w-full py-16">
      <!-- The band full width; its column as the other sections'. -->
      <div class="flex w-full flex-col gap-8 px-(--page-gutter)">
        <h2 id="inside" class="font-heading text-3xl tracking-wide uppercase">
          Inside
        </h2>
        <div class="grid gap-6 md:grid-cols-3">
          @for (page of pages; track page.path) {
            <div scCard>
              <div scCardHeader>
                <h3 scCardTitle class="text-2xl">{{ page.title }}</h3>
                <p scCardDescription>{{ page.description }}</p>
              </div>
              <div scCardFooter class="mt-auto">
                <a scLink variant="link" class="px-0" [routerLink]="page.path">
                  Open {{ page.title }}
                  <svg siMoveRightIcon data-icon="inline-end"></svg>
                </a>
              </div>
            </div>
          }
        </div>
      </div>
    </section>

    <section
      aria-labelledby="issues"
      class="flex w-full flex-col gap-8 px-(--page-gutter) py-16"
    >
      <h2 id="issues" class="font-heading text-3xl tracking-wide uppercase">
        Issues
      </h2>
      <ul class="divide-border border-border divide-y border-y">
        @for (issue of issues; track issue.id) {
          <li>
            <a
              class="hover:bg-muted/50 flex items-baseline justify-between gap-4 px-1 py-5"
              routerLink="/articles"
              [queryParams]="{ issue: issue.id }"
            >
              <span class="font-heading text-2xl">{{ issue.label }}</span>
              <span
                class="text-muted-foreground text-xs font-semibold tracking-widest uppercase"
              >
                {{ countText(issue.id) }}
              </span>
            </a>
          </li>
        }
      </ul>
    </section>

    <div scSeparator></div>

    <section
      aria-labelledby="style"
      class="flex w-full flex-col gap-8 px-(--page-gutter) py-16"
    >
      <h2 id="style" class="font-heading text-3xl tracking-wide uppercase">
        The style
      </h2>
      <div class="grid gap-10 md:grid-cols-3">
        @for (principle of principles; track principle.title) {
          <div class="flex flex-col gap-2">
            <h3 class="text-xs font-semibold tracking-widest uppercase">
              {{ principle.title }}
            </h3>
            <p class="text-muted-foreground leading-relaxed">
              {{ principle.text }}
            </p>
          </div>
        }
      </div>
      <a scLink class="w-fit" routerLink="/screens">
        See all six screens, as shadcn shows them
      </a>
    </section>
  `,
  host: { class: 'block' },
  encapsulation: ViewEncapsulation.None,
})
export default class HomePage {
  protected readonly pages = PAGES;
  protected readonly issues = ISSUES;
  protected readonly principles = PRINCIPLES;

  /** "4 articles", "1 article", "No articles yet". */
  protected countText(issue: string): string {
    const count = articlesOf(issue).length;
    if (!count) return 'No articles yet';
    return `${count} ${count === 1 ? 'article' : 'articles'}`;
  }
}
