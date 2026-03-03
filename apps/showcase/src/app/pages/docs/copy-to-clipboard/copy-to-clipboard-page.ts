import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import {
  ScCodeViewer,
  ScCodeViewerContent,
  ScCodeViewerHeader,
  ScCodeViewerLabel,
} from '@semantic-components/code';
import { ScButton, ScCopyToClipboard } from '@semantic-components/ui';
import { ScHeading } from '@semantic-components/ui';
import { SiCheckIcon, SiCopyIcon } from '@semantic-icons/lucide-icons';
import { ComponentBadges } from '../../../components/component-badges/component-badges';
import { TocHeading } from '../../../components/toc/toc-heading';
import { BasicCopyToClipboardDemoContainer } from './demos/basic-copy-to-clipboard-demo-container';

@Component({
  selector: 'app-copy-to-clipboard-page',
  imports: [
    ScCodeViewer,
    ScCodeViewerHeader,
    ScCodeViewerLabel,
    ScCodeViewerContent,
    ScButton,
    ScCopyToClipboard,
    SiCheckIcon,
    SiCopyIcon,
    BasicCopyToClipboardDemoContainer,
    TocHeading,
    ComponentBadges,
    ScHeading,
  ],
  template: `
    <div class="space-y-8">
      <div class="space-y-2">
        <h1 scHeading>Copy to Clipboard</h1>
        <p class="text-muted-foreground">
          A composable directive for copying text to the clipboard with visual
          feedback.
        </p>
        <app-component-badges path="copy-to-clipboard" />
      </div>

      <section class="space-y-4">
        <h2 scHeading toc>Usage</h2>
        <div scCodeViewer>
          <div scCodeViewerHeader>
            <span scCodeViewerLabel>angular-ts</span>
            <button
              scButton
              variant="ghost"
              size="icon"
              [scCopyToClipboard]="usageCode"
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
            [code]="usageCode"
            language="angular-ts"
          ></div>
        </div>
      </section>

      <section class="space-y-8">
        <h2 scHeading toc>Examples</h2>
        <app-basic-copy-to-clipboard-demo-container />
      </section>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class CopyToClipboardPage {
  readonly usageCode = `import { ScButton, ScCopyToClipboard } from '@semantic-components/ui';
import { SiCheckIcon, SiCopyIcon } from '@semantic-icons/lucide-icons';

@Component({
  imports: [ScCopyToClipboard, SiCheckIcon, SiCopyIcon],
  template: \`
    <button
      [scCopyToClipboard]="text"
      #copy="scCopyToClipboard"
    >
      @if (copy.copied()) {
        <svg siCheckIcon></svg>
        Copied
      } @else {
        <svg siCopyIcon></svg>
        Copy
      }
    </button>
  \`,
})
export class MyComponent {
  text = 'Hello, world!';
}`;
}
