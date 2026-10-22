import { Component, ViewEncapsulation } from '@angular/core';
import { ScCodeBlock, ScCodeBlockContent } from '@semantic-components/code';

/** wrap: long lines break instead of scrolling. */
@Component({
  selector: 'app-wrap-code-block-demo',
  imports: [ScCodeBlock, ScCodeBlockContent],
  template: `
    <div scCodeBlock>
      <pre scCodeBlockContent wrap [code]="source" language="bash"></pre>
    </div>
  `,
  host: { class: 'block w-full max-w-xl' },
  encapsulation: ViewEncapsulation.None,
})
export class WrapCodeBlockDemo {
  readonly source = `npm install @semantic-components/ui @semantic-components/code @angular/cdk class-variance-authority clsx tailwind-merge tw-animate-css shiki`;
}
