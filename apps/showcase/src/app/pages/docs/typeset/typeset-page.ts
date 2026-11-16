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
import { Anatomy } from '../../../components/anatomy/anatomy';
import { ComponentBadges } from '../../../components/component-badges/component-badges';
import { TocHeading } from '../../../components/toc/toc-heading';
import { ComponentsTypesetDemoContainer } from './demos/components-typeset-demo-container';
import { HeadingsTypesetDemoContainer } from './demos/headings-typeset-demo-container';
import { PageTypesetDemoContainer } from './demos/page-typeset-demo-container';
import { RtlTypesetDemoContainer } from './demos/rtl-typeset-demo-container';
import { TableTypesetDemoContainer } from './demos/table-typeset-demo-container';
import { TextTypesetDemoContainer } from './demos/text-typeset-demo-container';
import { TuningTypesetDemoContainer } from './demos/tuning-typeset-demo-container';
import { TypesetUsageDemoContainer } from './demos/typeset-usage-demo-container';

interface Row {
  readonly name: string;
  readonly value: string;
  readonly description: string;
}

@Component({
  selector: 'app-typeset-page',
  imports: [
    Anatomy,
    TypesetUsageDemoContainer,
    HeadingsTypesetDemoContainer,
    PageTypesetDemoContainer,
    TextTypesetDemoContainer,
    TuningTypesetDemoContainer,
    ComponentsTypesetDemoContainer,
    TableTypesetDemoContainer,
    RtlTypesetDemoContainer,
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
        <h1 scTypeset>Typeset</h1>
        <p class="text-muted-foreground">
          Styles for content you don't write the markup of — rendered markdown,
          a chat answer — in a typeset container, and the same look for a
          heading, a paragraph or a quote on its own. shadcn's one CSS file,
          tuned by three variables; components inside keep their look, your
          classes win.
        </p>
        <app-component-badges path="typeset" />
      </div>

      <section class="space-y-4">
        <h2 scTypeset appToc>Usage</h2>
        <p class="text-muted-foreground">
          Import the rules and your preset's variables in your global
          stylesheet, after Tailwind:
          <code scTypeset
            >@import '@semantic-components/ui/styles/typeset.css';</code
          >
          and
          <code scTypeset
            >@import
            '@semantic-components/presets/nova/typeset-variables.css';</code
          >
          (your style's). Then put your content in a
          <code scTypeset>typeset</code> container.
        </p>
        <app-typeset-usage-demo-container />
      </section>

      <section class="space-y-4">
        <h2 scTypeset appToc>Anatomy</h2>
        <p class="text-muted-foreground">
          A class on the container, for content you don't write; one directive,
          on any element, for text that stands on its own.
        </p>
        <app-anatomy [imports]="anatomy.imports" [markup]="anatomy.markup" />
      </section>

      <section class="space-y-4">
        <h2 scTypeset appToc>Two ways</h2>
        <p class="text-muted-foreground">
          The same rules reach your text in two ways; pick by what the text is.
        </p>
        <ul class="text-muted-foreground list-disc space-y-2 ps-6">
          <li>
            <strong class="text-foreground">A container</strong>
            (<code scTypeset>class="typeset"</code>): its plain elements are set
            — headings, paragraphs, lists, quotes, code, tables — with no
            directive on any. Components inside keep their look;
            <code scTypeset>not-typeset</code> opts out the rest.
          </li>
          <li>
            <strong class="text-foreground">The directive</strong>
            (<code scTypeset>scTypeset</code>): on one element with no container
            around it, set by its tag. What depends on its children isn't — the
            items of a list, code inside a heading.
          </li>
        </ul>
        <p class="text-muted-foreground">
          <strong class="text-foreground">Our recommendation:</strong> a
          container for reading text — content you don't write the markup of
          (markdown, a CMS, a chat answer) and long-form pages (an article, a
          blog post, a docs page): one class, and every element in it follows,
          lists and all. The directive for a few pieces of text placed among UI
          — a dashboard's title, a settings section's heading, a paragraph in a
          card — where a container would also set the layout's own lists and
          links. In a container, the directive changes nothing.
        </p>
        <p class="text-muted-foreground">
          Either way, the variables tune it — on the container, on a preset
          class of yours (<code scTypeset>.typeset-chat</code>) or on
          <code scTypeset>:root</code> for the whole app.
        </p>
      </section>

      <section class="space-y-4">
        <h2 scTypeset appToc>Accessibility</h2>
        <ul class="text-muted-foreground list-disc space-y-2 ps-6">
          <li>
            Native elements only: headings keep the page's outline, lists and
            quotes are read as such. Keep heading levels in order.
          </li>
          <li>
            A wide table in <code scTypeset>typeset-scroll</code> scrolls in its
            own box: give the box <code scTypeset>tabindex="0"</code>,
            <code scTypeset>role="region"</code> and a name, so the keyboard can
            reach and scroll it.
          </li>
        </ul>
      </section>

      <section class="space-y-8">
        <h2 scTypeset appToc>Examples</h2>
        <app-page-typeset-demo-container />
        <app-headings-typeset-demo-container />
        <app-text-typeset-demo-container />
        <app-tuning-typeset-demo-container />
        <app-components-typeset-demo-container />
        <app-table-typeset-demo-container />
        <app-rtl-typeset-demo-container />
      </section>

      <section class="space-y-4">
        <h2 scTypeset appToc>API reference</h2>
        <h3 scTypeset>Directive</h3>
        <p class="text-muted-foreground">
          Each takes <code scTypeset>class</code>; your classes win over its
          rules.
        </p>
        <div
          scTableContainer
          tabindex="0"
          role="region"
          aria-label="Typeset directive"
        >
          <table scTable>
            <thead scTableHeader>
              <tr scTableRow>
                <th scTableHeaderCell>Directive</th>
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
                    <code class="font-mono text-sm">{{ part.value }}</code>
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

        <h3 scTypeset>Variables</h3>
        <div
          scTableContainer
          tabindex="0"
          role="region"
          aria-label="Typeset variables"
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
        <div
          scTableContainer
          tabindex="0"
          role="region"
          aria-label="Typeset classes"
        >
          <table scTable>
            <thead scTableHeader>
              <tr scTableRow>
                <th scTableHeaderCell>Class</th>
                <th scTableHeaderCell>Description</th>
              </tr>
            </thead>
            <tbody scTableBody>
              @for (item of classes; track item.name) {
                <tr scTableRow>
                  <td scTableCell>
                    <code class="font-mono text-sm">{{ item.name }}</code>
                  </td>
                  <td
                    scTableCell
                    class="text-muted-foreground whitespace-normal"
                  >
                    {{ item.description }}
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
export default class TypesetPage {
  private readonly anatomy = {
    imports: "import { ScTypeset } from '@semantic-components/ui';",
    markup: `<!-- Content you don't write: plain elements -->
<article class="typeset">…</article>

<!-- Text on its own -->
<h2 scTypeset>…</h2>
<p scTypeset>… <code scTypeset>…</code> …</p>`,
  };

  private readonly parts: readonly Row[] = [
    {
      name: 'ScTypeset',
      value: '[scTypeset]',
      description:
        'An element on its own — a heading, a paragraph, a quote, inline code, a rule — set by its tag, as in a container: it marks itself data-typeset. For the container itself, class="typeset".',
    },
  ];

  private readonly variables: readonly Row[] = [
    {
      name: '--typeset-size',
      value: '1em',
      description:
        "The text's size; headings follow (in em). A container's text is 1.125× it on a phone.",
    },
    {
      name: '--typeset-leading',
      value: '1.75',
      description: 'The line height of the text.',
    },
    {
      name: '--typeset-flow',
      value: '1.25em',
      description: 'The space between blocks; headings take more above them.',
    },
    {
      name: '--typeset-font-body',
      value: 'inherit',
      description: "The text's font.",
    },
    {
      name: '--typeset-font-heading',
      value: 'var(--font-heading)',
      description: "The headings' font.",
    },
    {
      name: '--typeset-font-mono',
      value: 'var(--font-mono)',
      description: "Code's font.",
    },
    {
      name: '--typeset-radius',
      value: "the style's Code Block",
      description: 'The corners of code blocks and images.',
    },
    {
      name: '--typeset-radius-inline',
      value: "the style's Kbd",
      description: 'The corners of inline code and keys.',
    },
  ];

  private readonly classes: readonly Omit<Row, 'value'>[] = [
    {
      name: 'typeset',
      description:
        'The container: its plain elements set — headings, paragraphs, lists, quotes, code, tables. Components in it (a data-slot) keep their look.',
    },
    {
      name: 'not-typeset',
      description:
        'Opts an element and what it holds out of the container (data-not-typeset too).',
    },
    {
      name: 'typeset-scroll',
      description: 'Wraps a wide table: it scrolls across in its own box.',
    },
  ];
}
