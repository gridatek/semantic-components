import { Component, ViewEncapsulation } from '@angular/core';
import { ScKbd, ScTypeset } from '@semantic-components/ui';
import { Anatomy } from '../../../components/anatomy/anatomy';
import { ComponentBadges } from '../../../components/component-badges/component-badges';
import { PartsTable } from '../../../components/parts-table/parts-table';
import { TocHeading } from '../../../components/toc/toc-heading';
import { DeselectableRatingDemoContainer } from './demos/deselectable-rating-demo-container';
import { DisabledRatingDemoContainer } from './demos/disabled-rating-demo-container';
import { FormRatingDemoContainer } from './demos/form-rating-demo-container';
import { HalfRatingDemoContainer } from './demos/half-rating-demo-container';
import { IconsRatingDemoContainer } from './demos/icons-rating-demo-container';
import { RatingUsageDemoContainer } from './demos/rating-usage-demo-container';
import { ReadonlyRatingDemoContainer } from './demos/readonly-rating-demo-container';
import { RtlRatingDemoContainer } from './demos/rtl-rating-demo-container';
import { SizeRatingDemoContainer } from './demos/size-rating-demo-container';

@Component({
  selector: 'app-rating-page',
  imports: [
    ScKbd,
    PartsTable,
    Anatomy,
    RatingUsageDemoContainer,
    HalfRatingDemoContainer,
    FormRatingDemoContainer,
    ReadonlyRatingDemoContainer,
    DisabledRatingDemoContainer,
    DeselectableRatingDemoContainer,
    IconsRatingDemoContainer,
    SizeRatingDemoContainer,
    RtlRatingDemoContainer,
    TocHeading,
    ComponentBadges,
    ScTypeset,
  ],
  template: `
    <div class="space-y-12">
      <div class="space-y-2">
        <h1 scTypeset>Rating</h1>
        <p class="text-muted-foreground">
          A score in stars, or any icon: one control, whole or half stars, read
          out by your words. Not rated is null — a Signal Forms field.
        </p>
        <app-component-badges path="rating" />
      </div>

      <section class="space-y-4">
        <h2 scTypeset appToc>Usage</h2>
        <app-rating-usage-demo-container />
      </section>

      <section class="space-y-4">
        <h2 scTypeset appToc>Anatomy</h2>
        <p>
          The rating holds the score, takes the focus and draws the stars: your
          icon, written once — for each star twice, empty and full, the full one
          drawn up to the star&apos;s fill.
        </p>
        <app-anatomy [imports]="anatomy.imports" [markup]="anatomy.markup" />
      </section>

      <section class="space-y-4">
        <h2 scTypeset appToc>Accessibility</h2>
        <ul class="list-disc space-y-2 ps-6">
          <li>
            WAI-ARIA&apos;s rating slider: one tab stop, a native range input
            out of sight (its focus ring on the stars). In a field it takes the
            field&apos;s id: the label ties to it by <code scTypeset>for</code>.
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
        <app-half-rating-demo-container />
        <app-form-rating-demo-container />
        <app-readonly-rating-demo-container />
        <app-disabled-rating-demo-container />
        <app-deselectable-rating-demo-container />
        <app-icons-rating-demo-container />
        <app-size-rating-demo-container />
        <app-rtl-rating-demo-container />
      </section>

      <section class="space-y-4">
        <h2 scTypeset appToc>API reference</h2>
        <p>
          Each part takes
          <code scTypeset>class</code>, merged over the style (cn: a later class
          wins).
        </p>
        <app-parts-table label="Rating parts" [parts]="parts" />
      </section>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
})
export default class RatingPage {
  private readonly anatomy = {
    imports:
      "import { ScRating, ScRatingIcon } from '@semantic-components/ui';",
    markup: [
      '<div scRating [formField]="…" valueText="{value} out of {max} stars">',
      '  <ng-template scRatingIcon>',
      '    <svg siStarIcon></svg>',
      '  </ng-template>',
      '</div>',
    ].join('\n'),
  };

  private readonly parts = [
    {
      name: 'ScRating',
      selector: 'div[scRating]',
      description:
        'A slider (an image, read-only): value, a number or null while not rated (two-way, or a [formField]); count (5); step (1, or 0.5 for halves); deselectable; readonly; disabled; valueText ({value}, {max}, in LOCALE_ID). exportAs scRating: shown(), text().',
    },
    {
      name: 'ScRatingIcon',
      selector: 'ng-template[scRatingIcon]',
      description:
        "Your icon, once, in an ng-template: drawn for each star twice — empty (muted), and full over it up to the star's fill (--sc-rating-fill, 0 to 1), in the rating's colour (text-primary; yours by class). Context: the star (1 for the first) and full, for a different icon per layer. Unsized icons size-5.",
    },
  ];
}
