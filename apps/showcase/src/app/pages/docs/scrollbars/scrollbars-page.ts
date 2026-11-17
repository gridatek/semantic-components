import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScTable,
  ScTableBody,
  ScTableCell,
  ScTableContainer,
  ScTableHeader,
  ScTableHeaderCell,
  ScTableRow,
  ScTypeset,
} from '@semantic-components/ui';
import { ComponentBadges } from '../../../components/component-badges/component-badges';
import { TocHeading } from '../../../components/toc/toc-heading';
import { OptingOutScrollbarsDemoContainer } from './demos/opting-out-scrollbars-demo-container';
import { ScrollbarsUsageDemoContainer } from './demos/scrollbars-usage-demo-container';
import { TuningScrollbarsDemoContainer } from './demos/tuning-scrollbars-demo-container';

interface Row {
  readonly name: string;
  readonly value: string;
  readonly description: string;
}

@Component({
  selector: 'app-scrollbars-page',
  imports: [
    ScrollbarsUsageDemoContainer,
    TuningScrollbarsDemoContainer,
    OptingOutScrollbarsDemoContainer,
    TocHeading,
    ComponentBadges,
    ScTypeset,
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
        <h1 scTypeset>Scrollbars</h1>
        <p class="text-muted-foreground">
          The browser&apos;s own scrollbars in your preset&apos;s look — every
          scrollbar of the page: the page&apos;s, a list, a textarea, a code
          block, a widget you didn&apos;t write. One CSS file, no directive;
          tuned by variables, your classes win.
        </p>
        <app-component-badges path="scrollbars" />
      </div>

      <section class="space-y-4">
        <h2 scTypeset appToc>Usage</h2>
        <p class="text-muted-foreground">
          Import the rules and your preset&apos;s variables in your global
          stylesheet, after Tailwind:
          <code scTypeset
            >@import '@semantic-components/ui/styles/scrollbars.css';</code
          >
          and
          <code scTypeset
            >@import
            '@semantic-components/presets/nova/scrollbars-variables.css';</code
          >
          (your style&apos;s). Then any box that scrolls has the look — no
          class, no directive.
        </p>
        <app-scrollbars-usage-demo-container />
      </section>

      <section class="space-y-4">
        <h2 scTypeset appToc>The Scroll Area, or this file?</h2>
        <ul class="text-muted-foreground list-disc space-y-2 ps-6">
          <li>
            <strong class="text-foreground">This file</strong>: every scrollbar,
            with nothing to write. The browser draws them, so they have its
            limits: Firefox takes a thin bar in your colours only (no exact
            size, no corners), and where the system&apos;s scrollbars take room
            (Windows, Linux) the bar sits beside the content, not over it.
          </li>
          <li>
            <strong class="text-foreground">The Scroll Area</strong>
            (<code scTypeset>scScrollArea</code>): a box whose scrollbars are
            drawn — shadcn&apos;s look in every browser, over the content.
          </li>
        </ul>
      </section>

      <section class="space-y-8">
        <h2 scTypeset appToc>Examples</h2>
        <app-tuning-scrollbars-demo-container />
        <app-opting-out-scrollbars-demo-container />
      </section>

      <section class="space-y-4">
        <h2 scTypeset appToc>Accessibility</h2>
        <ul class="text-muted-foreground list-disc space-y-2 ps-6">
          <li>
            Only the look changes: the scrollbars are the browser&apos;s, and so
            is scrolling — the wheel, touch, the keyboard, a screen
            reader&apos;s.
          </li>
          <li>
            A box that scrolls is reached by the keyboard when it can take
            focus: give it <code scTypeset>tabindex="0"</code>, a role and a
            name, as these demos do.
          </li>
        </ul>
      </section>

      <section class="space-y-4">
        <h2 scTypeset appToc>API reference</h2>

        <h3 scTypeset>Variables</h3>
        <p class="text-muted-foreground">
          On <code scTypeset>:root</code> for the whole page, or on a box for
          its scrollbars and those inside it. The preset&apos;s file sets the
          thumb and its corners.
        </p>
        <div
          scTableContainer
          tabindex="0"
          role="region"
          aria-label="Scrollbars variables"
        >
          <table scTable>
            <thead scTableHeader>
              <tr scTableRow>
                <th scTableHeaderCell>Variable</th>
                <th scTableHeaderCell>Default</th>
                <th scTableHeaderCell>Description</th>
              </tr>
            </thead>
            <tbody scTableBody>
              @for (variable of variables; track variable.name) {
                <tr scTableRow>
                  <td scTableCell>
                    <code class="font-mono text-sm">{{ variable.name }}</code>
                  </td>
                  <td scTableCell>
                    <code class="font-mono text-sm">{{ variable.value }}</code>
                  </td>
                  <td
                    scTableCell
                    class="text-muted-foreground whitespace-normal"
                  >
                    {{ variable.description }}
                  </td>
                </tr>
              }
            </tbody>
          </table>
        </div>

        <h3 scTypeset>Classes</h3>
        <p class="text-muted-foreground">
          Tailwind&apos;s and shadcn&apos;s utilities, not ours: the file is in
          the base layer, so they win.
        </p>
        <div
          scTableContainer
          tabindex="0"
          role="region"
          aria-label="Scrollbars classes"
        >
          <table scTable>
            <thead scTableHeader>
              <tr scTableRow>
                <th scTableHeaderCell>Class</th>
                <th scTableHeaderCell>Description</th>
              </tr>
            </thead>
            <tbody scTableBody>
              @for (cls of classes; track cls.name) {
                <tr scTableRow>
                  <td scTableCell>
                    <code class="font-mono text-sm">{{ cls.name }}</code>
                  </td>
                  <td
                    scTableCell
                    class="text-muted-foreground whitespace-normal"
                  >
                    {{ cls.description }}
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
export default class ScrollbarsPage {
  private readonly variables: readonly Row[] = [
    {
      name: '--sc-scrollbar-size',
      value: '0.625rem',
      description: "The bar's thickness (not in Firefox: its thin bar).",
    },
    {
      name: '--sc-scrollbar-inset',
      value: '1px',
      description: 'Room around the thumb, inside the bar.',
    },
    {
      name: '--sc-scrollbar-thumb',
      value: 'var(--color-border)',
      description: "The thumb's colour.",
    },
    {
      name: '--sc-scrollbar-track',
      value: 'transparent',
      description: "The track's colour, and the corner's.",
    },
    {
      name: '--sc-scrollbar-radius',
      value: 'round (lyra, sera: 0)',
      description: "The thumb's corners (not in Firefox).",
    },
  ];

  private readonly classes: readonly Omit<Row, 'value'>[] = [
    {
      name: 'no-scrollbar, scrollbar-none',
      description:
        'No scrollbar: the box still scrolls (the wheel, touch, the keyboard).',
    },
    {
      name: 'scrollbar-gutter-stable',
      description:
        "The scrollbar's room kept, so the content doesn't shift when it comes and goes.",
    },
    {
      name: 'scrollbar-thin, scrollbar-thumb-*',
      description:
        "The browser's own scrollbar back: in Chromium, a box whose scrollbar-width or scrollbar-color isn't auto isn't drawn by this file (scrollbar-auto is auto: it changes nothing).",
    },
  ];
}
