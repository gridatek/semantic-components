import { Dir } from '@angular/cdk/bidi';
import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScCodeBlock,
  ScCodeBlockActions,
  ScCodeBlockContent,
  ScCodeBlockCopy,
  ScCodeBlockHeader,
  ScCodeBlockTitle,
} from '@semantic-components/ui/code-block';
import {
  SiCheckIcon,
  SiCopyIcon,
  SiTerminalIcon,
} from '@semantic-icons/lucide-icons';

/** Right to left: the header from the right, its actions on the left; the code stays left to right. */
@Component({
  selector: 'app-rtl-code-block-demo',
  imports: [
    Dir,
    ScCodeBlock,
    ScCodeBlockHeader,
    ScCodeBlockTitle,
    ScCodeBlockActions,
    ScCodeBlockCopy,
    ScCodeBlockContent,
    SiCheckIcon,
    SiCopyIcon,
    SiTerminalIcon,
  ],
  template: `
    <div dir="rtl" lang="ar" class="flex flex-col gap-3 text-sm">
      <p>ثبّت المكتبة، ثم هيّئ مشروعك:</p>
      <div scCodeBlock>
        <div scCodeBlockHeader>
          <div scCodeBlockTitle><svg siTerminalIcon></svg>الطرفية</div>
          <div scCodeBlockActions>
            <button [scCodeBlockCopy]="source" #copy="scCodeBlockCopy">
              @if (copy.copied()) {
                <svg siCheckIcon></svg>
              } @else {
                <svg siCopyIcon></svg>
              }
              <span class="sr-only">نسخ الأوامر</span>
            </button>
          </div>
        </div>
        <pre
          scCodeBlockContent
          [code]="source"
          language="bash"
          lineNumbers
        ></pre>
        <span aria-live="polite" class="sr-only">
          @if (copy.copied()) {
            تم النسخ
          }
        </span>
      </div>
    </div>
  `,
  host: { class: 'block w-full max-w-md' },
  encapsulation: ViewEncapsulation.None,
})
export class RtlCodeBlockDemo {
  readonly source = `pnpm add @semantic-components/ui
pnpm dlx semantic-components init`;
}
