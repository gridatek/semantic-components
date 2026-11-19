import { Component, ViewEncapsulation, input } from '@angular/core';
import {
  ScCodeBlock,
  ScCodeBlockActions,
  ScCodeBlockContent,
  ScCodeBlockCopy,
} from '@semantic-components/ui/code-block';
import { SiCheckIcon, SiCopyIcon } from '@semantic-icons/lucide-icons';

/**
 * A component's anatomy, as Base UI's pages show it: what to import, then its
 * parts as markup (nested as they go together).
 */
@Component({
  selector: 'app-anatomy',
  imports: [
    ScCodeBlock,
    ScCodeBlockActions,
    ScCodeBlockContent,
    ScCodeBlockCopy,
    SiCheckIcon,
    SiCopyIcon,
  ],
  template: `
    <div scCodeBlock class="bg-muted/50 border-transparent">
      <div scCodeBlockActions class="absolute end-2 top-2 z-10">
        <button [scCodeBlockCopy]="imports()" #copyImports="scCodeBlockCopy">
          @if (copyImports.copied()) {
            <svg siCheckIcon></svg>
          } @else {
            <svg siCopyIcon></svg>
          }
          <span class="sr-only">Copy the import</span>
        </button>
      </div>
      <pre scCodeBlockContent [code]="imports()" language="typescript"></pre>
    </div>
    <div scCodeBlock class="bg-muted/50 border-transparent">
      <div scCodeBlockActions class="absolute end-2 top-2 z-10">
        <button [scCodeBlockCopy]="markup()" #copyMarkup="scCodeBlockCopy">
          @if (copyMarkup.copied()) {
            <svg siCheckIcon></svg>
          } @else {
            <svg siCopyIcon></svg>
          }
          <span class="sr-only">Copy the markup</span>
        </button>
      </div>
      <pre scCodeBlockContent [code]="markup()" language="angular-html"></pre>
    </div>
  `,
  host: { class: 'block space-y-4' },
  encapsulation: ViewEncapsulation.None,
})
export class Anatomy {
  /** The import line(s). */
  readonly imports = input.required<string>();
  /** The parts, as markup. */
  readonly markup = input.required<string>();
}
