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
import {
  type ApiPart,
  PartsTable,
} from '../../../components/parts-table/parts-table';
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
    PartsTable,
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
    <div class="space-y-12">
      <div class="space-y-2">
        <h1 scTypeset>Typeset</h1>
        <p class="text-muted-foreground">
          Styles for content you don't write the markup of — rendered markdown,
          a chat answer — in a typeset container, and the same look for a
          heading, a paragraph or a quote on its own. One CSS file, started from
          shadcn's and tuned by variables; components inside keep their look,
          your classes win.
        </p>
        <app-component-badges path="typeset" />
      </div>

      <section class="space-y-4">
        <h2 scTypeset appToc>Usage</h2>
        <p>
          Import the rules and your style's variables in your global stylesheet,
          after Tailwind:
          <code scTypeset
            >@import '@semantic-components/styles/typeset.css';</code
          >
          and
          <code scTypeset
            >@import
            '@semantic-components/styles/nova/typeset-variables.css';</code
          >
          (your style's). Then put your content in a
          <code scTypeset>typeset</code> container.
        </p>
        <app-typeset-usage-demo-container />
      </section>

      <section class="space-y-4">
        <h2 scTypeset appToc>Anatomy</h2>
        <p>
          A class on the container, for content you don't write; one directive,
          on any element, for text that stands on its own.
        </p>
        <app-anatomy [imports]="anatomy.imports" [markup]="anatomy.markup" />
      </section>

      <section class="space-y-4">
        <h2 scTypeset appToc>Two ways</h2>
        <p>
          The same rules reach your text in two ways; pick by what the text is.
        </p>
        <ul class="list-disc space-y-2 ps-6">
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
        <p>
          <strong class="text-foreground">Our recommendation:</strong> a
          container for reading text — content you don't write the markup of
          (markdown, a CMS, a chat answer) and long-form pages (an article, a
          blog post, a docs page): one class, and every element in it follows,
          lists and all. The directive for a few pieces of text placed among UI
          — a dashboard's title, a settings section's heading, a paragraph in a
          card — where a container would also set the layout's own lists and
          links. In a container, the directive changes nothing.
        </p>
        <p>
          Either way, the variables tune it — on the container, on a style class
          of yours (<code scTypeset>.typeset-chat</code>) or on
          <code scTypeset>:root</code> for the whole app.
        </p>
      </section>

      <section class="space-y-4">
        <h2 scTypeset appToc>Leaving something out</h2>
        <p>
          In a container, every plain element is set. To keep one as it is — a
          link, a list, a block:
        </p>
        <ul class="list-disc space-y-2 ps-6">
          <li>
            <strong class="text-foreground">All of it:</strong>
            <code scTypeset>class="not-typeset"</code> (or
            <code scTypeset>data-not-typeset</code>, where your renderer can't
            add a class). The element and everything in it lose Typeset's rules
            — a link its underline, weight, hover and focus outline — and keep
            only your classes. On a wrapper, a whole region is left out.
          </li>
          <li>
            <strong class="text-foreground">Part of it:</strong> a utility on
            the element —
            <code scTypeset>class="no-underline font-normal"</code>. The rules
            are in <code scTypeset>&#64;layer components</code> with
            <code scTypeset>:where()</code>, so your classes win; the rest of
            Typeset's look stays.
          </li>
          <li>
            <strong class="text-foreground">Components:</strong> anything with a
            <code scTypeset>data-slot</code> keeps its own look with nothing to
            add — a button, a card, a link with a button's look (<code scTypeset
              >scLink variant="button"</code
            >). A plain text link (<code scTypeset>scLink</code>) has none: it's
            set as a link in the text, as it should be.
          </li>
        </ul>
        <p>
          In rendered markdown you can rarely put a class on one element: a hook
          in your renderer adds it, or <code scTypeset>not-typeset</code> goes
          on a wrapper around the region.
        </p>
      </section>

      <section class="space-y-4">
        <h2 scTypeset appToc>Not shadcn's Typeset</h2>
        <p>
          We started from shadcn's <code scTypeset>typeset.css</code> and no
          longer follow it exactly. What's ours:
        </p>
        <ul class="list-disc space-y-2 ps-6">
          <li>
            <strong class="text-foreground"
              >The variables are the style's</strong
            >, on <code scTypeset>:root</code> (shadcn sets them on
            <code scTypeset>.typeset</code> in its file): each style's own
            <code scTypeset>typeset-variables.css</code> — optional — or your
            values.
          </li>
          <li>
            <strong class="text-foreground">An element on its own</strong> is
            set like one in a container: <code scTypeset>scTypeset</code> marks
            it.
          </li>
          <li>
            <strong class="text-foreground">The style's corners:</strong> code
            blocks and images as its Code Block; inline code, keys and
            highlights as its Kbd (shadcn's highlight has a fixed 0.2em).
          </li>
          <li>
            <strong class="text-foreground">Headings h1 to h4</strong> take the
            style's weight, tracking and case —
            <code scTypeset>--sc-typeset-heading-weight</code>,
            <code scTypeset>--sc-typeset-heading-tracking</code>,
            <code scTypeset>--sc-typeset-heading-case</code>; shadcn's Typeset
            has none. 600, normal and none in every style but sera (uppercase,
            0.05em: its titles).
          </li>
        </ul>
        <p>
          <strong class="text-foreground">Writing your own values?</strong> Set
          the three heading variables too: they have no fallback, and without
          <code scTypeset>--sc-typeset-heading-weight</code> headings lose their
          bold.
        </p>
      </section>

      <section class="space-y-4">
        <h2 scTypeset appToc>Accessibility</h2>
        <ul class="list-disc space-y-2 ps-6">
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
        <p>
          Each takes <code scTypeset>class</code>; your classes win over its
          rules.
        </p>
        <app-parts-table label="Typeset directive" [parts]="parts" />

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

  private readonly parts: readonly ApiPart[] = [
    {
      name: 'ScTypeset',
      selector: '[scTypeset]',
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
      name: '--sc-typeset-radius',
      value: "the style's Code Block",
      description: 'The corners of code blocks and images.',
    },
    {
      name: '--sc-typeset-radius-inline',
      value: "the style's Kbd",
      description: 'The corners of inline code, keys and highlights.',
    },
    {
      name: '--sc-typeset-heading-weight',
      value: '600',
      description: 'The weight of headings h1 to h4.',
    },
    {
      name: '--sc-typeset-heading-tracking',
      value: 'normal (sera: 0.05em, as its titles)',
      description: 'The letter spacing of headings h1 to h4.',
    },
    {
      name: '--sc-typeset-heading-case',
      value: 'none (sera: uppercase, as its titles)',
      description: 'The case of headings h1 to h4 (text-transform).',
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
