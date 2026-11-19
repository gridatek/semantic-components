import { Component, ViewEncapsulation, computed, input } from '@angular/core';
import {
  ScCodeBlock,
  ScCodeBlockActions,
  ScCodeBlockContent,
  ScCodeBlockCopy,
} from '@semantic-components/ui/code-block';
import { SiCheckIcon, SiCopyIcon } from '@semantic-icons/lucide-icons';
import { cn } from 'cn';

/**
 * A code sample in a docs page, as shadcn's docs show them: a soft
 * background, no border or label, the copy button in the corner.
 */
@Component({
  selector: 'app-doc-code',
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
        <button [scCodeBlockCopy]="code()" #copy="scCodeBlockCopy">
          @if (copy.copied()) {
            <svg siCheckIcon></svg>
          } @else {
            <svg siCopyIcon></svg>
          }
          <span class="sr-only">Copy to clipboard</span>
        </button>
      </div>
      <pre scCodeBlockContent [code]="code()" [language]="language()"></pre>
    </div>
  `,
  host: { '[class]': 'class()' },
  encapsulation: ViewEncapsulation.None,
})
export class DocCode {
  readonly classInput = input<string>('', { alias: 'class' });
  readonly code = input.required<string>();
  readonly language = input('typescript');

  private readonly class = computed(() => cn('block', this.classInput()));
}
