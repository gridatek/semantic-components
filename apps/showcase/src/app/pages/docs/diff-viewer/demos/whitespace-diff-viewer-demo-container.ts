import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { WhitespaceDiffViewerDemo } from './whitespace-diff-viewer-demo';

@Component({
  selector: 'app-whitespace-diff-viewer-demo-container',
  imports: [DemoContainer, WhitespaceDiffViewerDemo],
  template: `
    <app-demo-container
      title="Ignore Whitespace"
      demoUrl="/demos/diff-viewer/whitespace-diff-viewer-demo"
      [code]="code"
    >
      <app-whitespace-diff-viewer-demo />
    </app-demo-container>
  `,
  host: { class: 'block' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WhitespaceDiffViewerDemoContainer {
  readonly code = `import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { ScDiffViewer } from '@semantic-components/ui-lab';

@Component({
  selector: 'app-whitespace-diff-viewer-demo',
  imports: [ScDiffViewer],
  template: \`
    <p class="text-sm text-muted-foreground mb-4">
      The following texts differ only in whitespace but are shown as identical.
    </p>
    <sc-diff-viewer
      [oldText]="'hello   world'"
      [newText]="'hello world'"
      [ignoreWhitespace]="true"
      [showFooter]="false"
    />
  \`,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WhitespaceDiffViewerDemo {}`;
}
