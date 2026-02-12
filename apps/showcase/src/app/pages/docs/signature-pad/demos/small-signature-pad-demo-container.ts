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
    <div sc-signature-pad class="relative inline-block">
      <canvas sc-signature-pad-canvas [width]="300" [height]="100"></canvas>

      <div sc-signature-pad-controls>
        <button sc-signature-pad-undo>
          <svg si-undo-icon class="size-4"></svg>
        </button>
        <button sc-signature-pad-clear>
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
