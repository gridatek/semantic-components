import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScCodeBlock,
  ScCodeBlockContent,
  ScCodeBlockHeader,
  ScCodeBlockTitle,
} from '@semantic-components/code';
import { SiFileDiffIcon } from '@semantic-icons/lucide-icons';

/** addedLines and removedLines: a + or − at the start of the line, a tint across it. */
@Component({
  selector: 'app-changes-code-block-demo',
  imports: [
    ScCodeBlock,
    ScCodeBlockHeader,
    ScCodeBlockTitle,
    ScCodeBlockContent,
    SiFileDiffIcon,
  ],
  template: `
    <div scCodeBlock>
      <div scCodeBlockHeader>
        <div scCodeBlockTitle><svg siFileDiffIcon></svg>styles.css</div>
      </div>
      <pre
        scCodeBlockContent
        [addedLines]="[3]"
        [removedLines]="[2]"
        [code]="source"
        language="css"
      ></pre>
    </div>
  `,
  host: { class: 'block w-full max-w-xl' },
  encapsulation: ViewEncapsulation.None,
})
export class ChangesCodeBlockDemo {
  readonly source = `:root {
  --radius: 0.5rem;
  --radius: 0.625rem;
}`;
}
