import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScCodeBlock,
  ScCodeBlockContent,
} from '@semantic-components/ui/code-block';

/** highlightedLines: lines (from 1) to draw the eye to. */
@Component({
  selector: 'app-highlighted-lines-code-block-demo',
  imports: [ScCodeBlock, ScCodeBlockContent],
  template: `
    <div scCodeBlock>
      <pre
        scCodeBlockContent
        [code]="source"
        language="angular-ts"
        lineNumbers
        [highlightedLines]="[5, 8]"
      ></pre>
    </div>
  `,
  host: { class: 'block w-full max-w-md' },
  encapsulation: ViewEncapsulation.None,
})
export class HighlightedLinesCodeBlockDemo {
  readonly source = `import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-counter',
  template: \`<button (click)="count.set(count() + 1)">{{ count() }}</button>\`,
})
export class Counter {
  readonly count = signal(0);
}`;
}
