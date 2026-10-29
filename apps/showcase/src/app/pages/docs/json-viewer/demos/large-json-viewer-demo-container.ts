import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { LargeJsonViewerDemo } from './large-json-viewer-demo';

@Component({
  selector: 'app-large-json-viewer-demo-container',
  imports: [DemoContainer, LargeJsonViewerDemo],
  template: `
    <app-demo-container
      title="Large Array"
      demoUrl="/demos/json-viewer/large-json-viewer-demo"
      [code]="code"
    >
      <app-large-json-viewer-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class LargeJsonViewerDemoContainer {
  readonly code = `import { Component, ViewEncapsulation } from '@angular/core';
import { ScJsonViewer } from '@semantic-components/ui';

@Component({
  selector: 'app-large-json-viewer-demo',
  imports: [ScJsonViewer],
  template: \`
    <ul
      scJsonViewer
      aria-label="Readings"
      rootName="readings"
      class="max-h-80 overflow-auto"
      [data]="readings"
    ></ul>
  \`,
  host: { class: 'block w-full max-w-md' },
  encapsulation: ViewEncapsulation.None,
})
export class LargeJsonViewerDemo {
  /** 1,000 items: split into ranges of 100, drawn when opened. */
  readonly readings = Array.from({ length: 1000 }, (_, index) => ({
    index,
    value: Math.round(Math.sin(index / 10) * 1000) / 1000,
  }));
}`;
}
