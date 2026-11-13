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
import { AlignmentBubbleDemoContainer } from './demos/alignment-bubble-demo-container';
import { BubbleUsageDemoContainer } from './demos/bubble-usage-demo-container';
import { GroupBubbleDemoContainer } from './demos/group-bubble-demo-container';
import { LinksButtonsBubbleDemoContainer } from './demos/links-buttons-bubble-demo-container';
import { PopoverBubbleDemoContainer } from './demos/popover-bubble-demo-container';
import { ReactionsBubbleDemoContainer } from './demos/reactions-bubble-demo-container';
import { RtlBubbleDemoContainer } from './demos/rtl-bubble-demo-container';
import { ShowMoreBubbleDemoContainer } from './demos/show-more-bubble-demo-container';
import { TooltipBubbleDemoContainer } from './demos/tooltip-bubble-demo-container';
import { VariantsBubbleDemoContainer } from './demos/variants-bubble-demo-container';

@Component({
  selector: 'app-bubble-page',
  imports: [
    Anatomy,
    BubbleUsageDemoContainer,
    VariantsBubbleDemoContainer,
    AlignmentBubbleDemoContainer,
    GroupBubbleDemoContainer,
    LinksButtonsBubbleDemoContainer,
    ReactionsBubbleDemoContainer,
    ShowMoreBubbleDemoContainer,
    TooltipBubbleDemoContainer,
    PopoverBubbleDemoContainer,
    RtlBubbleDemoContainer,
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
        <h1 scHeading>Bubble</h1>
        <p class="text-muted-foreground">
          A message&apos;s surface in a conversation: at the start or the end,
          in a variant, with reactions. In the look of the app&apos;s preset.
        </p>
        <app-component-badges path="bubble" />
      </div>

      <section class="space-y-4">
        <h2 scHeading appToc>Usage</h2>
        <app-bubble-usage-demo-container />
      </section>

      <section class="space-y-4">
        <h2 scHeading appToc>Anatomy</h2>
        <p class="text-muted-foreground">
          Every part is a directive on your element; the text, the reactions and
          their names are yours. A message&apos;s avatar, name and time belong
          to Message, around it.
        </p>
        <app-anatomy [imports]="anatomy.imports" [markup]="anatomy.markup" />
      </section>

      <section class="space-y-4">
        <h2 scHeading appToc>Accessibility</h2>
        <ul class="text-muted-foreground list-disc space-y-2 ps-6">
          <li>
            A row of emoji is one image: give it role=&quot;img&quot; and an
            aria-label (&quot;Reactions: thumbs up, fire, and 8 more&quot;) —
            otherwise each glyph is read alone, and &quot;+8&quot; as &quot;plus
            eight&quot;.
          </li>
          <li>
            Reactions that are buttons: name each, an icon-only one in sr-only
            text.
          </li>
          <li>
            A clickable bubble is a real button or link (scBubbleContent on it):
            focusable, with a focus ring, named by its text.
          </li>
          <li>
            Don&apos;t let the colour carry the meaning: a destructive bubble
            says what failed in its text.
          </li>
        </ul>
      </section>

      <section class="space-y-8">
        <h2 scHeading appToc>Examples</h2>
        <app-variants-bubble-demo-container />
        <app-alignment-bubble-demo-container />
        <app-group-bubble-demo-container />
        <app-links-buttons-bubble-demo-container />
        <app-reactions-bubble-demo-container />
        <app-show-more-bubble-demo-container />
        <app-tooltip-bubble-demo-container />
        <app-popover-bubble-demo-container />
        <app-rtl-bubble-demo-container />
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
          aria-label="Bubble parts"
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
export default class BubblePage {
  protected readonly anatomy = {
    imports: [
      'import {',
      '  ScBubbleGroup, ScBubble, ScBubbleContent, ScBubbleReactions,',
      "} from '@semantic-components/ui';",
    ].join('\n'),
    markup: [
      '<div scBubbleGroup>',
      '  <div scBubble variant="…" alignment="…">',
      '    <div scBubbleContent>…</div>',
      '    <div scBubbleReactions role="img" aria-label="…">…</div>',
      '  </div>',
      '</div>',
    ].join('\n'),
  };

  protected readonly parts = [
    {
      name: 'ScBubbleGroup',
      selector: 'div[scBubbleGroup]',
      description: 'Consecutive bubbles from the same sender, closer together.',
    },
    {
      name: 'ScBubble',
      selector: 'div[scBubble]',
      description:
        "variant ('default', 'secondary', 'muted', 'tinted', 'outline', 'ghost', 'destructive'), align ('start', 'end'). Up to 80% wide; ghost: full width.",
    },
    {
      name: 'ScBubbleContent',
      selector:
        'div[scBubbleContent], button[scBubbleContent], a[scBubbleContent]',
      description:
        'The text, in the variant’s colours. On a button (type="button") or a link, the whole bubble is clickable.',
    },
    {
      name: 'ScBubbleReactions',
      selector: 'div[scBubbleReactions]',
      description:
        "Reactions or buttons over the edge: side ('bottom', 'top'), align ('end', 'start'). Leave room for them.",
    },
  ];
}
