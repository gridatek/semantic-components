import { Component, ViewEncapsulation } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ScLink, ScTypeset } from '@semantic-components/ui';
import { Anatomy } from '../../../components/anatomy/anatomy';
import {
  type ApiInput,
  ApiTable,
} from '../../../components/api-table/api-table';
import { ComponentBadges } from '../../../components/component-badges/component-badges';
import { TocHeading } from '../../../components/toc/toc-heading';
import { BackdropUsageDemoContainer } from './demos/backdrop-usage-demo-container';
import { CustomBackdropDemoContainer } from './demos/custom-backdrop-demo-container';

@Component({
  selector: 'app-backdrop-page',
  imports: [
    ApiTable,
    Anatomy,
    BackdropUsageDemoContainer,
    CustomBackdropDemoContainer,
    RouterLink,
    TocHeading,
    ComponentBadges,
    ScTypeset,
    ScLink,
  ],
  template: `
    <div class="space-y-12">
      <div class="space-y-2">
        <h1 scTypeset>Backdrop</h1>
        <p class="text-muted-foreground">
          The dimmed, blurred layer behind an overlay, in the look of the
          app&apos;s style. The
          <a scLink routerLink="/docs/components/dialog">Dialog</a>,
          <a scLink routerLink="/docs/components/alert-dialog">Alert Dialog</a>,
          <a scLink routerLink="/docs/components/sheet">Sheet</a>
          and
          <a scLink routerLink="/docs/components/drawer">Drawer</a>
          render it in theirs; use it on its own for an overlay of yours.
        </p>
        <app-component-badges path="backdrop" />
      </div>

      <section class="space-y-4">
        <h2 scTypeset appToc>Usage</h2>
        <app-backdrop-usage-demo-container />
      </section>

      <section class="space-y-4">
        <h2 scTypeset appToc>Anatomy</h2>
        <p>
          One directive, on an empty
          <code class="bg-muted rounded px-1.5 py-0.5 text-sm">div</code>, shown
          with
          <code class="bg-muted rounded px-1.5 py-0.5 text-sm">&#64;if</code>
          or inside an overlay.
        </p>
        <app-anatomy [imports]="anatomy.imports" [markup]="anatomy.markup" />
      </section>

      <section class="space-y-4">
        <h2 scTypeset appToc>Notes</h2>
        <ul class="list-disc space-y-2 ps-6">
          <li>
            It fades in when shown and out when it goes (<code
              class="bg-muted rounded px-1.5 py-0.5 text-sm"
              >animate.enter</code
            >
            /
            <code class="bg-muted rounded px-1.5 py-0.5 text-sm"
              >animate.leave</code
            >): Angular removes it once it has faded out.
          </li>
          <li>
            It covers the window (<code
              class="bg-muted rounded px-1.5 py-0.5 text-sm"
              >fixed inset-0</code
            >) behind the overlay&apos;s content;
            <code class="bg-muted rounded px-1.5 py-0.5 text-sm">absolute</code>
            puts it over a positioned box instead.
          </li>
          <li>
            It takes no clicks and no focus, and is not read by screen readers:
            closing on a click outside, trapping focus and hiding the page are
            the overlay&apos;s.
          </li>
          <li>
            Its shade and blur are the style&apos;s — shadcn&apos;s overlay, the
            same behind every overlay of a style:
            <code class="bg-muted rounded px-1.5 py-0.5 text-sm"
              >bg-black/10</code
            >
            with a light blur in nova, vega and lyra,
            <code class="bg-muted rounded px-1.5 py-0.5 text-sm">/80</code> in
            maia and mira,
            <code class="bg-muted rounded px-1.5 py-0.5 text-sm">/30</code>
            with more blur in luma and rhea,
            <code class="bg-muted rounded px-1.5 py-0.5 text-sm">/20</code> in
            sera.
          </li>
        </ul>
      </section>

      <section class="space-y-8">
        <h2 scTypeset appToc>Examples</h2>
        <app-custom-backdrop-demo-container />
      </section>

      <section class="space-y-4">
        <h2 scTypeset appToc>API reference</h2>
        <h3 class="font-heading text-base font-medium">
          ScBackdrop —
          <code class="bg-muted rounded px-1.5 py-0.5 text-sm"
            >div[scBackdrop]</code
          >
        </h3>
        <app-api-table label="ScBackdrop inputs" [inputs]="inputs" />
      </section>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
})
export default class BackdropPage {
  private readonly inputs: readonly ApiInput[] = [
    {
      name: 'class',
      type: 'string',
      default: "''",
      description:
        'Classes merged over the style (cn: a later class wins) — your own shade, its place.',
    },
  ];

  private readonly anatomy = {
    imports: "import { ScBackdrop } from '@semantic-components/ui';",
    markup: ['@if (open()) {', '  <div scBackdrop></div>', '}'].join('\n'),
  };
}
