import { Component, ViewEncapsulation } from '@angular/core';
import { ScTypeset } from '@semantic-components/ui';
import { Anatomy } from '../../../components/anatomy/anatomy';
import { ComponentBadges } from '../../../components/component-badges/component-badges';
import { PartsTable } from '../../../components/parts-table/parts-table';
import { TocHeading } from '../../../components/toc/toc-heading';
import { CardUsageDemoContainer } from './demos/card-usage-demo-container';
import { EdgeToEdgeCardDemoContainer } from './demos/edge-to-edge-card-demo-container';
import { ImageCardDemoContainer } from './demos/image-card-demo-container';
import { RtlCardDemoContainer } from './demos/rtl-card-demo-container';
import { SizeCardDemoContainer } from './demos/size-card-demo-container';
import { SpacingCardDemoContainer } from './demos/spacing-card-demo-container';

@Component({
  selector: 'app-card-page',
  imports: [
    PartsTable,
    Anatomy,
    CardUsageDemoContainer,
    SizeCardDemoContainer,
    SpacingCardDemoContainer,
    EdgeToEdgeCardDemoContainer,
    ImageCardDemoContainer,
    RtlCardDemoContainer,
    TocHeading,
    ComponentBadges,
    ScTypeset,
  ],
  template: `
    <div class="space-y-12">
      <div class="space-y-2">
        <h1 scTypeset>Card</h1>
        <p class="text-muted-foreground">
          A box of related content: a header with its title, description and
          action, the content, a footer. In the look of the app&apos;s style.
        </p>
        <app-component-badges path="card" />
      </div>

      <section class="space-y-4">
        <h2 scTypeset appToc>Usage</h2>
        <app-card-usage-demo-container />
      </section>

      <section class="space-y-4">
        <h2 scTypeset appToc>Anatomy</h2>
        <p>
          Every part is a directive on your element. The title is the heading
          you choose (an
          <code class="bg-muted rounded px-1.5 py-0.5 text-sm">h3</code>, an
          <code class="bg-muted rounded px-1.5 py-0.5 text-sm">h4</code>…), at
          the level that fits your page.
        </p>
        <app-anatomy [imports]="anatomy.imports" [markup]="anatomy.markup" />
      </section>

      <section class="space-y-4">
        <h2 scTypeset appToc>Notes</h2>
        <ul class="list-disc space-y-2 ps-6">
          <li>
            The spacing between the sections and the inset of every part is one
            variable,
            <code class="bg-muted rounded px-1.5 py-0.5 text-sm"
              >--card-spacing</code
            >, set by the style and by
            <code class="bg-muted rounded px-1.5 py-0.5 text-sm">size="sm"</code
            >; change it with a class on the card.
          </li>
          <li>
            An image as the first child sits at the top with no padding above
            it, in the card&apos;s corners.
          </li>
          <li>
            The action goes to the end of the header, beside the title and the
            description.
          </li>
          <li>
            A footer&apos;s look is the style&apos;s: a muted band with a line
            above in nova, a line in lyra, none in the others (add
            <code class="bg-muted rounded px-1.5 py-0.5 text-sm">border-t</code>
            for one).
          </li>
        </ul>
      </section>

      <section class="space-y-8">
        <h2 scTypeset appToc>Examples</h2>
        <app-size-card-demo-container />
        <app-spacing-card-demo-container />
        <app-edge-to-edge-card-demo-container />
        <app-image-card-demo-container />
        <app-rtl-card-demo-container />
      </section>

      <section class="space-y-4">
        <h2 scTypeset appToc>API reference</h2>
        <p>
          Each part takes
          <code class="bg-muted rounded px-1.5 py-0.5 text-sm">class</code>,
          merged over the style (cn: a later class wins).
        </p>
        <app-parts-table label="Card parts" [parts]="parts" />
      </section>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
})
export default class CardPage {
  private readonly anatomy = {
    imports: [
      'import {',
      '  ScCard, ScCardHeader, ScCardTitle, ScCardDescription,',
      '  ScCardAction, ScCardBody, ScCardFooter,',
      "} from '@semantic-components/ui';",
    ].join('\n'),
    markup: [
      '<div scCard>',
      '  <div scCardHeader>',
      '    <h3 scCardTitle>…</h3>',
      '    <p scCardDescription>…</p>',
      '    <div scCardAction>…</div>',
      '  </div>',
      '  <div scCardBody>…</div>',
      '  <div scCardFooter>…</div>',
      '</div>',
    ].join('\n'),
  };

  private readonly parts = [
    {
      name: 'ScCard',
      selector: 'div[scCard]',
      description:
        "The card. Input size: 'default' or 'sm' (less spacing, a smaller title).",
    },
    {
      name: 'ScCardHeader',
      selector: 'div[scCardHeader]',
      description:
        'The title and description, the action beside them; with border-b, a line and spacing below.',
    },
    {
      name: 'ScCardTitle',
      selector: '[scCardTitle]',
      description: 'The title, on a heading of yours.',
    },
    {
      name: 'ScCardDescription',
      selector: '[scCardDescription]',
      description: 'Muted text under the title.',
    },
    {
      name: 'ScCardAction',
      selector: 'div[scCardAction]',
      description: 'A button or badge at the end of the header.',
    },
    {
      name: 'ScCardBody',
      selector: 'div[scCardBody]',
      description: 'The content, inset by --card-spacing.',
    },
    {
      name: 'ScCardFooter',
      selector: 'div[scCardFooter]',
      description:
        'Actions at the bottom: a row; its look from the style (with border-t, a line and spacing above).',
    },
  ];
}
