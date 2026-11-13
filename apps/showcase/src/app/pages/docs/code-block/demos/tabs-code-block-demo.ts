import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScTabs,
  ScTabsList,
  ScTabsPanel,
  ScTabsPanelContent,
  ScTabsTab,
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

/** One block per file, in Tabs. */
@Component({
  selector: 'app-tabs-code-block-demo',
  imports: [
    ScTabs,
    ScTabsList,
    ScTabsTab,
    ScTabsPanel,
    ScTabsPanelContent,
    ScCodeBlock,
    ScCodeBlockHeader,
    ScCodeBlockTitle,
    ScCodeBlockActions,
    ScCodeBlockCopy,
    ScCodeBlockContent,
    SiCheckIcon,
    SiCopyIcon,
  ],
  template: `
    <div scTabs value="component">
      <div scTabsList>
        <button scTabsTab value="component">hello.ts</button>
        <button scTabsTab value="template">hello.html</button>
      </div>
      <div scTabsPanel value="component">
        <ng-template scTabsPanelContent>
          <div scCodeBlock>
            <div scCodeBlockHeader>
              <div scCodeBlockTitle>src/app/hello.ts</div>
              <div scCodeBlockActions>
                <button [scCodeBlockCopy]="component" #copyTs="scCodeBlockCopy">
                  @if (copyTs.copied()) {
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
              [code]="component"
              language="typescript"
              lineNumbers
            ></pre>
            <span aria-live="polite" class="sr-only">
              @if (copyTs.copied()) {
                Copied
              }
            </span>
          </div>
        </ng-template>
      </div>
      <div scTabsPanel value="template">
        <ng-template scTabsPanelContent>
          <div scCodeBlock>
            <div scCodeBlockHeader>
              <div scCodeBlockTitle>src/app/hello.html</div>
              <div scCodeBlockActions>
                <button
                  [scCodeBlockCopy]="template"
                  #copyHtml="scCodeBlockCopy"
                >
                  @if (copyHtml.copied()) {
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
              [code]="template"
              language="angular-html"
              lineNumbers
            ></pre>
            <span aria-live="polite" class="sr-only">
              @if (copyHtml.copied()) {
                Copied
              }
            </span>
          </div>
        </ng-template>
      </div>
    </div>
  `,
  host: { class: 'block w-full max-w-md' },
  encapsulation: ViewEncapsulation.None,
})
export class TabsCodeBlockDemo {
  readonly component = `@Component({
  selector: 'app-hello',
  templateUrl: './hello.html',
})
export class Hello {
  readonly name = input('world');
}`;
  readonly template = `<p>Hello, {{ name() }}!</p>`;
}
