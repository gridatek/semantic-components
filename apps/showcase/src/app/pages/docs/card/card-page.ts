import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScHeading,
  ScTable,
  ScTableBody,
  ScTableCell,
  ScTableContainer,
  ScTableHeader,
  ScTableHeaderCell,
  ScTableRow,
} from '@semantic-components/ui';
import { Anatomy } from '../../../components/anatomy/anatomy';
import { ComponentBadges } from '../../../components/component-badges/component-badges';
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
    Anatomy,
    CardUsageDemoContainer,
    SizeCardDemoContainer,
    SpacingCardDemoContainer,
    EdgeToEdgeCardDemoContainer,
    ImageCardDemoContainer,
    RtlCardDemoContainer,
    TocHeading,
    ComponentBadges,
    ScHeading,
    ScTable,
    ScTableBody,
    ScTableCell,
    ScTableContainer,
    ScTableHeader,
    ScTableHeaderCell,
    ScTableRow,
  ],
  template: `
    <div class="space-y-8">
      <div class="space-y-2">
        <h1 scHeading>Card</h1>
        <p class="text-muted-foreground">
          A box of related content: a header with its title, description and
          action, the content, a footer. In the look of the app&apos;s preset.
        </p>
        <app-component-badges path="card" />
      </div>

      <section class="space-y-4">
        <h2 scHeading appToc>Usage</h2>
        <app-card-usage-demo-container />
      </section>

      <section class="space-y-4">
        <h2 scHeading appToc>Anatomy</h2>
        <p class="text-muted-foreground">
          Every part is a directive on your element. The title is the heading
          you choose (an
          <code class="bg-muted rounded px-1.5 py-0.5 text-sm">h3</code>, an
          <code class="bg-muted rounded px-1.5 py-0.5 text-sm">h4</code>…), at
          the level that fits your page.
        </p>
        <app-anatomy [imports]="anatomy.imports" [markup]="anatomy.markup" />
      </section>

      <section class="space-y-4">
        <h2 scHeading appToc>Notes</h2>
        <ul class="text-muted-foreground list-disc space-y-2 ps-6">
          <li>
            The spacing between the sections and the inset of every part is one
            variable,
            <code class="bg-muted rounded px-1.5 py-0.5 text-sm"
              >--card-spacing</code
            >, set by the preset and by
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
            A footer&apos;s look is the preset&apos;s: a muted band with a line
            above in nova, a line in lyra, none in the others (add
            <code class="bg-muted rounded px-1.5 py-0.5 text-sm">border-t</code>
            for one).
          </li>
        </ul>
      </section>

      <section class="space-y-8">
        <h2 scHeading appToc>Examples</h2>
        <app-size-card-demo-container />
        <app-spacing-card-demo-container />
        <app-edge-to-edge-card-demo-container />
        <app-image-card-demo-container />
        <app-rtl-card-demo-container />
      </section>

      <section class="space-y-4">
        <h2 scHeading appToc>API reference</h2>
        <p class="text-muted-foreground">
          Each part takes
          <code class="bg-muted rounded px-1.5 py-0.5 text-sm">class</code>,
          merged over the preset (cn: a later class wins).
        </p>
        <div
          scTableContainer
          tabindex="0"
          role="region"
          aria-label="Card parts"
        >
          <table scTable>
            <thead scTableHeader>
              <tr scTableRow>
                <th scTableHeaderCell>Part</th>
                <th scTableHeaderCell>Selector</th>
                <th scTableHeaderCell>Description</th>
              </tr>
            </thead>
            <tbody scTableBody>
              @for (part of parts; track part.name) {
                <tr scTableRow>
                  <td scTableCell>
                    <code class="font-mono text-sm">{{ part.name }}</code>
                  </td>
                  <td scTableCell>
                    <code class="font-mono text-sm">{{ part.selector }}</code>
                  </td>
                  <td
                    scTableCell
                    class="text-muted-foreground whitespace-normal"
                  >
                    {{ part.description }}
                  </td>
                </tr>
              }
            </tbody>
          </table>
        </div>
      </section>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
})
export default class CardPage {
  protected readonly anatomy = {
    imports: [
      'import {',
      '  ScCard, ScCardHeader, ScCardTitle, ScCardDescription,',
      '  ScCardAction, ScCardContent, ScCardFooter,',
      "} from '@semantic-components/ui';",
    ].join('\n'),
    markup: [
      '<div scCard>',
      '  <div scCardHeader>',
      '    <h3 scCardTitle>…</h3>',
      '    <p scCardDescription>…</p>',
      '    <div scCardAction>…</div>',
      '  </div>',
      '  <div scCardContent>…</div>',
      '  <div scCardFooter>…</div>',
      '</div>',
    ].join('\n'),
  };

  protected readonly parts = [
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
      name: 'ScCardContent',
      selector: 'div[scCardContent]',
      description: 'The content, inset by --card-spacing.',
    },
    {
      name: 'ScCardFooter',
      selector: 'div[scCardFooter]',
      description:
        'Actions at the bottom: a row; its look from the preset (with border-t, a line and spacing above).',
    },
  ];
}
