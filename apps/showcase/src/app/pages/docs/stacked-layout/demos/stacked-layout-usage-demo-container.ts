import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScCodeViewer,
  ScCodeViewerContent,
  ScCodeViewerHeader,
  ScCodeViewerLabel,
} from '@semantic-components/code';
import { ScButton, ScCopyToClipboard } from '@semantic-components/ui';
import { SiCheckIcon, SiCopyIcon } from '@semantic-icons/lucide-icons';

/** Code only: a page frame can't be shown inside a page (its main, its header). */
@Component({
  selector: 'app-stacked-layout-usage-demo-container',
  imports: [
    ScCodeViewer,
    ScCodeViewerHeader,
    ScCodeViewerLabel,
    ScCodeViewerContent,
    ScButton,
    ScCopyToClipboard,
    SiCheckIcon,
    SiCopyIcon,
  ],
  template: `
    <div scCodeViewer>
      <div scCodeViewerHeader>
        <span scCodeViewerLabel>angular-ts</span>
        <button
          scButton
          variant="ghost"
          size="icon"
          [scCopyToClipboard]="code"
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
      <div scCodeViewerContent [code]="code" language="angular-ts"></div>
    </div>
  `,
  host: { class: 'block w-full space-y-4' },
  encapsulation: ViewEncapsulation.None,
})
export class StackedLayoutUsageDemoContainer {
  readonly code = `import { Component, ViewEncapsulation } from '@angular/core';
import { ScStackedLayout } from '@semantic-components/ui-lab';

@Component({
  selector: 'app-stacked-layout-usage-demo',
  imports: [ScStackedLayout],
  template: \`
    <sc-stacked-layout>
      <nav scNavbar aria-label="Main">…</nav>
      <footer scFooter>…</footer>
    </sc-stacked-layout>
  \`,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class StackedLayoutUsageDemo {}`;
}
