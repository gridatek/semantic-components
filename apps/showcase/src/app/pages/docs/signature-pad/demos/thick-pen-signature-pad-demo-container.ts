import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { ThickPenSignaturePadDemo } from './thick-pen-signature-pad-demo';

@Component({
  selector: 'app-thick-pen-signature-pad-demo-container',
  imports: [DemoContainer, ThickPenSignaturePadDemo],
  template: `
    <app-demo-container title="Thick Pen" [code]="code">
      <app-thick-pen-signature-pad-demo />
    </app-demo-container>
  `,
  host: { class: 'block' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ThickPenSignaturePadDemoContainer {
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
  ScSignaturePadToolbar,
  ScSignaturePadWidthButton,
} from '@semantic-components/ui-lab';
import { SiUndoIcon, SiTrash2Icon } from '@semantic-icons/lucide-icons';

@Component({
  selector: 'app-thick-pen-signature-pad-demo',
  imports: [
    ScSignaturePad,
    ScSignaturePadCanvas,
    ScSignaturePadControls,
    ScSignaturePadUndoButton,
    ScSignaturePadClearButton,
    ScSignaturePadToolbar,
    ScSignaturePadWidthButton,
    SiUndoIcon,
    SiTrash2Icon,
  ],
  template: \`
    <div sc-signature-pad class="space-y-3">
      <div sc-signature-pad-toolbar>
        <button sc-signature-pad-pen-width [width]="2">
          <span
            class="w-4 rounded-full bg-foreground transition-all"
            style="height: 2px"
          ></span>
        </button>
        <button sc-signature-pad-pen-width [width]="4">
          <span
            class="w-4 rounded-full bg-foreground transition-all"
            style="height: 4px"
          ></span>
        </button>
        <button sc-signature-pad-pen-width [width]="6">
          <span
            class="w-4 rounded-full bg-foreground transition-all"
            style="height: 6px"
          ></span>
        </button>
        <button sc-signature-pad-pen-width [width]="8">
          <span
            class="w-4 rounded-full bg-foreground transition-all"
            style="height: 8px"
          ></span>
        </button>
      </div>

      <div class="relative inline-block">
        <canvas sc-signature-pad-canvas [width]="400" [height]="200"></canvas>

        <div sc-signature-pad-controls>
          <button sc-signature-pad-undo>
            <svg si-undo-icon class="size-4"></svg>
          </button>
          <button sc-signature-pad-clear>
            <svg si-trash-2-icon class="size-4"></svg>
          </button>
        </div>
      </div>
    </div>
  \`,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ThickPenSignaturePadDemo {}`;
}
