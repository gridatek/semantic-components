import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { BasicCodeBlockDemo } from './basic-code-block-demo';

@Component({
  selector: 'app-basic-code-block-demo-container',
  imports: [DemoContainer, BasicCodeBlockDemo],
  template: `
    <app-demo-container
      title="Basic"
      demoUrl="/demos/code-block/basic-code-block-demo"
      [code]="code"
    >
      <app-basic-code-block-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class BasicCodeBlockDemoContainer {
  readonly code = `import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScCodeBlock,
  ScCodeBlockContent,
} from '@semantic-components/ui/code-block';

/** Only the code: plain, no language. */
@Component({
  selector: 'app-basic-code-block-demo',
  imports: [ScCodeBlock, ScCodeBlockContent],
  template: \`
    <div scCodeBlock>
      <pre scCodeBlockContent [code]="output"></pre>
    </div>
  \`,
  host: { class: 'block w-full max-w-md' },
  encapsulation: ViewEncapsulation.None,
})
export class BasicCodeBlockDemo {
  readonly output = \`$ pnpm build
> next build

✓ Compiled successfully in 4.2s
✓ Linting and checking validity of types
✓ Generating static pages (12/12)\`;
}`;
}
