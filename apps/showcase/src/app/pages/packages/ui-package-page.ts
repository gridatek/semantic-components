import { Component, ViewEncapsulation } from '@angular/core';
import { RouterLink } from '@angular/router';
import {
  ScLink,
  ScTable,
  ScTableBody,
  ScTableCell,
  ScTableContainer,
  ScTableHeader,
  ScTableHeaderCell,
  ScTableRow,
  ScTypeset,
} from '@semantic-components/ui';
import { DocCode } from '../../components/doc-code/doc-code';
import { TocHeading } from '../../components/toc/toc-heading';

interface EntryPoint {
  /** After `@semantic-components/ui/`. */
  readonly path: string;
  readonly holds: string;
  /** Its docs page, when the site shows one. */
  readonly link?: string;
  readonly needs: readonly string[];
}

@Component({
  selector: 'app-ui-package-page',
  imports: [
    DocCode,
    RouterLink,
    ScLink,
    ScTable,
    ScTableBody,
    ScTableCell,
    ScTableContainer,
    ScTableHeader,
    ScTableHeaderCell,
    ScTableRow,
    ScTypeset,
    TocHeading,
  ],
  template: `
    <div class="space-y-12">
      <div class="space-y-2">
        <h1 scTypeset>UI</h1>
        <p class="text-muted-foreground">
          <code scTypeset>&#64;semantic-components/ui</code>
          — the components, the layouts and the utilities. The light ones in one
          entry point; those built on another library in entry points of their
          own, so an app carries that library only if it uses them.
        </p>
      </div>

      <section class="space-y-4">
        <h2 scTypeset appToc>The main entry point</h2>
        <p>
          Most components (Button, Dialog, Select, Sidebar, Menu…), the layouts,
          and the utilities: the setup (<code scTypeset
            >provideSemanticComponents</code
          >), the theme (<code scTypeset>ScThemeManager</code>), saved choices
          (<code scTypeset>ScStorage</code>). It needs only Angular (core,
          common, router, forms, the CDK and Aria), RxJS,
          class-variance-authority and cn.
        </p>
        <app-doc-code [code]="mainCode" />
      </section>

      <section class="space-y-4">
        <h2 scTypeset appToc>Entry points</h2>
        <p>
          Each is built on another library — an optional peer of the package, so
          an app that doesn&apos;t use the entry point doesn&apos;t carry it.
        </p>
        <div scTableContainer>
          <table scTable>
            <thead scTableHeader>
              <tr scTableRow>
                <th scTableHeaderCell>Entry point</th>
                <th scTableHeaderCell>Holds</th>
                <th scTableHeaderCell>Needs</th>
              </tr>
            </thead>
            <tbody scTableBody>
              @for (entry of entryPoints; track entry.path) {
                <tr scTableRow>
                  <td scTableCell class="font-mono text-xs">
                    ui/{{ entry.path }}
                  </td>
                  <td scTableCell class="whitespace-normal">
                    @if (entry.link) {
                      <a scLink [routerLink]="entry.link">{{ entry.holds }}</a>
                    } @else {
                      {{ entry.holds }}
                    }
                  </td>
                  <td scTableCell class="font-mono text-xs whitespace-normal">
                    {{ entry.needs.join(', ') }}
                  </td>
                </tr>
              }
            </tbody>
          </table>
        </div>
        <app-doc-code [code]="entryCode" />
      </section>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
})
export default class UiPackagePage {
  private readonly mainCode = `import { ScButton, ScThemeManager, provideSemanticComponents } from '@semantic-components/ui';`;

  private readonly entryCode = `

import { ScCarousel, ScCarouselItem } from '@semantic-components/ui/carousel';`;

  private readonly entryPoints: EntryPoint[] = [
    {
      path: 'carousel',
      holds: 'Carousel',
      link: '/docs/components/carousel',
      needs: ['embla-carousel'],
    },
    {
      path: 'charts',
      holds:
        'Charts: area, bar, line, pie, radar, radial, scatter, funnel, sunburst',
      link: '/docs/components/chart',
      needs: ['d3-scale', 'd3-shape'],
    },
    {
      path: 'charts/sankey',
      holds: 'Sankey chart',
      link: '/docs/components/sankey-chart',
      needs: ['d3-sankey', 'd3-shape'],
    },
    {
      path: 'charts/treemap',
      holds: 'Treemap chart',
      link: '/docs/components/treemap-chart',
      needs: ['d3-hierarchy'],
    },
    {
      path: 'code-block',
      holds: 'Code Block',
      link: '/docs/components/code-block',
      needs: ['shiki'],
    },
    {
      path: 'code-editor',
      holds: 'Code Editor',
      needs: [
        '@codemirror/commands',
        '@codemirror/language',
        '@codemirror/language-data',
        '@codemirror/state',
        '@codemirror/view',
        '@lezer/highlight',
      ],
    },
    {
      path: 'confetti',
      holds: 'Confetti',
      needs: ['canvas-confetti'],
    },
    {
      path: 'data-table',
      holds: 'Data Table, Tree Table',
      needs: ['@tanstack/angular-table'],
    },
    {
      path: 'diff-viewer',
      holds: 'Diff Viewer',
      needs: ['diff'],
    },
    {
      path: 'editor',
      holds: 'Editor',
      link: '/docs/components/editor',
      needs: [
        '@tiptap/core',
        '@tiptap/pm',
        '@tiptap/starter-kit',
        '@tiptap/extensions',
        '@tiptap/extension-list',
      ],
    },
    {
      path: 'editor/align',
      holds: 'Editor: text alignment',
      needs: ['@tiptap/extension-text-align'],
    },
    {
      path: 'editor/bubble-menu',
      holds: 'Editor: bubble menu',
      needs: ['@tiptap/extension-bubble-menu'],
    },
    {
      path: 'editor/highlight',
      holds: 'Editor: highlight',
      needs: ['@tiptap/extension-highlight'],
    },
    {
      path: 'editor/images',
      holds: 'Editor: images',
      needs: ['@tiptap/extension-image', '@tiptap/extension-file-handler'],
    },
    {
      path: 'editor/markdown',
      holds: 'Editor: Markdown',
      needs: ['@tiptap/markdown'],
    },
    {
      path: 'editor/scripts',
      holds: 'Editor: subscript, superscript',
      needs: ['@tiptap/extension-subscript', '@tiptap/extension-superscript'],
    },
    {
      path: 'editor/search',
      holds: 'Editor: find and replace',
      needs: ['@tiptap/extension-find-and-replace'],
    },
    {
      path: 'editor/tables',
      holds: 'Editor: tables',
      needs: ['@tiptap/extension-table'],
    },
    {
      path: 'gantt',
      holds: 'Gantt',
      needs: ['@tanstack/angular-table'],
    },
    {
      path: 'i18n',
      holds: 'Languages at run time',
      link: '/docs/getting-started/i18n',
      needs: ['@angular/localize'],
    },
    {
      path: 'pdf-viewer',
      holds: 'PDF Viewer',
      needs: ['pdfjs-dist'],
    },
    {
      path: 'phone-input',
      holds: 'Phone Input',
      needs: ['libphonenumber-js'],
    },
    {
      path: 'qr-code',
      holds: 'QR Code',
      needs: ['uqr'],
    },
  ];
}
