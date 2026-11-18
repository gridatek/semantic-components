import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { LevelsTocDemo } from './levels-toc-demo';

@Component({
  selector: 'app-levels-toc-demo-container',
  imports: [DemoContainer, LevelsTocDemo],
  template: `
    <app-demo-container
      title="Levels"
      demoUrl="/demos/toc/levels-toc-demo"
      [code]="code"
    >
      <app-levels-toc-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class LevelsTocDemoContainer {
  private readonly code = `import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScToc,
  ScTocHeading,
  ScTocLink,
  ScTocList,
  ScTocScope,
} from '@semantic-components/ui';

/** Headings at two levels: the deeper ones indented, by the item's depth. */
@Component({
  selector: 'app-levels-toc-demo',
  imports: [ScToc, ScTocHeading, ScTocLink, ScTocList, ScTocScope],
  template: \`
    <div
      scTocScope
      class="grid w-full max-w-2xl gap-6 sm:grid-cols-[minmax(0,1fr)_10rem]"
    >
      <div
        tabindex="0"
        role="region"
        aria-label="Guide"
        class="h-72 overflow-y-auto rounded-md border p-4"
      >
        <h3 scTocHeading class="scroll-mt-4 text-sm font-semibold">Install</h3>
        <p class="text-muted-foreground mt-2 mb-6 text-sm">
          Add the package to your app with your package manager.
        </p>
        <h4 scTocHeading class="scroll-mt-4 text-sm font-medium">npm</h4>
        <p class="text-muted-foreground mt-2 mb-6 text-sm">
          One command, then import what you use.
        </p>
        <h4 scTocHeading class="scroll-mt-4 text-sm font-medium">pnpm</h4>
        <p class="text-muted-foreground mt-2 mb-6 text-sm">
          The same package, the same imports.
        </p>
        <h3 scTocHeading class="scroll-mt-4 text-sm font-semibold">
          Configure
        </h3>
        <p class="text-muted-foreground mt-2 mb-6 text-sm">
          Choose a style and a theme for the whole app.
        </p>
        <h4 scTocHeading class="scroll-mt-4 text-sm font-medium">Presets</h4>
        <p class="text-muted-foreground mt-2 mb-6 text-sm">
          Eight styles, from the most compact to the roundest.
        </p>
        <h4 scTocHeading class="scroll-mt-4 text-sm font-medium">Themes</h4>
        <p class="text-muted-foreground mt-2 mb-6 text-sm">
          Light, dark, or the system's, with your colours.
        </p>
      </div>
      <nav scToc #toc="scToc" aria-label="Guide contents">
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
export class LevelsTocDemo {}`;
}
