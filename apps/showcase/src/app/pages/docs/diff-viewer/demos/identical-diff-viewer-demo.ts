import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { ScDiffViewer } from '@semantic-components/ui-lab';

@Component({
  selector: 'app-identical-diff-viewer-demo',
  imports: [ScDiffViewer],
  template: `
    <sc-diff-viewer
      [oldText]="'const x = 1;
const y = 2;'"
      [newText]="'const x = 1;
const y = 2;'"
      [oldTitle]="'file.ts'"
      [newTitle]="'file.ts'"
    />
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IdenticalDiffViewerDemo {}
