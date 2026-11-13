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
import { DisabledLinkDemoContainer } from './demos/disabled-link-demo-container';
import { ExternalLinkDemoContainer } from './demos/external-link-demo-container';
import { InTextLinkDemoContainer } from './demos/in-text-link-demo-container';
import { LinkUsageDemoContainer } from './demos/link-usage-demo-container';
import { RouterLinkDemoContainer } from './demos/router-link-demo-container';
import { RtlLinkDemoContainer } from './demos/rtl-link-demo-container';
import { SizeLinkDemoContainer } from './demos/size-link-demo-container';
import { VariantsLinkDemoContainer } from './demos/variants-link-demo-container';
import { WithIconLinkDemoContainer } from './demos/with-icon-link-demo-container';

@Component({
  selector: 'app-link-page',
  imports: [
    Anatomy,
    LinkUsageDemoContainer,
    InTextLinkDemoContainer,
    VariantsLinkDemoContainer,
    SizeLinkDemoContainer,
    WithIconLinkDemoContainer,
    RouterLinkDemoContainer,
    ExternalLinkDemoContainer,
    DisabledLinkDemoContainer,
    RtlLinkDemoContainer,
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
        <h1 scHeading>Link</h1>
        <p class="text-muted-foreground">
          A link: it goes somewhere, so it stays a link — opened in a new tab,
          copied, announced as a link. A link in text by default — underlined,
          the text&apos;s colour and size — or a button&apos;s look (variant).
        </p>
        <app-component-badges path="link" />
      </div>

      <section class="space-y-4">
        <h2 scHeading appToc>Usage</h2>
        <app-link-usage-demo-container />
      </section>

      <section class="space-y-4">
        <h2 scHeading appToc>Anatomy</h2>
        <p class="text-muted-foreground">
          One part, on a native link: its
          <code class="bg-muted rounded px-1.5 py-0.5 text-sm">href</code> (or
          <code class="bg-muted rounded px-1.5 py-0.5 text-sm">routerLink</code
          >) is yours, and it needs one: the link never writes or invents one,
          and an
          <code class="bg-muted rounded px-1.5 py-0.5 text-sm">&lt;a&gt;</code>
          without an address is not a link (not focusable, not announced as
          one). For an action, use a button. An icon may go at either side,
          marked with its side.
        </p>
        <app-anatomy [imports]="anatomy.imports" [markup]="anatomy.markup" />
      </section>

      <section class="space-y-8">
        <h2 scHeading appToc>Examples</h2>
        <app-in-text-link-demo-container />
        <app-variants-link-demo-container />
        <app-size-link-demo-container />
        <app-with-icon-link-demo-container />
        <app-router-link-demo-container />
        <app-external-link-demo-container />
        <app-disabled-link-demo-container />
        <app-rtl-link-demo-container />
      </section>

      <section class="space-y-4">
        <h2 scHeading appToc>API reference</h2>
        <p class="text-muted-foreground">
          <code class="bg-muted rounded px-1.5 py-0.5 text-sm">ScLink</code>
          is a directive on a native
          <code class="bg-muted rounded px-1.5 py-0.5 text-sm">a[scLink]</code>:
          in text (the default), its classes are the preset&apos;s
          <code class="bg-muted rounded px-1.5 py-0.5 text-sm">link</code>
          (its corners and focus ring); in a button&apos;s look, the
          preset&apos;s button, as
          <code class="bg-muted rounded px-1.5 py-0.5 text-sm">scButton</code
          >&apos;s. Its address is the link&apos;s own:
          <code class="bg-muted rounded px-1.5 py-0.5 text-sm">href</code>, or
          <code class="bg-muted rounded px-1.5 py-0.5 text-sm">routerLink</code
          >.
        </p>
        <div
          scTableContainer
          tabindex="0"
          role="region"
          aria-label="ScLink inputs"
        >
          <table scTable>
            <thead scTableHeader>
              <tr scTableRow>
                <th scTableHeaderCell>Input</th>
                <th scTableHeaderCell>Type</th>
                <th scTableHeaderCell>Default</th>
                <th scTableHeaderCell>Description</th>
              </tr>
            </thead>
            <tbody scTableBody>
              @for (input of inputs; track input.name) {
                <tr scTableRow>
                  <td scTableCell>
                    <code class="font-mono text-sm">{{ input.name }}</code>
                  </td>
                  <td scTableCell class="whitespace-normal">
                    <code class="font-mono text-sm">{{ input.type }}</code>
                  </td>
                  <td scTableCell>
                    <code class="font-mono text-sm">{{ input.default }}</code>
                  </td>
                  <td
                    scTableCell
                    class="text-muted-foreground whitespace-normal"
                  >
                    {{ input.description }}
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
export default class LinkPage {
  protected readonly anatomy = {
    imports: "import { ScLink } from '@semantic-components/ui';",
    markup: [
      '<a scLink variant="button" href="…">',
      '  <svg data-icon="inline-start"></svg>',
      '  Label',
      '  <svg data-icon="inline-end"></svg>',
      '</a>',
    ].join('\n'),
  };

  protected readonly inputs = [
    {
      name: 'variant',
      type: "'default' | 'link' | 'button' | 'outline' | 'secondary' | 'ghost' | 'destructive'",
      default: "'default'",
      description:
        "Its look: a link in text (default), or a button's, inherited from the Button — link the Button's link variant (its box, for a link among buttons), button the primary one, or outline, secondary, ghost, destructive.",
    },
    {
      name: 'size',
      type: "'xs' | 'sm' | 'default' | 'lg' | 'icon-xs' | 'icon-sm' | 'icon' | 'icon-lg'",
      default: "'default'",
      description:
        "A button look's size: the button's sizes. A link in text takes the size of its text.",
    },
    {
      name: 'disabled',
      type: 'boolean',
      default: 'false',
      description:
        'Not followed by any means (click, Enter, middle-click, routerLink); out of the tab order; announced as a dimmed link (aria-disabled).',
    },
    {
      name: 'class',
      type: 'string',
      default: "''",
      description: 'Classes merged over the preset (cn: a later class wins).',
    },
  ];
}
