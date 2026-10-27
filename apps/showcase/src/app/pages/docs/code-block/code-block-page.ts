import { Component, ViewEncapsulation } from '@angular/core';
import { ScHeading } from '@semantic-components/ui';
import {
  ScCodeBlock,
  ScCodeBlockActions,
  ScCodeBlockContent,
  ScCodeBlockCopy,
  ScCodeBlockHeader,
  ScCodeBlockTitle,
} from '@semantic-components/ui/code-block';
import { SiCheckIcon, SiCopyIcon } from '@semantic-icons/lucide-icons';
import { ComponentBadges } from '../../../components/component-badges/component-badges';
import { EntryInstall } from '../../../components/entry-install/entry-install';
import { TocHeading } from '../../../components/toc/toc-heading';
import { BasicCodeBlockDemoContainer } from './demos/basic-code-block-demo-container';
import { ChangesCodeBlockDemoContainer } from './demos/changes-code-block-demo-container';
import { ErrorCodeBlockDemoContainer } from './demos/error-code-block-demo-container';
import { FloatingCodeBlockDemoContainer } from './demos/floating-code-block-demo-container';
import { NumbersCodeBlockDemoContainer } from './demos/numbers-code-block-demo-container';
import { WrapCodeBlockDemoContainer } from './demos/wrap-code-block-demo-container';

@Component({
  selector: 'app-code-block-page',
  imports: [
    BasicCodeBlockDemoContainer,
    NumbersCodeBlockDemoContainer,
    ChangesCodeBlockDemoContainer,
    WrapCodeBlockDemoContainer,
    FloatingCodeBlockDemoContainer,
    ErrorCodeBlockDemoContainer,
    TocHeading,
    ComponentBadges,
    EntryInstall,
    ScCodeBlock,
    ScCodeBlockActions,
    ScCodeBlockContent,
    ScCodeBlockCopy,
    ScCodeBlockHeader,
    ScCodeBlockTitle,
    SiCheckIcon,
    SiCopyIcon,
    ScHeading,
  ],
  template: `
    <div class="space-y-8">
      <div class="space-y-2">
        <h1 scHeading>Code Block</h1>
        <p class="text-muted-foreground">
          Code to read and copy: a header (title, actions), the code —
          highlighted by the app’s highlighter, numbered, wrapped, its lines
          marked — and a footer.
        </p>
        <app-component-badges path="code-block" />
      </div>

      <section class="space-y-4">
        <h2 scHeading appToc>Installation</h2>
        <app-entry-install
          entry="code-block"
          library="shiki"
          href="https://shiki.style"
          names="ScCodeBlock, ScCodeBlockContent"
        />
        <p class="text-muted-foreground">
          Then provide the highlighter, in your app's config — without it, code
          shows plain:
        </p>
        <div scCodeBlock>
          <div scCodeBlockHeader>
            <div scCodeBlockTitle>ts</div>
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
                <span class="sr-only">Copy to clipboard</span>
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
        <h2 scHeading appToc>Basic</h2>
        <p class="text-muted-foreground">
          A header with a title and a copy button; the code highlighted in its
          language — the app provides the highlighter (provideCodeHighlighter).
        </p>
        <app-basic-code-block-demo-container />
      </section>

      <section class="space-y-4">
        <h2 scHeading appToc>Line numbers</h2>
        <p class="text-muted-foreground">
          lineNumbers, from startLine; highlightedLines marks lines by number.
        </p>
        <app-numbers-code-block-demo-container />
      </section>

      <section class="space-y-4">
        <h2 scHeading appToc>Added and removed</h2>
        <p class="text-muted-foreground">
          addedLines and removedLines: a + or − at the start of the line, a tint
          across it.
        </p>
        <app-changes-code-block-demo-container />
      </section>

      <section class="space-y-4">
        <h2 scHeading appToc>Wrap</h2>
        <p class="text-muted-foreground">
          wrap: long lines break instead of scrolling.
        </p>
        <app-wrap-code-block-demo-container />
      </section>

      <section class="space-y-4">
        <h2 scHeading appToc>Actions over the code</h2>
        <p class="text-muted-foreground">
          Actions straight in the block, without a header: at the top end, shown
          on hover or focus — always on a touch screen. size="sm" for a tighter
          block.
        </p>
        <app-floating-code-block-demo-container />
      </section>

      <section class="space-y-4">
        <h2 scHeading appToc>Error output</h2>
        <p class="text-muted-foreground">
          variant="destructive": an error’s output, with a footer under it.
        </p>
        <app-error-code-block-demo-container />
      </section>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
})
export default class CodeBlockPage {
  readonly highlighterCode = `import { provideCodeHighlighter } from '@semantic-components/ui/code-block';

export const appConfig: ApplicationConfig = {
  providers: [provideCodeHighlighter()],
};`;
}
