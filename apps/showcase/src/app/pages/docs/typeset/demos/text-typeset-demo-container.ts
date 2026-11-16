import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { TextTypesetDemo } from './text-typeset-demo';

@Component({
  selector: 'app-text-typeset-demo-container',
  imports: [DemoContainer, TextTypesetDemo],
  template: `
    <app-demo-container
      title="Text"
      demoUrl="/demos/typeset/text-typeset-demo"
      [code]="code"
    >
      <app-text-typeset-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class TextTypesetDemoContainer {
  readonly code = `import { Component, ViewEncapsulation } from '@angular/core';
import { ScTypeset } from '@semantic-components/ui';

/** Typeset's text without a container: each element marks itself. */
@Component({
  selector: 'app-text-typeset-demo',
  imports: [ScTypeset],
  template: \`
    <article class="max-w-prose">
      <h2 scTypeset>The People of the Kingdom</h2>
      <p scTypeset>
        The king thought long and hard, and finally came up with
        <code scTypeset>a brilliant plan</code>: he would tax the jokes in the
        kingdom.
      </p>
      <blockquote scTypeset>
        “After all,” he said, “everyone enjoys a good joke, so it’s only fair
        that they should pay for the privilege.”
      </blockquote>
      <hr scTypeset />
      <p scTypeset>
        The people stopped telling jokes, and the kingdom fell into a gloom.
      </p>
    </article>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class TextTypesetDemo {}`;
}
