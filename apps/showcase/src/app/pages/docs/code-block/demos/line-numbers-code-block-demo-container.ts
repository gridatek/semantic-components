import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { LineNumbersCodeBlockDemo } from './line-numbers-code-block-demo';

@Component({
  selector: 'app-line-numbers-code-block-demo-container',
  imports: [DemoContainer, LineNumbersCodeBlockDemo],
  template: `
    <app-demo-container
      title="Line Numbers"
      demoUrl="/demos/code-block/line-numbers-code-block-demo"
      [code]="code"
    >
      <app-line-numbers-code-block-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class LineNumbersCodeBlockDemoContainer {
  readonly code = `import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScCodeBlock,
  ScCodeBlockContent,
} from '@semantic-components/ui/code-block';

/** lineNumbers: each line numbered; the numbers are not copied. */
@Component({
  selector: 'app-line-numbers-code-block-demo',
  imports: [ScCodeBlock, ScCodeBlockContent],
  template: \`
    <div scCodeBlock>
      <pre
        scCodeBlockContent
        [code]="source"
        language="angular-ts"
        lineNumbers
      ></pre>
    </div>
  \`,
  host: { class: 'block w-full max-w-md' },
  encapsulation: ViewEncapsulation.None,
})
export class LineNumbersCodeBlockDemo {
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
