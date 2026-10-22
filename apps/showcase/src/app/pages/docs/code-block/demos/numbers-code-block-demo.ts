import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScCodeBlock,
  ScCodeBlockContent,
  ScCodeBlockHeader,
  ScCodeBlockTitle,
} from '@semantic-components/code';

/** lineNumbers, from startLine; highlightedLines marks lines by number. */
@Component({
  selector: 'app-numbers-code-block-demo',
  imports: [
    ScCodeBlock,
    ScCodeBlockHeader,
    ScCodeBlockTitle,
    ScCodeBlockContent,
  ],
  template: `
    <div scCodeBlock>
      <div scCodeBlockHeader>
        <div scCodeBlockTitle>counter.ts</div>
      </div>
      <pre
        scCodeBlockContent
        lineNumbers
        [startLine]="12"
        [highlightedLines]="[7, 8]"
        [code]="source"
        language="angular-ts"
      ></pre>
    </div>
  `,
  host: { class: 'block w-full max-w-xl' },
  encapsulation: ViewEncapsulation.None,
})
export class NumbersCodeBlockDemo {
  readonly source = `import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-counter',
  template: \`<button (click)="count.set(count() + 1)">{{ count() }}</button>\`,
})
export class Counter {
  readonly count = signal(0);
}`;
}
