import { Component, ViewEncapsulation } from '@angular/core';
import {
  type ScSignature,
  ScSignaturePad,
  type ScSignaturePoint,
} from '@semantic-components/ui';

/** A saved signature given back: read-only, drawn again at the pad's size; disabled, faded too. */
@Component({
  selector: 'app-readonly-signature-pad-demo',
  imports: [ScSignaturePad],
  template: `
    <div class="grid w-full max-w-md grid-cols-1 gap-4 sm:grid-cols-2">
      <div class="space-y-1">
        <p id="saved-readonly" class="text-muted-foreground text-sm">
          Read-only
        </p>
        <div
          scSignaturePad
          readonly
          aria-labelledby="saved-readonly"
          class="h-24"
          [value]="saved"
        ></div>
      </div>
      <div class="space-y-1">
        <p id="saved-disabled" class="text-muted-foreground text-sm">
          Disabled
        </p>
        <div
          scSignaturePad
          disabled
          aria-labelledby="saved-disabled"
          class="h-24"
          [value]="saved"
        ></div>
      </div>
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class ReadonlySignaturePadDemo {
  /** As if read back from where it was stored: loops, as handwriting, and a stroke under them. */
  private readonly saved: ScSignature = {
    width: 400,
    height: 160,
    strokes: [
      {
        color: 'currentColor',
        width: 3,
        // Loops, as handwriting: a cycloid with a lift.
        points: Array.from({ length: 140 }, (_, i): ScSignaturePoint => {
          const t = (i / 139) * Math.PI * 8;
          return [
            50 + t * 11 - Math.sin(t) * 16,
            86 - Math.cos(t) * 26 - Math.sin(t / 4) * 10,
            0.35 + Math.abs(Math.sin(t / 2)) * 0.4,
          ];
        }),
      },
      {
        color: 'currentColor',
        width: 3,
        points: Array.from({ length: 20 }, (_, i): ScSignaturePoint => [
          70 + i * 13,
          122 + Math.sin(i / 3) * 2,
          0.5,
        ]),
      },
    ],
  };
}
