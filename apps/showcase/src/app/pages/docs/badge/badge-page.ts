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
import { BadgeUsageDemoContainer } from './demos/badge-usage-demo-container';
import { ColorsBadgeDemoContainer } from './demos/colors-badge-demo-container';
import { IconBadgeDemoContainer } from './demos/icon-badge-demo-container';
import { LinkBadgeDemoContainer } from './demos/link-badge-demo-container';
import { RtlBadgeDemoContainer } from './demos/rtl-badge-demo-container';
import { SpinnerBadgeDemoContainer } from './demos/spinner-badge-demo-container';
import { VariantsBadgeDemoContainer } from './demos/variants-badge-demo-container';

@Component({
  selector: 'app-badge-page',
  imports: [
    Anatomy,
    BadgeUsageDemoContainer,
    VariantsBadgeDemoContainer,
    IconBadgeDemoContainer,
    SpinnerBadgeDemoContainer,
    LinkBadgeDemoContainer,
    ColorsBadgeDemoContainer,
    RtlBadgeDemoContainer,
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
        <h1 scHeading>Badge</h1>
        <p class="text-muted-foreground">
          A short label — a status, a count, a tag — in the look of the
          app&apos;s preset.
        </p>
        <app-component-badges path="badge" />
      </div>

      <section class="space-y-4">
        <h2 scHeading appToc>Usage</h2>
        <app-badge-usage-demo-container />
      </section>

      <section class="space-y-4">
        <h2 scHeading appToc>Anatomy</h2>
        <p class="text-muted-foreground">
          One directive, on a
          <code class="bg-muted rounded px-1.5 py-0.5 text-sm">span</code> or a
          <code class="bg-muted rounded px-1.5 py-0.5 text-sm">div</code>; on an
          <code class="bg-muted rounded px-1.5 py-0.5 text-sm">a</code>
          it is a link, with a hover. An icon takes
          <code class="bg-muted rounded px-1.5 py-0.5 text-sm"
            >data-icon="inline-start"</code
          >
          or
          <code class="bg-muted rounded px-1.5 py-0.5 text-sm"
            >"inline-end"</code
          >: less padding on that side.
        </p>
        <app-anatomy [imports]="anatomy.imports" [markup]="anatomy.markup" />
      </section>

      <section class="space-y-8">
        <h2 scHeading appToc>Examples</h2>
        <app-variants-badge-demo-container />
        <app-icon-badge-demo-container />
        <app-spinner-badge-demo-container />
        <app-link-badge-demo-container />
        <app-colors-badge-demo-container />
        <app-rtl-badge-demo-container />
      </section>

      <section class="space-y-4">
        <h2 scHeading appToc>API reference</h2>
        <h3 class="font-heading text-base font-medium">
          ScBadge —
          <code class="bg-muted rounded px-1.5 py-0.5 text-sm"
            >div[scBadge], span[scBadge], a[scBadge]</code
          >
        </h3>
        <div
          scTableContainer
          tabindex="0"
          role="region"
          aria-label="ScBadge inputs"
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
export default class BadgePage {
  protected readonly anatomy = {
    imports: "import { ScBadge } from '@semantic-components/ui';",
    markup: [
      '<span scBadge variant="secondary">',
      '  <svg data-icon="inline-start"></svg>',
      '  Label',
      '</span>',
    ].join('\n'),
  };

  protected readonly inputs = [
    {
      name: 'variant',
      type: "'default' | 'secondary' | 'destructive' | 'outline' | 'ghost' | 'link'",
      default: "'default'",
      description: 'Its look, from the preset.',
    },
    {
      name: 'class',
      type: 'string',
      default: "''",
      description:
        'Classes merged over the preset (cn: a later class wins) — your own colors.',
    },
  ];
}
