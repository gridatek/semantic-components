import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  inject,
  input,
} from '@angular/core';
import {
  ScCodeViewer,
  ScCodeViewerContent,
  ScCodeViewerHeader,
  ScCodeViewerLabel,
  ScCodeViewerLanguage,
} from '@semantic-components/code';
import {
  ScButton,
  ScCopyToClipboard,
  ScTab,
  ScTabList,
  ScTabPanel,
  ScTabs,
} from '@semantic-components/ui';
import {
  SiCheckIcon,
  SiCopyIcon,
  SiExternalLinkIcon,
} from '@semantic-icons/lucide-icons';
import { ConfigService } from '../../services/config.service';
import { TocHeading } from '../toc/toc-heading';

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
    ScButton,
    ScCopyToClipboard,
    SiCheckIcon,
    SiCopyIcon,
    SiExternalLinkIcon,
    TocHeading,
  ],
  template: `
    <div class="space-y-4">
      @if (title()) {
        <div class="flex items-center gap-2">
          <h3 toc class="text-sm font-medium">{{ title() }}</h3>
          @if (demoUrl() && devMode()) {
            <a
              [href]="demoUrl()"
              target="_blank"
              class="text-muted-foreground hover:text-foreground inline-flex h-6 w-6 items-center justify-center rounded-md"
              title="Open in isolation"
            >
              <svg siExternalLinkIcon class="size-4"></svg>
              <span class="sr-only">Open {{ title() }} demo in isolation</span>
            </a>
          }
        </div>
      }

      @if (description()) {
        <p class="text-muted-foreground text-sm">{{ description() }}</p>
      }

      <div scTabs class="w-full">
        <div scTabList selectedTab="preview">
          <button scTab value="preview">Preview</button>
          <button scTab value="code">Code</button>
        </div>

        <div
          scTabPanel
          value="preview"
          class="flex min-h-40 items-center justify-center rounded-md border p-6 *:contents"
        >
          <ng-content />
        </div>

        <div scTabPanel value="code">
          <div scCodeViewer>
            <div scCodeViewerHeader>
              <span scCodeViewerLabel>{{ language() }}</span>
              <button
                scButton
                variant="ghost"
                size="icon"
                [scCopyToClipboard]="code()"
                #copy="scCopyToClipboard"
                aria-label="Copy to clipboard"
              >
                @if (copy.copied()) {
                  <svg siCheckIcon></svg>
                } @else {
                  <svg siCopyIcon></svg>
                }
              </button>
            </div>
            <div
              scCodeViewerContent
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
  private readonly config = inject(ConfigService);

  readonly title = input<string>('');
  readonly description = input<string>('');
  readonly demoUrl = input<string>('');
  readonly code = input.required<string>();
  readonly language = input<ScCodeViewerLanguage>('angular-ts');

  protected readonly devMode = this.config.devMode;
}
