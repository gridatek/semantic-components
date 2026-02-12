import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import {
  ScSignaturePad,
  ScSignaturePadCanvas,
} from '@semantic-components/ui-lab';

@Component({
  selector: 'app-no-controls-signature-pad-demo',
  imports: [ScSignaturePad, ScSignaturePadCanvas],
  template: `
    <div class="space-y-3">
      <div sc-signature-pad #pad="scSignaturePad" class="relative inline-block">
        <canvas sc-signature-pad-canvas [width]="400" [height]="150"></canvas>
      </div>

      <div class="flex gap-2">
        <button
          (click)="pad.undo()"
          class="px-3 py-1.5 text-sm border rounded-md hover:bg-accent"
        >
          Undo
        </button>
        <button
          (click)="pad.clear()"
          class="px-3 py-1.5 text-sm border rounded-md hover:bg-accent"
        >
          Clear
        </button>
      </div>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NoControlsSignaturePadDemo {}
