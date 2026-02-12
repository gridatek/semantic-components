import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { FormSignaturePadDemo } from './form-signature-pad-demo';

@Component({
  selector: 'app-form-signature-pad-demo-container',
  imports: [DemoContainer, FormSignaturePadDemo],
  template: `
    <app-demo-container title="Form Integration" [code]="code">
      <app-form-signature-pad-demo />
    </app-demo-container>
  `,
  host: { class: 'block' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormSignaturePadDemoContainer {
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
  selector: 'app-form-signature-pad-demo',
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
    <div class="space-y-4">
      <div>
        <label class="block text-sm font-medium mb-1">Full Name</label>
        <input
          type="text"
          class="w-full max-w-sm px-3 py-2 border rounded-md"
          placeholder="Enter your name"
        />
      </div>
      <div>
        <label class="block text-sm font-medium mb-1">Signature</label>
        <div
          sc-signature-pad
          #pad="scSignaturePad"
          class="relative inline-block"
        >
          <canvas sc-signature-pad-canvas [width]="400" [height]="150"></canvas>

          <div sc-signature-pad-controls>
            <button sc-signature-pad-undo>
              <svg si-undo-icon class="size-4"></svg>
            </button>
            <button sc-signature-pad-clear>
              <svg si-trash-2-icon class="size-4"></svg>
            </button>
          </div>
        </div>

        @if (pad.isEmpty()) {
          <p class="text-sm text-muted-foreground mt-1">Please sign above</p>
        } @else {
          <p class="text-sm text-green-600 mt-1">Signature captured</p>
        }
      </div>
    </div>
  \`,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormSignaturePadDemo {}`;
}
