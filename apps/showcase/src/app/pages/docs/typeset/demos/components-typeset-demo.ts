import { Component, ViewEncapsulation } from '@angular/core';
import { ScButton } from '@semantic-components/ui';

/**
 * Components in the content keep their own look (they have a data-slot);
 * `not-typeset` opts anything else out.
 */
@Component({
  selector: 'app-components-typeset-demo',
  imports: [ScButton],
  template: `
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
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class ComponentsTypesetDemo {}
