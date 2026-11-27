import { Component, ViewEncapsulation } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ScBadge, ScButton } from '@semantic-components/ui';

/**
 * A whole page in one container: its plain elements set, no directive on any;
 * components keep their look (a data-slot), and the bits of layout that aren't
 * reading text opt out (not-typeset).
 */
@Component({
  selector: 'app-page-typeset-demo',
  imports: [RouterLink, ScBadge, ScButton],
  template: `
    <article class="typeset w-full max-w-prose">
      <nav class="not-typeset flex gap-4 text-sm" aria-label="Blog">
        <a routerLink="." class="text-muted-foreground hover:text-foreground">
          Blog
        </a>
        <a routerLink="." class="text-muted-foreground hover:text-foreground">
          Archive
        </a>
      </nav>
      <h1>Taxing Laughter</h1>
      <p>
        <span scBadge variant="secondary">Story</span>
        A tale of a king, his treasury, and the jokes of his people.
      </p>
      <h2>The Plan</h2>
      <p>
        The king's advisors had a problem: the treasury was empty. The king's
        answer was <strong>a tax on jokes</strong>.
      </p>
      <ul>
        <li>Puns: 5 gold coins</li>
        <li>One-liners: 20 gold coins</li>
      </ul>
      <h2>The People</h2>
      <p>
        The people stopped telling jokes, and the kingdom fell into a gloom —
        until a jester found a loophole.
      </p>
      <button scButton type="button" variant="outline">Read the ending</button>
    </article>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class PageTypesetDemo {}
