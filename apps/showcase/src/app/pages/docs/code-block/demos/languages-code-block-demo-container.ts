import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { LanguagesCodeBlockDemo } from './languages-code-block-demo';

@Component({
  selector: 'app-languages-code-block-demo-container',
  imports: [DemoContainer, LanguagesCodeBlockDemo],
  template: `
    <app-demo-container
      title="Languages"
      demoUrl="/demos/code-block/languages-code-block-demo"
      [code]="code"
    >
      <app-languages-code-block-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class LanguagesCodeBlockDemoContainer {
  readonly code = `import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScCodeBlock,
  ScCodeBlockContent,
  ScCodeBlockHeader,
  ScCodeBlockTitle,
} from '@semantic-components/ui/code-block';

/** language: each block highlighted in its own (loaded the first time it is used). */
@Component({
  selector: 'app-languages-code-block-demo',
  imports: [
    ScCodeBlock,
    ScCodeBlockHeader,
    ScCodeBlockTitle,
    ScCodeBlockContent,
  ],
  template: \`
    <div class="flex flex-col gap-4">
      <div scCodeBlock>
        <div scCodeBlockHeader>
          <div scCodeBlockTitle>styles.css</div>
        </div>
        <pre scCodeBlockContent [code]="css" language="css"></pre>
      </div>
      <div scCodeBlock>
        <div scCodeBlockHeader>
          <div scCodeBlockTitle>package.json</div>
        </div>
        <pre scCodeBlockContent [code]="json" language="json"></pre>
      </div>
      <div scCodeBlock>
        <div scCodeBlockHeader>
          <div scCodeBlockTitle>greet.py</div>
        </div>
        <pre scCodeBlockContent [code]="python" language="python"></pre>
      </div>
    </div>
  \`,
  host: { class: 'block w-full max-w-md' },
  encapsulation: ViewEncapsulation.None,
})
export class LanguagesCodeBlockDemo {
  readonly css = \`.button {
  padding: 0.5rem 1rem;
  border-radius: var(--radius);
}\`;
  readonly json = \`{
  "name": "my-app",
  "private": true
}\`;
  readonly python = \`def greet(name: str) -> str:
    return f"Hello, {name}!"\`;
}`;
}
