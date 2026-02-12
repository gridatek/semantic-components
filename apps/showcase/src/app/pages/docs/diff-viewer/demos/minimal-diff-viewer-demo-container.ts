import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { MinimalDiffViewerDemo } from './minimal-diff-viewer-demo';

@Component({
  selector: 'app-minimal-diff-viewer-demo-container',
  imports: [DemoContainer, MinimalDiffViewerDemo],
  template: `
    <app-demo-container
      title="Minimal View"
      demoUrl="/demos/diff-viewer/minimal-diff-viewer-demo"
      [code]="code"
    >
      <app-minimal-diff-viewer-demo />
    </app-demo-container>
  `,
  host: { class: 'block' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MinimalDiffViewerDemoContainer {
  readonly code = `import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { ScDiffViewer } from '@semantic-components/ui-lab';

@Component({
  selector: 'app-minimal-diff-viewer-demo',
  imports: [ScDiffViewer],
  template: \`
    <sc-diff-viewer
      [oldText]="oldText"
      [newText]="newText"
      [showHeader]="false"
      [showFooter]="false"
      [showSideHeaders]="false"
      [maxHeight]="'200px'"
    />
  \`,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MinimalDiffViewerDemo {
  oldText = \`Line 1
Line 2
Line 3\`;

  newText = \`Line 1
Modified Line 2
Line 3
New Line 4\`;
}`;
}
