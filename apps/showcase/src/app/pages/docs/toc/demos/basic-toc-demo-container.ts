import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { BasicTocDemo } from './basic-toc-demo';

@Component({
  selector: 'app-basic-toc-demo-container',
  imports: [DemoContainer, BasicTocDemo],
  template: `
    <app-demo-container
      title="Basic"
      demoUrl="/demos/toc/basic-toc-demo"
      [code]="code"
    >
      <app-basic-toc-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class BasicTocDemoContainer {
  readonly code = `import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScToc,
  ScTocHeading,
  ScTocLink,
  ScTocList,
  ScTocScope,
} from '@semantic-components/ui';

/**
 * Listed from the headings, their ids from their text; the link of the section
 * read marked as the box scrolls. In a scope: kept apart from the page's.
 */
@Component({
  selector: 'app-basic-toc-demo',
  imports: [ScToc, ScTocHeading, ScTocLink, ScTocList, ScTocScope],
  template: \`
    <div
      scTocScope
      class="grid w-full max-w-2xl gap-6 sm:grid-cols-[minmax(0,1fr)_10rem]"
    >
      <div
        tabindex="0"
        role="region"
        aria-label="Article"
        class="h-72 overflow-y-auto rounded-md border p-4"
      >
        @for (section of sections; track section.title) {
          <h3 scTocHeading class="scroll-mt-4 text-sm font-semibold">
            {{ section.title }}
          </h3>
          <p class="text-muted-foreground mt-2 mb-6 text-sm">
            {{ section.text }}
          </p>
        }
      </div>
      <nav scToc #toc="scToc" aria-label="Article contents">
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
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class BasicTocDemo {
  protected readonly sections = [
    {
      title: 'Getting started',
      text: 'Install the package, then import the parts you need. Every part is a directive on your own element: the markup and the text stay yours.',
    },
    {
      title: 'Headings',
      text: 'Mark the headings to list. Each gets an id from its text, unique on the page, unless it has one of its own.',
    },
    {
      title: 'Links',
      text: 'The links go to the sections: their address is this page at the section, so a new tab or a copied link opens there too.',
    },
    {
      title: 'Scrolling',
      text: 'As the box scrolls, the link of the section read is marked: the last heading to reach the top, or the last one at the end.',
    },
    {
      title: 'Focus',
      text: 'A link followed moves the focus to its heading, for the keyboard and screen readers: the next Tab goes on from there.',
    },
  ];
}`;
}
