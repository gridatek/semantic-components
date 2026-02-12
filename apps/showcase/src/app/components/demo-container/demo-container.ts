import {
  ChangeDetectionStrategy,
  Component,
  input,
  ViewEncapsulation,
} from '@angular/core';
import { TocHeading } from '../toc/toc-heading';
import {
  ScCodeViewer,
  ScCodeViewerContent,
  ScCodeViewerHeader,
  ScCodeViewerLabel,
  ScCodeViewerLanguage,
  ScCopyButton,
  ScTab,
  ScTabList,
  ScTabPanel,
  ScTabs,
} from '@semantic-components/ui-lab';

@Component({
  selector: 'app-demo-container',
  imports: [
    ScTabs,
    ScTabList,
    ScTab,
    ScTabPanel,
    ScCodeViewer,
    ScCodeViewerHeader,
    ScCodeViewerLabel,
    ScCodeViewerContent,
    ScCopyButton,
    TocHeading,
  ],
  template: `
    <div class="space-y-4">
      @if (title()) {
        <div class="flex items-center gap-2">
          <h3 toc class="text-sm font-medium">{{ title() }}</h3>
          @if (demoUrl()) {
            <a
              [href]="demoUrl()"
              target="_blank"
              class="inline-flex h-6 w-6 items-center justify-center rounded-md text-muted-foreground hover:text-foreground"
              title="Open in isolation"
            >
              <svg
                class="size-3.5"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                aria-hidden="true"
              >
                <path d="M15 3h6v6" />
                <path d="M10 14 21 3" />
                <path
                  d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"
                />
              </svg>
              <span class="sr-only">Open {{ title() }} demo in isolation</span>
            </a>
          }
        </div>
      }

      @if (description()) {
        <p class="text-sm text-muted-foreground">{{ description() }}</p>
      }

      <div sc-tabs class="w-full">
        <div sc-tab-list selectedTab="preview">
          <button sc-tab value="preview">Preview</button>
          <button sc-tab value="code">Code</button>
        </div>

        <div
          sc-tab-panel
          value="preview"
          class="flex min-h-40 items-center justify-center rounded-md border p-6"
        >
          <ng-content />
        </div>

        <div sc-tab-panel value="code">
          <div sc-code-viewer>
            <div sc-code-viewer-header>
              <span sc-code-viewer-label>{{ language() }}</span>
              <button sc-copy-button [value]="code()"></button>
            </div>
            <div
              sc-code-viewer-content
              [code]="code()"
              [language]="language()"
              [showLineNumbers]="true"
            ></div>
          </div>
        </div>
      </div>
    </div>
  `,
  host: {
    class: 'block',
  },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DemoContainer {
  readonly title = input<string>('');
  readonly description = input<string>('');
  readonly demoUrl = input<string>('');
  readonly code = input.required<string>();
  readonly language = input<ScCodeViewerLanguage>('angular-ts');
}
