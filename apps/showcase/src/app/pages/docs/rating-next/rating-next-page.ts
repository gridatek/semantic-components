import { Component, ViewEncapsulation } from '@angular/core';
import { ScKbd, ScTypeset } from '@semantic-components/ui';
import { Anatomy } from '../../../components/anatomy/anatomy';
import { ComponentBadges } from '../../../components/component-badges/component-badges';
import { PartsTable } from '../../../components/parts-table/parts-table';
import { TocHeading } from '../../../components/toc/toc-heading';
import { DeselectableRatingNextDemoContainer } from './demos/deselectable-rating-next-demo-container';
import { DisabledRatingNextDemoContainer } from './demos/disabled-rating-next-demo-container';
import { FormRatingNextDemoContainer } from './demos/form-rating-next-demo-container';
import { HalfRatingNextDemoContainer } from './demos/half-rating-next-demo-container';
import { IconsRatingNextDemoContainer } from './demos/icons-rating-next-demo-container';
import { RatingNextUsageDemoContainer } from './demos/rating-next-usage-demo-container';
import { ReadonlyRatingNextDemoContainer } from './demos/readonly-rating-next-demo-container';
import { RtlRatingNextDemoContainer } from './demos/rtl-rating-next-demo-container';
import { SizeRatingNextDemoContainer } from './demos/size-rating-next-demo-container';

@Component({
  selector: 'app-rating-next-page',
  imports: [
    ScKbd,
    PartsTable,
    Anatomy,
    RatingNextUsageDemoContainer,
    HalfRatingNextDemoContainer,
    FormRatingNextDemoContainer,
    ReadonlyRatingNextDemoContainer,
    DisabledRatingNextDemoContainer,
    DeselectableRatingNextDemoContainer,
    IconsRatingNextDemoContainer,
    SizeRatingNextDemoContainer,
    RtlRatingNextDemoContainer,
    TocHeading,
    ComponentBadges,
    ScTypeset,
  ],
  template: `
    <div class="space-y-12">
      <div class="space-y-2">
        <h1 scTypeset>Rating Next</h1>
        <p class="text-muted-foreground">
          A score in stars, or any icon: one control, whole or half stars, read
          out by your words. Not rated is null — a Signal Forms field.
        </p>
        <app-component-badges path="rating-next" />
      </div>

      <section class="space-y-4">
        <h2 scTypeset appToc>Usage</h2>
        <app-rating-next-usage-demo-container />
      </section>

      <section class="space-y-4">
        <h2 scTypeset appToc>Anatomy</h2>
        <p>
          The rating holds the score and takes the focus; in it, your stars —
          each your icon twice, empty then full: the full one is drawn up to the
          star&apos;s fill. A star&apos;s place gives its score.
        </p>
        <app-anatomy [imports]="anatomy.imports" [markup]="anatomy.markup" />
      </section>

      <section class="space-y-4">
        <h2 scTypeset appToc>Accessibility</h2>
        <ul class="list-disc space-y-2 ps-6">
          <li>
            WAI-ARIA&apos;s rating slider: one tab stop.
            <kbd scKbd>→</kbd> and <kbd scKbd>↑</kbd> raise it by its step,
            <kbd scKbd>←</kbd> and <kbd scKbd>↓</kbd> lower it (mirrored right
            to left), <kbd scKbd>Home</kbd> and <kbd scKbd>End</kbd> go to the
            lowest and highest scores. Deselectable,
            <kbd scKbd>Delete</kbd> takes the score back.
          </li>
          <li>
            Read out by your valueText ("{{ '{' }}value{{ '}' }} out of
            {{ '{' }}max{{ '}' }} stars": "3.5 out of 5 stars"), named by its
            field&apos;s label or aria-label. The stars themselves are hidden
            from screen readers.
          </li>
          <li>
            Read-only, it is an image named by its value text, for any score
            (4.2). The empty and full stars differ by fill, not only colour.
          </li>
          <li>
            A hover previews (not on touch: a tap picks at once); a press on the
            left half of a star gives a half, with step 0.5.
          </li>
        </ul>
      </section>

      <section class="space-y-8">
        <h2 scTypeset appToc>Examples</h2>
        <app-half-rating-next-demo-container />
        <app-form-rating-next-demo-container />
        <app-readonly-rating-next-demo-container />
        <app-disabled-rating-next-demo-container />
        <app-deselectable-rating-next-demo-container />
        <app-icons-rating-next-demo-container />
        <app-size-rating-next-demo-container />
        <app-rtl-rating-next-demo-container />
      </section>

      <section class="space-y-4">
        <h2 scTypeset appToc>API reference</h2>
        <p>
          Each part takes
          <code class="bg-muted rounded px-1.5 py-0.5 text-sm">class</code>,
          merged over the style (cn: a later class wins).
        </p>
        <app-parts-table label="Rating Next parts" [parts]="parts" />
      </section>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
})
export default class RatingNextPage {
  private readonly anatomy = {
    imports:
      "import { ScRatingNext, ScRatingNextItem } from '@semantic-components/ui';",
    markup: [
      '<div scRatingNext [formField]="…" valueText="{value} out of {max} stars">',
      '  @for (star of stars; track star) {',
      '    <span scRatingNextItem>',
      '      <svg siStarIcon></svg>',
      '      <svg siStarIcon></svg>',
      '    </span>',
      '  }',
      '</div>',
    ].join('\n'),
  };

  private readonly parts = [
    {
      name: 'ScRatingNext',
      selector: 'div[scRatingNext]',
      description:
        'A slider (an image, read-only): value, a number or null while not rated (two-way, or a [formField]); step (1, or 0.5 for halves); deselectable; readonly; disabled; valueText ({value}, {max}, in LOCALE_ID). exportAs scRatingNext: count(), shown(), text().',
    },
    {
      name: 'ScRatingNextItem',
      selector: '[scRatingNextItem]',
      description:
        "A star, hidden from screen readers: your icon twice, empty then full — the full one drawn up to its fill (--sc-rating-fill, 0 to 1). Its colour is the full icon's (text-primary; yours by class); unsized icons size-5.",
    },
  ];
}
