import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScCodeBlock,
  ScCodeBlockContent,
} from '@semantic-components/ui/code-block';

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
  readonly source = `npm install @semantic-components/ui @angular/cdk class-variance-authority clsx tailwind-merge tw-animate-css shiki`;
}
