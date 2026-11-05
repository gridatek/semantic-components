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
import {
  ScCodeBlock,
  ScCodeBlockActions,
  ScCodeBlockContent,
  ScCodeBlockCopy,
  ScCodeBlockHeader,
  ScCodeBlockTitle,
} from '@semantic-components/ui/code-block';
import { SiCheckIcon, SiCopyIcon } from '@semantic-icons/lucide-icons';
import { Anatomy } from '../../../components/anatomy/anatomy';
import { ComponentBadges } from '../../../components/component-badges/component-badges';
import { EntryInstall } from '../../../components/entry-install/entry-install';
import { TocHeading } from '../../../components/toc/toc-heading';
import { ActionsCodeBlockDemoContainer } from './demos/actions-code-block-demo-container';
import { BasicCodeBlockDemoContainer } from './demos/basic-code-block-demo-container';
import { CodeBlockUsageDemoContainer } from './demos/code-block-usage-demo-container';
import { DestructiveCodeBlockDemoContainer } from './demos/destructive-code-block-demo-container';
import { DiffCodeBlockDemoContainer } from './demos/diff-code-block-demo-container';
import { FloatingActionsCodeBlockDemoContainer } from './demos/floating-actions-code-block-demo-container';
import { HeaderCodeBlockDemoContainer } from './demos/header-code-block-demo-container';
import { HeightCodeBlockDemoContainer } from './demos/height-code-block-demo-container';
import { HighlightedLinesCodeBlockDemoContainer } from './demos/highlighted-lines-code-block-demo-container';
import { LanguagesCodeBlockDemoContainer } from './demos/languages-code-block-demo-container';
import { LineNumbersCodeBlockDemoContainer } from './demos/line-numbers-code-block-demo-container';
import { RtlCodeBlockDemoContainer } from './demos/rtl-code-block-demo-container';
import { ShowMoreCodeBlockDemoContainer } from './demos/show-more-code-block-demo-container';
import { SizeCodeBlockDemoContainer } from './demos/size-code-block-demo-container';
import { StartLineCodeBlockDemoContainer } from './demos/start-line-code-block-demo-container';
import { TabsCodeBlockDemoContainer } from './demos/tabs-code-block-demo-container';
import { TerminalOutputCodeBlockDemoContainer } from './demos/terminal-output-code-block-demo-container';
import { WrapCodeBlockDemoContainer } from './demos/wrap-code-block-demo-container';

@Component({
  selector: 'app-code-block-page',
  imports: [
    Anatomy,
    CodeBlockUsageDemoContainer,
    BasicCodeBlockDemoContainer,
    HeaderCodeBlockDemoContainer,
    ActionsCodeBlockDemoContainer,
    FloatingActionsCodeBlockDemoContainer,
    LineNumbersCodeBlockDemoContainer,
    StartLineCodeBlockDemoContainer,
    WrapCodeBlockDemoContainer,
    HighlightedLinesCodeBlockDemoContainer,
    DiffCodeBlockDemoContainer,
    HeightCodeBlockDemoContainer,
    ShowMoreCodeBlockDemoContainer,
    SizeCodeBlockDemoContainer,
    DestructiveCodeBlockDemoContainer,
    TabsCodeBlockDemoContainer,
    LanguagesCodeBlockDemoContainer,
    TerminalOutputCodeBlockDemoContainer,
    RtlCodeBlockDemoContainer,
    ComponentBadges,
    EntryInstall,
    TocHeading,
    ScHeading,
    ScCodeBlock,
    ScCodeBlockActions,
    ScCodeBlockContent,
    ScCodeBlockCopy,
    ScCodeBlockHeader,
    ScCodeBlockTitle,
    ScTable,
    ScTableBody,
    ScTableCell,
    ScTableContainer,
    ScTableHeader,
    ScTableHeaderCell,
    ScTableRow,
    SiCheckIcon,
    SiCopyIcon,
  ],
  template: `
    <div class="space-y-8">
      <div class="space-y-2">
        <h1 scHeading>Code Block</h1>
        <p class="text-muted-foreground">
          Code to read and copy: a header (title, actions), the code —
          highlighted, numbered, wrapped, its lines marked — and a footer. In
          the look of the app&apos;s preset.
        </p>
        <app-component-badges path="code-block" />
      </div>

      <section class="space-y-4">
        <h2 scHeading appToc>Usage</h2>
        <app-code-block-usage-demo-container />
      </section>

      <section class="space-y-4">
        <h2 scHeading appToc>Installation</h2>
        <app-entry-install
          entry="code-block"
          library="shiki"
          href="https://shiki.style"
          names="ScCodeBlock, ScCodeBlockContent"
        />
        <p class="text-muted-foreground">
          Then add the highlighter, a feature of the library, in your app&apos;s
          config — without it, code shows plain:
        </p>
        <div scCodeBlock>
          <div scCodeBlockHeader>
            <div scCodeBlockTitle>app.config.ts</div>
            <div scCodeBlockActions>
              <button
                [scCodeBlockCopy]="highlighterCode"
                #copyHighlighter="scCodeBlockCopy"
              >
                @if (copyHighlighter.copied()) {
                  <svg siCheckIcon></svg>
                } @else {
                  <svg siCopyIcon></svg>
                }
                <span class="sr-only">Copy code</span>
              </button>
            </div>
          </div>
          <pre
            scCodeBlockContent
            [code]="highlighterCode"
            language="angular-ts"
          ></pre>
        </div>
      </section>

      <section class="space-y-4">
        <h2 scHeading appToc>Anatomy</h2>
        <p class="text-muted-foreground">
          Every part is a directive on your element; the title, the buttons and
          their names are yours. The code is an input, highlighted in its
          language.
        </p>
        <app-anatomy [imports]="anatomy.imports" [markup]="anatomy.markup" />
      </section>

      <section class="space-y-4">
        <h2 scHeading appToc>Highlighting</h2>
        <p class="text-muted-foreground">
          Shiki, loaded with the first block; each language the first time it is
          used: typescript, angular-ts, angular-html, javascript, html, css,
          scss, json, yaml, markdown, bash, python, sql, diff — and ansi, for a
          terminal&apos;s colours. Another language, or no highlighter, shows
          the code plain. The code is always left to right.
        </p>
      </section>

      <section class="space-y-8">
        <h2 scHeading appToc>Examples</h2>
        <app-basic-code-block-demo-container />
        <app-header-code-block-demo-container />
        <app-actions-code-block-demo-container />
        <app-floating-actions-code-block-demo-container />
        <app-line-numbers-code-block-demo-container />
        <app-start-line-code-block-demo-container />
        <app-wrap-code-block-demo-container />
        <app-highlighted-lines-code-block-demo-container />
        <app-diff-code-block-demo-container />
        <app-height-code-block-demo-container />
        <app-show-more-code-block-demo-container />
        <app-size-code-block-demo-container />
        <app-destructive-code-block-demo-container />
        <app-tabs-code-block-demo-container />
        <app-languages-code-block-demo-container />
        <app-terminal-output-code-block-demo-container />
        <app-rtl-code-block-demo-container />
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
          aria-label="Code Block parts"
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
export default class CodeBlockPage {
  readonly highlighterCode = `import { provideSemanticComponents } from '@semantic-components/ui';
import { withCodeHighlighter } from '@semantic-components/ui/code-block';

export const appConfig: ApplicationConfig = {
  providers: [provideSemanticComponents({}, withCodeHighlighter())],
};`;

  protected readonly anatomy = {
    imports: [
      'import {',
      '  ScCodeBlock, ScCodeBlockHeader, ScCodeBlockTitle, ScCodeBlockActions,',
      '  ScCodeBlockCopy, ScCodeBlockContent, ScCodeBlockFooter,',
      "} from '@semantic-components/ui/code-block';",
    ].join('\n'),
    markup: [
      '<div scCodeBlock>',
      '  <div scCodeBlockHeader>',
      '    <div scCodeBlockTitle>…</div>',
      '    <div scCodeBlockActions>',
      '      <button [scCodeBlockCopy]="code">…</button>',
      '    </div>',
      '  </div>',
      '  <pre scCodeBlockContent [code]="code" language="…"></pre>',
      '  <div scCodeBlockFooter>…</div>',
      '</div>',
    ].join('\n'),
  };

  protected readonly parts = [
    {
      name: 'ScCodeBlock',
      selector: 'div[scCodeBlock]',
      description:
        "The block: variant ('default' or 'destructive'), size ('default' or 'sm').",
    },
    {
      name: 'ScCodeBlockHeader, ScCodeBlockTitle',
      selector: 'div[scCodeBlockHeader], div[scCodeBlockTitle]',
      description: 'The header, its title (your icon and text) first.',
    },
    {
      name: 'ScCodeBlockActions',
      selector: 'div[scCodeBlockActions]',
      description:
        'Your buttons: at the header’s end; straight in the block, over the code, shown on hover or focus.',
    },
    {
      name: 'ScCodeBlockCopy',
      selector: 'button[scCodeBlockCopy]',
      description:
        "Copies its value, [scCodeBlockCopy]; copied() for two seconds (duration). variant and size: the button's, 'ghost' and 'icon-xs'.",
    },
    {
      name: 'ScCodeBlockContent',
      selector: 'pre[scCodeBlockContent]',
      description:
        'The code: code, language, lineNumbers, startLine, wrap, highlightedLines, addedLines, removedLines. Focusable, to scroll it.',
    },
    {
      name: 'ScCodeBlockFooter',
      selector: 'div[scCodeBlockFooter]',
      description: 'A footer under the code.',
    },
  ];
}
