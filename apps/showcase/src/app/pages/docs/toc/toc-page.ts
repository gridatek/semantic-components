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
import { BasicTocDemoContainer } from './demos/basic-toc-demo-container';
import { LevelsTocDemoContainer } from './demos/levels-toc-demo-container';
import { LinksTocDemoContainer } from './demos/links-toc-demo-container';
import { RtlTocDemoContainer } from './demos/rtl-toc-demo-container';
import { TocUsageDemoContainer } from './demos/toc-usage-demo-container';

interface ApiRow {
  readonly name: string;
  readonly type: string;
  readonly default: string;
  readonly description: string;
}

@Component({
  selector: 'app-toc-page',
  imports: [
    Anatomy,
    BasicTocDemoContainer,
    ComponentBadges,
    LevelsTocDemoContainer,
    LinksTocDemoContainer,
    RtlTocDemoContainer,
    ScTable,
    ScTableBody,
    ScTableCell,
    ScTableContainer,
    ScTableHeader,
    ScTableHeaderCell,
    ScTableRow,
    ScTypeset,
    TocHeading,
    TocUsageDemoContainer,
  ],
  template: `
    <div class="space-y-8">
      <div class="space-y-2">
        <h1 scTypeset>Table of Contents</h1>
        <p class="text-muted-foreground">
          The sections of a page, as links beside it: listed from its headings
          or written by you, the section read marked as it scrolls.
        </p>
        <app-component-badges path="toc" />
      </div>

      <section class="space-y-4">
        <h2 scTypeset appToc>Usage</h2>
        <app-toc-usage-demo-container />
      </section>

      <section class="space-y-4">
        <h2 scTypeset appToc>Anatomy</h2>
        <p class="text-muted-foreground">
          Every part is a directive on your element: the headings in your
          content, a
          <code class="bg-muted rounded px-1.5 py-0.5 text-sm">nav</code>
          named by you, a list and its links. The
          <code class="bg-muted rounded px-1.5 py-0.5 text-sm">nav</code>
          lists the headings (<code
            class="bg-muted rounded px-1.5 py-0.5 text-sm"
            >items()</code
          >); links written by hand need no headings part. A scope is only for a
          table of contents apart from the page&apos;s.
        </p>
        <app-anatomy [imports]="anatomy.imports" [markup]="anatomy.markup" />
      </section>

      <section class="space-y-4">
        <h2 scTypeset appToc>Notes</h2>
        <ul class="text-muted-foreground list-disc space-y-2 ps-6">
          <li>
            The section read is the last one whose heading reached the top of
            the page — or of the box that scrolls it — and the last one,
            scrolled to the end. A heading&apos;s scroll margin is where it
            counts as reached: under a sticky header, the header&apos;s height
            (<code class="bg-muted rounded px-1.5 py-0.5 text-sm"
              >scroll-mt-20</code
            >).
          </li>
          <li>
            Its link is
            <code class="bg-muted rounded px-1.5 py-0.5 text-sm"
              >aria-current="location"</code
            >: a place in this page, not another page.
          </li>
          <li>
            A link followed scrolls to its section and moves the focus to its
            heading, for the keyboard and screen readers. In a box, the box
            scrolls, not the page.
          </li>
          <li>
            A link&apos;s address is this page at the section, not
            <code class="bg-muted rounded px-1.5 py-0.5 text-sm">#id</code>
            alone (which
            <code class="bg-muted rounded px-1.5 py-0.5 text-sm"
              >&lt;base href="/"&gt;</code
            >
            makes the home page&apos;s): a new tab or a copied link opens there.
          </li>
          <li>
            Listed from the headings, the list is filled in the browser: a
            heading&apos;s text is read once rendered. Links written by hand are
            rendered on the server too.
          </li>
          <li>
            A list taller than its place scrolls (<code
              class="bg-muted rounded px-1.5 py-0.5 text-sm"
              >overflow-y-auto</code
            >
            on the
            <code class="bg-muted rounded px-1.5 py-0.5 text-sm">nav</code>) and
            keeps the active link in view.
          </li>
        </ul>
      </section>

      <section class="space-y-8">
        <h2 scTypeset appToc>Examples</h2>
        <app-basic-toc-demo-container />
        <app-levels-toc-demo-container />
        <app-links-toc-demo-container />
        <app-rtl-toc-demo-container />
      </section>

      <section class="space-y-4">
        <h2 scTypeset appToc>API reference</h2>
        <p class="text-muted-foreground">
          Each part takes
          <code class="bg-muted rounded px-1.5 py-0.5 text-sm">class</code>,
          merged over its own (cn: a later class wins).
        </p>
        <div
          scTableContainer
          tabindex="0"
          role="region"
          aria-label="Table of contents parts"
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

        <h3 class="text-lg font-semibold">ScToc</h3>
        <p class="text-muted-foreground">
          Exported as
          <code class="bg-muted rounded px-1.5 py-0.5 text-sm">scToc</code>.
        </p>
        <div
          scTableContainer
          tabindex="0"
          role="region"
          aria-label="ScToc members"
        >
          <table scTable>
            <thead scTableHeader>
              <tr scTableRow>
                <th scTableHeaderCell>Member</th>
                <th scTableHeaderCell>Type</th>
                <th scTableHeaderCell>Description</th>
              </tr>
            </thead>
            <tbody scTableBody>
              @for (row of tocMembers; track row.name) {
                <tr scTableRow>
                  <td scTableCell>
                    <code class="font-mono text-sm">{{ row.name }}</code>
                  </td>
                  <td scTableCell>
                    <code class="font-mono text-sm">{{ row.type }}</code>
                  </td>
                  <td
                    scTableCell
                    class="text-muted-foreground whitespace-normal"
                  >
                    {{ row.description }}
                  </td>
                </tr>
              }
            </tbody>
          </table>
        </div>

        <h3 class="text-lg font-semibold">ScTocLink</h3>
        <div
          scTableContainer
          tabindex="0"
          role="region"
          aria-label="ScTocLink inputs"
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
              @for (row of linkInputs; track row.name) {
                <tr scTableRow>
                  <td scTableCell>
                    <code class="font-mono text-sm">{{ row.name }}</code>
                  </td>
                  <td scTableCell>
                    <code class="font-mono text-sm">{{ row.type }}</code>
                  </td>
                  <td scTableCell>
                    <code class="font-mono text-sm">{{ row.default }}</code>
                  </td>
                  <td
                    scTableCell
                    class="text-muted-foreground whitespace-normal"
                  >
                    {{ row.description }}
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
export default class TocPage {
  private readonly anatomy = {
    imports: [
      'import {',
      '  ScToc, ScTocList, ScTocLink, ScTocHeading, ScTocScope,',
      "} from '@semantic-components/ui';",
    ].join('\n'),
    markup: [
      '<h2 scTocHeading>…</h2>',
      '',
      '<nav scToc #toc="scToc" aria-label="…">',
      '  <ul scTocList>',
      '    @for (item of toc.items(); track item.id) {',
      '      <li>',
      '        <a [scTocLink]="item.id" [depth]="item.depth">{{ item.text }}</a>',
      '      </li>',
      '    }',
      '  </ul>',
      '</nav>',
    ].join('\n'),
  };

  private readonly parts = [
    {
      name: 'ScToc',
      selector: 'nav[scToc]',
      description:
        'The navigation, named by you (aria-label): lists the headings and marks the section read.',
    },
    {
      name: 'ScTocList',
      selector: 'ul[scTocList], ol[scTocList]',
      description: 'The list of links.',
    },
    {
      name: 'ScTocLink',
      selector: 'a[scTocLink]',
      description:
        'A link to a section, by its id; aria-current="location" when it is the one read.',
    },
    {
      name: 'ScTocHeading',
      selector: '[scTocHeading]',
      description:
        'A heading listed: your id, or one from its text; its scroll margin is where it counts as reached.',
    },
    {
      name: 'ScTocScope',
      selector: '[scTocScope]',
      description:
        'A table of contents of its own: the headings and the nav inside, apart from the page’s.',
    },
  ];

  private readonly tocMembers = [
    {
      name: 'items()',
      type: 'ScTocItem[]',
      description:
        'The headings in document order: id, text, level, and depth under the shallowest.',
    },
    {
      name: 'activeId()',
      type: 'string',
      description: 'The id of the section read; empty on the server.',
    },
    {
      name: 'goTo(id)',
      type: 'boolean',
      description:
        'Goes to the section: scrolled there, focus on its heading, its link marked.',
    },
  ];

  private readonly linkInputs: ApiRow[] = [
    {
      name: 'scTocLink',
      type: 'string',
      default: '—',
      description: 'The id of the section it goes to (required).',
    },
    {
      name: 'depth',
      type: 'number',
      default: '0',
      description: 'Indented by it: an item’s depth (up to 3).',
    },
  ];
}
