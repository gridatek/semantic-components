import { Component, ViewEncapsulation } from '@angular/core';
import { ScKbd, ScTypeset } from '@semantic-components/ui';
import { Anatomy } from '../../../components/anatomy/anatomy';
import { ComponentBadges } from '../../../components/component-badges/component-badges';
import { PartsTable } from '../../../components/parts-table/parts-table';
import { TocHeading } from '../../../components/toc/toc-heading';
import { InTextPreviewCardDemoContainer } from './demos/in-text-preview-card-demo-container';
import { LogicalSidesPreviewCardDemoContainer } from './demos/logical-sides-preview-card-demo-container';
import { PreviewCardUsageDemoContainer } from './demos/preview-card-usage-demo-container';
import { RtlPreviewCardDemoContainer } from './demos/rtl-preview-card-demo-container';
import { SidesPreviewCardDemoContainer } from './demos/sides-preview-card-demo-container';

@Component({
  selector: 'app-preview-card-page',
  imports: [
    ScKbd,
    PartsTable,
    Anatomy,
    PreviewCardUsageDemoContainer,
    InTextPreviewCardDemoContainer,
    SidesPreviewCardDemoContainer,
    LogicalSidesPreviewCardDemoContainer,
    RtlPreviewCardDemoContainer,
    TocHeading,
    ComponentBadges,
    ScTypeset,
  ],
  template: `
    <div class="space-y-12">
      <div class="space-y-2">
        <h1 scTypeset>Preview Card</h1>
        <p class="text-muted-foreground">
          A preview of a link&apos;s destination, shown on hover or keyboard
          focus. In the look of the app&apos;s style.
        </p>
        <app-component-badges path="preview-card" />
      </div>

      <section class="space-y-4">
        <h2 scTypeset appToc>Usage</h2>
        <app-preview-card-usage-demo-container />
      </section>

      <section class="space-y-4">
        <h2 scTypeset appToc>Anatomy</h2>
        <p>
          Every part is a directive on your element; the link and the
          card&apos;s content are yours.
        </p>
        <app-anatomy [imports]="anatomy.imports" [markup]="anatomy.markup" />
      </section>

      <section class="space-y-4">
        <h2 scTypeset appToc>Accessibility</h2>
        <ul class="list-disc space-y-2 ps-6">
          <li>
            A visual preview, for sighted mouse and keyboard users: the link is
            the only thing to reach. The card has no role, isn&apos;t linked to
            its trigger, and takes no focus — so a screen reader isn&apos;t led
            through it at every link.
          </li>
          <li>
            Keep it supplementary: what it shows must be at the link&apos;s
            destination too.
          </li>
          <li>
            Hover opens it after the trigger&apos;s delay; keyboard focus at
            once. Leaving, blur, <kbd scKbd>Escape</kbd> or a press outside
            close it. A touch only follows the link.
          </li>
        </ul>
      </section>

      <section class="space-y-8">
        <h2 scTypeset appToc>Examples</h2>
        <app-in-text-preview-card-demo-container />
        <app-sides-preview-card-demo-container />
        <app-logical-sides-preview-card-demo-container />
        <app-rtl-preview-card-demo-container />
      </section>

      <section class="space-y-4">
        <h2 scTypeset appToc>API reference</h2>
        <p>
          Each part takes
          <code class="bg-muted rounded px-1.5 py-0.5 text-sm">class</code>,
          merged over the style (cn: a later class wins).
        </p>
        <app-parts-table label="Preview Card parts" [parts]="parts" />
      </section>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
})
export default class PreviewCardPage {
  private readonly anatomy = {
    imports: [
      'import {',
      '  ScPreviewCardProvider, ScPreviewCardTrigger,',
      '  ScPreviewCardPortal, ScPreviewCard,',
      "} from '@semantic-components/ui';",
    ].join('\n'),
    markup: [
      '<div scPreviewCardProvider side="…">',
      '  <a href="…" scPreviewCardTrigger>…</a>',
      '  <ng-template scPreviewCardPortal>',
      '    <div scPreviewCard>…</div>',
      '  </ng-template>',
      '</div>',
    ].join('\n'),
  };

  private readonly parts = [
    {
      name: 'ScPreviewCardProvider',
      selector: 'div[scPreviewCardProvider], span[scPreviewCardProvider]',
      description:
        "[(open)], side ('bottom', 'top', 'left', 'right', 'inline-start', 'inline-end'), align, offset, origin.",
    },
    {
      name: 'ScPreviewCardTrigger',
      selector: 'a[scPreviewCardTrigger], button[scPreviewCardTrigger]',
      description:
        'Your link (or button): delay (600) and closeDelay (300); data-popup-open while open.',
    },
    {
      name: 'ScPreviewCardPortal, ScPreviewCard',
      selector: 'ng-template[…], div[scPreviewCard]',
      description:
        "The content, rendered while open; the card in the style's look, data-side as placed, animating in and out.",
    },
  ];
}
