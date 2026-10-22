import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScCodeBlock,
  ScCodeBlockContent,
  ScCodeBlockFooter,
  ScCodeBlockHeader,
  ScCodeBlockTitle,
} from '@semantic-components/code';
import { SiCircleAlertIcon } from '@semantic-icons/lucide-icons';

/** variant="destructive": an error’s output, with a footer under it. */
@Component({
  selector: 'app-error-code-block-demo',
  imports: [
    ScCodeBlock,
    ScCodeBlockHeader,
    ScCodeBlockTitle,
    ScCodeBlockContent,
    ScCodeBlockFooter,
    SiCircleAlertIcon,
  ],
  template: `
    <div scCodeBlock variant="destructive">
      <div scCodeBlockHeader>
        <div scCodeBlockTitle><svg siCircleAlertIcon></svg>Build failed</div>
      </div>
      <pre scCodeBlockContent [code]="source"></pre>
      <div scCodeBlockFooter class="text-xs">Exit code 1</div>
    </div>
  `,
  host: { class: 'block w-full max-w-xl' },
  encapsulation: ViewEncapsulation.None,
})
export class ErrorCodeBlockDemo {
  readonly source = `✘ [ERROR] TS2322: Type 'string' is not assignable to type 'number'.
    src/app/counter.ts:9:12`;
}
