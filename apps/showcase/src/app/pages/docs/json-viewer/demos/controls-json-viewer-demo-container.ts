import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { ControlsJsonViewerDemo } from './controls-json-viewer-demo';

@Component({
  selector: 'app-controls-json-viewer-demo-container',
  imports: [DemoContainer, ControlsJsonViewerDemo],
  template: `
    <app-demo-container
      title="Expand, Collapse and Copy"
      demoUrl="/demos/json-viewer/controls-json-viewer-demo"
      [code]="code"
    >
      <app-controls-json-viewer-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class ControlsJsonViewerDemoContainer {
  private readonly code = `import { Component, ViewEncapsulation } from '@angular/core';
import { ScButton, ScFrame, ScJsonViewer } from '@semantic-components/ui';

@Component({
  selector: 'app-controls-json-viewer-demo',
  imports: [ScFrame, ScButton, ScJsonViewer],
  template: \`
    <div class="flex flex-wrap gap-2">
      <button
        scButton
        variant="outline"
        size="sm"
        type="button"
        (click)="viewer.expandAll()"
      >
        Expand all
      </button>
      <button
        scButton
        variant="outline"
        size="sm"
        type="button"
        (click)="viewer.collapseAll()"
      >
        Collapse all
      </button>
    </div>
    <ul
      scJsonViewer
      #viewer="scJsonViewer"
      aria-label="Package"
      sortKeys
      [expandDepth]="2"
      [maxStringLength]="40"
      [data]="pkg"
    ></ul>
    <p scFrame class="bg-muted p-4 font-mono text-sm" aria-live="polite">
      Focused: {{ viewer.focusedPath() ?? '—' }}
    </p>
  \`,
  host: { class: 'flex w-full max-w-md flex-col gap-4' },
  encapsulation: ViewEncapsulation.None,
})
export class ControlsJsonViewerDemo {
  private readonly pkg = {
    name: '@semantic-components/ui',
    version: '0.0.0',
    description:
      'Accessible Angular components, built on Angular Aria and styled with Tailwind.',
    scripts: { test: 'vitest', lint: 'eslint .' },
    peerDependencies: {
      '@angular/core': '>=22.0.0',
      '@angular/aria': '>=22.0.0',
    },
    keywords: ['angular', 'components', 'a11y'],
  };
}`;
}
