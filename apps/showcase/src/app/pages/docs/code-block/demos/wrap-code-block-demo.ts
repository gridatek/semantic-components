import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScCodeBlock,
  ScCodeBlockContent,
} from '@semantic-components/ui/code-block';

/** wrap: long lines wrap instead of scrolling. */
@Component({
  selector: 'app-wrap-code-block-demo',
  imports: [ScCodeBlock, ScCodeBlockContent],
  template: `
    <div scCodeBlock>
      <pre scCodeBlockContent [code]="source" language="bash" wrap></pre>
    </div>
  `,
  host: { class: 'block w-full max-w-md' },
  encapsulation: ViewEncapsulation.None,
})
export class WrapCodeBlockDemo {
  readonly source = `npx create-semantic-app my-application --template dashboard --style nova --package-manager pnpm --no-git --skip-install`;
}
