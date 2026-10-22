import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { WrapCodeBlockDemo } from './wrap-code-block-demo';

@Component({
  selector: 'app-wrap-code-block-demo-container',
  imports: [DemoContainer, WrapCodeBlockDemo],
  template: `
    <app-demo-container
      title="Wrap"
      [code]="code"
      demoUrl="/demos/code-block/wrap-code-block-demo"
    >
      <app-wrap-code-block-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class WrapCodeBlockDemoContainer {
  readonly code = `import { Component, ViewEncapsulation } from '@angular/core';
import { ScCodeBlock, ScCodeBlockContent } from '@semantic-components/code';

/** wrap: long lines break instead of scrolling. */
@Component({
  selector: 'app-wrap-code-block-demo',
  imports: [ScCodeBlock, ScCodeBlockContent],
  template: \`
    <div scCodeBlock>
      <pre scCodeBlockContent wrap [code]="source" language="bash"></pre>
    </div>
  \`,
  host: { class: 'block w-full max-w-xl' },
  encapsulation: ViewEncapsulation.None,
})
export class WrapCodeBlockDemo {
  readonly source = \`npm install @semantic-components/ui @semantic-components/code @angular/cdk class-variance-authority clsx tailwind-merge tw-animate-css shiki\`;
}`;
}
