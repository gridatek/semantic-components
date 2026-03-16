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
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MinimalDiffViewerDemoContainer {
  readonly code = `import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import {
  ScDiffViewer,
  ScDiffViewerContent,
  ScDiffViewerLine,
  ScDiffViewerLineContent,
  ScDiffViewerLineNumber,
  ScDiffViewerLinePlaceholder,
  ScDiffViewerLineSign,
  ScDiffViewerPane,
  ScDiffViewerSplit,
} from '@semantic-components/ui-lab';

@Component({
  selector: 'app-minimal-diff-viewer-demo',
  imports: [
    ScDiffViewer,
    ScDiffViewerContent,
    ScDiffViewerSplit,
    ScDiffViewerPane,
    ScDiffViewerLine,
    ScDiffViewerLineNumber,
    ScDiffViewerLineSign,
    ScDiffViewerLineContent,
    ScDiffViewerLinePlaceholder,
  ],
  template: \`
    <div
      scDiffViewer
      [oldText]="oldText"
      [newText]="newText"
      #diff="scDiffViewer"
    >
      <div scDiffViewerContent maxHeight="200px">
        <div scDiffViewerSplit>
          <div scDiffViewerPane side="old">
            <div class="font-mono text-sm">
              @for (line of diff.diffResult().lines; track $index) {
                @if (line.type !== 'added') {
                  <div scDiffViewerLine [type]="line.type">
                    <span scDiffViewerLineNumber>
                      {{ line.oldLineNumber || '' }}
                    </span>
                    <span scDiffViewerLineSign>
                      {{ line.type === 'removed' ? '-' : '' }}
                    </span>
                    <span
                      scDiffViewerLineContent
                      [innerHTML]="diff.highlightLine(line, 'old')"
                    ></span>
                  </div>
                } @else {
                  <div scDiffViewerLinePlaceholder></div>
                }
              }
            </div>
          </div>
          <div scDiffViewerPane side="new">
            <div class="font-mono text-sm">
              @for (line of diff.diffResult().lines; track $index) {
                @if (line.type !== 'removed') {
                  <div scDiffViewerLine [type]="line.type">
                    <span scDiffViewerLineNumber>
                      {{ line.newLineNumber || '' }}
                    </span>
                    <span scDiffViewerLineSign>
                      {{ line.type === 'added' ? '+' : '' }}
                    </span>
                    <span
                      scDiffViewerLineContent
                      [innerHTML]="diff.highlightLine(line, 'new')"
                    ></span>
                  </div>
                } @else {
                  <div scDiffViewerLinePlaceholder></div>
                }
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  \`,
  host: { class: 'flex w-full justify-center' },
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
