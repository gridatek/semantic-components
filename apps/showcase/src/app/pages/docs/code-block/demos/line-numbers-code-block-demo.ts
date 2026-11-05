import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScCodeBlock,
  ScCodeBlockContent,
} from '@semantic-components/ui/code-block';

/** lineNumbers: each line numbered; the numbers are not copied. */
@Component({
  selector: 'app-line-numbers-code-block-demo',
  imports: [ScCodeBlock, ScCodeBlockContent],
  template: `
    <div scCodeBlock>
      <pre
        scCodeBlockContent
        [code]="source"
        language="angular-ts"
        lineNumbers
      ></pre>
    </div>
  `,
  host: { class: 'block w-full max-w-md' },
  encapsulation: ViewEncapsulation.None,
})
export class LineNumbersCodeBlockDemo {
  readonly source = `import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-counter',
  template: \`<button (click)="count.set(count() + 1)">{{ count() }}</button>\`,
})
export class Counter {
  readonly count = signal(0);
}`;
}
