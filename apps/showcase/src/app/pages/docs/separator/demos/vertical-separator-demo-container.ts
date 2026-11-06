import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { VerticalSeparatorDemo } from './vertical-separator-demo';

@Component({
  selector: 'app-vertical-separator-demo-container',
  imports: [DemoContainer, VerticalSeparatorDemo],
  template: `
    <app-demo-container
      title="Vertical"
      demoUrl="/demos/separator/vertical-separator-demo"
      [code]="code"
    >
      <app-vertical-separator-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class VerticalSeparatorDemoContainer {
  readonly code = `import { Component, ViewEncapsulation } from '@angular/core';
import { ScSeparator } from '@semantic-components/ui';

/** orientation="vertical": a line up and down, as tall as its row. */
@Component({
  selector: 'app-vertical-separator-demo',
  imports: [ScSeparator],
  template: \`
    <div class="flex h-5 items-center gap-4 text-sm">
      <div>Blog</div>
      <div scSeparator orientation="vertical"></div>
      <div>Docs</div>
      <div scSeparator orientation="vertical"></div>
      <div>Source</div>
    </div>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class VerticalSeparatorDemo {}`;
}
