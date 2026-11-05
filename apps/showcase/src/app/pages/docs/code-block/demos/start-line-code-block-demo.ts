import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScCodeBlock,
  ScCodeBlockContent,
  ScCodeBlockHeader,
  ScCodeBlockTitle,
} from '@semantic-components/ui/code-block';

/** startLine: an excerpt numbered from where it starts in its file. */
@Component({
  selector: 'app-start-line-code-block-demo',
  imports: [
    ScCodeBlock,
    ScCodeBlockHeader,
    ScCodeBlockTitle,
    ScCodeBlockContent,
  ],
  template: `
    <div scCodeBlock>
      <div scCodeBlockHeader>
        <div scCodeBlockTitle>cart.ts</div>
      </div>
      <pre
        scCodeBlockContent
        [code]="source"
        language="typescript"
        lineNumbers
        startLine="995"
      ></pre>
    </div>
  `,
  host: { class: 'block w-full max-w-md' },
  encapsulation: ViewEncapsulation.None,
})
export class StartLineCodeBlockDemo {
  readonly source = `  readonly total = computed(() =>
    this.items().reduce((sum, item) => sum + item.price, 0),
  );`;
}
