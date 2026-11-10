import { Component, ViewEncapsulation } from '@angular/core';
import { UsageCode } from '../../../../components/usage-code/usage-code';
import { CodeBlockUsageDemo } from './code-block-usage-demo';

@Component({
  selector: 'app-code-block-usage-demo-container',
  imports: [UsageCode, CodeBlockUsageDemo],
  template: `
    <app-usage-code [code]="code">
      <ng-template><app-code-block-usage-demo /></ng-template>
    </app-usage-code>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class CodeBlockUsageDemoContainer {
  readonly code = `import { Component, ViewEncapsulation } from '@angular/core';
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
  SiFileCodeIcon,
} from '@semantic-icons/lucide-icons';

@Component({
  selector: 'app-code-block-usage-demo',
  imports: [
    ScCodeBlock,
    ScCodeBlockHeader,
    ScCodeBlockTitle,
    ScCodeBlockActions,
    ScCodeBlockCopy,
    ScCodeBlockContent,
    SiCheckIcon,
    SiCopyIcon,
    SiFileCodeIcon,
  ],
  template: \`
    <div scCodeBlock>
      <div scCodeBlockHeader>
        <div scCodeBlockTitle><svg siFileCodeIcon></svg>counter.ts</div>
        <div scCodeBlockActions>
          <button [scCodeBlockCopy]="source" #copy="scCodeBlockCopy">
            @if (copy.copied()) {
              <svg siCheckIcon></svg>
            } @else {
              <svg siCopyIcon></svg>
            }
            <span class="sr-only">Copy code</span>
          </button>
        </div>
      </div>
      <pre scCodeBlockContent [code]="source" language="angular-ts"></pre>
      <span aria-live="polite" class="sr-only">
        @if (copy.copied()) {
          Copied
        }
      </span>
    </div>
  \`,
  host: { class: 'block w-full max-w-md' },
  encapsulation: ViewEncapsulation.None,
})
export class CodeBlockUsageDemo {
  readonly source = \`import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-counter',
  template: \\\`<button (click)="count.set(count() + 1)">{{ count() }}</button>\\\`,
})
export class Counter {
  readonly count = signal(0);
}\`;
}`;
}
