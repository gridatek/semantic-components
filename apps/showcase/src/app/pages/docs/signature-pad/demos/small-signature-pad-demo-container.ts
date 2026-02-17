import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { SmallSignaturePadDemo } from './small-signature-pad-demo';

@Component({
  selector: 'app-small-signature-pad-demo-container',
  imports: [DemoContainer, SmallSignaturePadDemo],
  template: `
    <app-demo-container title="Small Size" [code]="code">
      <app-small-signature-pad-demo />
    </app-demo-container>
  `,
  host: { class: 'block' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SmallSignaturePadDemoContainer {
  readonly code = `import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import {
  ScSignaturePad,
  ScSignaturePadCanvas,
  ScSignaturePadControls,
  ScSignaturePadUndoButton,
  ScSignaturePadClearButton,
} from '@semantic-components/ui-lab';
import { SiUndoIcon, SiTrash2Icon } from '@semantic-icons/lucide-icons';

@Component({
  selector: 'app-small-signature-pad-demo',
  imports: [
    ScSignaturePad,
    ScSignaturePadCanvas,
    ScSignaturePadControls,
    ScSignaturePadUndoButton,
    ScSignaturePadClearButton,
    SiUndoIcon,
    SiTrash2Icon,
  ],
  template: \`
    <div scSignaturePad class="relative inline-block">
      <canvas scSignaturePadCanvas [width]="300" [height]="100"></canvas>

      <div scSignaturePadControls>
        <button scSignaturePadUndo>
          <svg si-undo-icon class="size-4"></svg>
        </button>
        <button scSignaturePadClear>
          <svg si-trash-2-icon class="size-4"></svg>
        </button>
      </div>
    </div>
  \`,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SmallSignaturePadDemo {}`;
}
