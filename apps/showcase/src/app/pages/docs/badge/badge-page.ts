import { Component, ViewEncapsulation } from '@angular/core';
import { ScTypeset } from '@semantic-components/ui';
import { Anatomy } from '../../../components/anatomy/anatomy';
import { ApiTable } from '../../../components/api-table/api-table';
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
    ApiTable,
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
    ScTypeset,
  ],
  template: `
    <div class="space-y-12">
      <div class="space-y-2">
        <h1 scTypeset>Badge</h1>
        <p class="text-muted-foreground">
          A short label — a status, a count, a tag — in the look of the
          app&apos;s style.
        </p>
        <app-component-badges path="badge" />
      </div>

      <section class="space-y-4">
        <h2 scTypeset appToc>Usage</h2>
        <app-badge-usage-demo-container />
      </section>

      <section class="space-y-4">
        <h2 scTypeset appToc>Anatomy</h2>
        <p>
          One directive, on a
          <code scTypeset>span</code> or a <code scTypeset>div</code>; on an
          <code scTypeset>a</code>
          it is a link, with a hover. An icon takes
          <code scTypeset>data-icon="inline-start"</code>
          or
          <code scTypeset>"inline-end"</code>: less padding on that side.
        </p>
        <app-anatomy [imports]="anatomy.imports" [markup]="anatomy.markup" />
      </section>

      <section class="space-y-8">
        <h2 scTypeset appToc>Examples</h2>
        <app-variants-badge-demo-container />
        <app-icon-badge-demo-container />
        <app-spinner-badge-demo-container />
        <app-link-badge-demo-container />
        <app-colors-badge-demo-container />
        <app-rtl-badge-demo-container />
      </section>

      <section class="space-y-4">
        <h2 scTypeset appToc>API reference</h2>
        <h3 class="font-heading text-base font-medium">
          ScBadge —
          <code scTypeset>div[scBadge], span[scBadge], a[scBadge]</code>
        </h3>
        <app-api-table label="ScBadge inputs" [inputs]="inputs" />
      </section>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
})
export default class BadgePage {
  private readonly anatomy = {
    imports: "import { ScBadge } from '@semantic-components/ui';",
    markup: [
      '<span scBadge variant="secondary">',
      '  <svg data-icon="inline-start"></svg>',
      '  Label',
      '</span>',
    ].join('\n'),
  };

  private readonly inputs = [
    {
      name: 'variant',
      type: "'default' | 'secondary' | 'destructive' | 'outline' | 'ghost' | 'link'",
      default: "'default'",
      description: 'Its look, from the style.',
    },
    {
      name: 'class',
      type: 'string',
      default: "''",
      description:
        'Classes merged over the style (cn: a later class wins) — your own colors.',
    },
  ];
}
