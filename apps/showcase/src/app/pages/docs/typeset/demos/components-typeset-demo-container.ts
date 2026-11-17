import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { ComponentsTypesetDemo } from './components-typeset-demo';

@Component({
  selector: 'app-components-typeset-demo-container',
  imports: [DemoContainer, ComponentsTypesetDemo],
  template: `
    <app-demo-container
      title="Components inside"
      demoUrl="/demos/typeset/components-typeset-demo"
      [code]="code"
    >
      <app-components-typeset-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class ComponentsTypesetDemoContainer {
  private readonly code = `import { Component, ViewEncapsulation } from '@angular/core';
import { ScButton } from '@semantic-components/ui';

/**
 * Components in the content keep their own look (they have a data-slot);
 * \`not-typeset\` opts anything else out.
 */
@Component({
  selector: 'app-components-typeset-demo',
  imports: [ScButton],
  template: \`
    <article class="typeset max-w-prose">
      <p>
        A button in the text keeps its look; the paragraphs around it don't
        change it.
      </p>
      <button scButton type="button">Subscribe</button>
      <div class="not-typeset">
        <p class="text-muted-foreground text-sm">
          A note opted out with not-typeset: no paragraph spacing, your classes
          only.
        </p>
      </div>
      <p>Back in the content: the flow goes on.</p>
    </article>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class ComponentsTypesetDemo {}`;
}
