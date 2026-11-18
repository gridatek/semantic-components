import { Component, ViewEncapsulation } from '@angular/core';
import { UsageCode } from '../../../../components/usage-code/usage-code';

@Component({
  selector: 'app-toc-usage-demo-container',
  imports: [UsageCode],
  template: `
    <app-usage-code
      [code]="code"
      demoUrl="/demos/toc/toc-usage-demo"
      demoTitle="Table of contents"
    />
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class TocUsageDemoContainer {
  private readonly code = `import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScToc,
  ScTocHeading,
  ScTocLink,
  ScTocList,
} from '@semantic-components/ui';

@Component({
  selector: 'app-toc-usage-demo',
  imports: [ScToc, ScTocHeading, ScTocLink, ScTocList],
  template: \`
    <div class="mx-auto flex max-w-3xl gap-10 p-6">
      <article class="min-w-0 flex-1">
        @for (section of sections; track section) {
          <h2 scTocHeading class="text-lg font-semibold">{{ section }}</h2>
          <p class="text-muted-foreground mt-2 mb-8 min-h-72">
            The page's headings, listed beside it. The link of the section you
            read is marked as you scroll.
          </p>
        }
      </article>
      <nav
        scToc
        #toc="scToc"
        aria-label="On this page"
        class="sticky top-6 hidden w-40 self-start sm:block"
      >
        <p class="mb-3 text-sm font-medium">On this page</p>
        <ul scTocList>
          @for (item of toc.items(); track item.id) {
            <li>
              <a [scTocLink]="item.id" [depth]="item.depth">{{ item.text }}</a>
            </li>
          }
        </ul>
      </nav>
    </div>
  \`,
  encapsulation: ViewEncapsulation.None,
})
export class TocUsageDemo {
  private readonly sections = [
    'Introduction',
    'Installation',
    'Usage',
    'Examples',
    'API reference',
  ];
}`;
}
