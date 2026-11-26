import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { LinksTocDemo } from './links-toc-demo';

@Component({
  selector: 'app-links-toc-demo-container',
  imports: [DemoContainer, LinksTocDemo],
  template: `
    <app-demo-container
      title="Hand-written links"
      demoUrl="/demos/toc/links-toc-demo"
      [code]="code"
    >
      <app-links-toc-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class LinksTocDemoContainer {
  private readonly code = `import { Component, ViewEncapsulation } from '@angular/core';
import { ScFrame, ScToc, ScTocLink, ScTocList } from '@semantic-components/ui';

/**
 * Links written by hand, to your sections' ids: no headings to read, so the
 * list is rendered on the server too.
 */
@Component({
  selector: 'app-links-toc-demo',
  imports: [ScFrame, ScToc, ScTocLink, ScTocList],
  template: \`
    <div
      class="grid w-full max-w-2xl grid-cols-1 gap-6 sm:grid-cols-[minmax(0,1fr)_10rem]"
    >
      <div
        tabindex="0"
        role="region"
        aria-label="Release notes"
        scFrame
        class="h-72 overflow-y-auto p-4"
      >
        <h3 id="added" class="scroll-mt-4 text-sm font-semibold">Added</h3>
        <p class="text-muted-foreground mt-2 mb-6 min-h-24 text-sm">
          A table of contents, from the headings or from your links.
        </p>
        <h3 id="changed" class="scroll-mt-4 text-sm font-semibold">Changed</h3>
        <p class="text-muted-foreground mt-2 mb-6 min-h-24 text-sm">
          The docs pages list their sections with it.
        </p>
        <h3 id="fixed" class="scroll-mt-4 text-sm font-semibold">Fixed</h3>
        <p class="text-muted-foreground mt-2 mb-6 min-h-24 text-sm">
          The last sections are marked too, scrolled to the end.
        </p>
      </div>
      <nav scToc aria-label="Release notes contents">
        <p class="mb-3 text-sm font-medium">Contents</p>
        <ul scTocList>
          <li><a scTocLink="added">Added</a></li>
          <li><a scTocLink="changed">Changed</a></li>
          <li><a scTocLink="fixed">Fixed</a></li>
        </ul>
      </nav>
    </div>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class LinksTocDemo {}`;
}
