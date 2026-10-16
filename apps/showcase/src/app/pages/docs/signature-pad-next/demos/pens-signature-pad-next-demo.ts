import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScSignaturePadNext,
  ScSignaturePadNextClear,
  ScSignaturePadNextColor,
  ScSignaturePadNextLine,
  ScSignaturePadNextSurface,
  ScSignaturePadNextWidth,
} from '@semantic-components/ui-lab';

/** The pen's colour and width — two-way, here picked with buttons. */
@Component({
  selector: 'app-pens-signature-pad-next-demo',
  imports: [
    ScSignaturePadNext,
    ScSignaturePadNextSurface,
    ScSignaturePadNextLine,
    ScSignaturePadNextColor,
    ScSignaturePadNextWidth,
    ScSignaturePadNextClear,
  ],
  template: `
    <div scSignaturePadNext class="w-full max-w-md space-y-2">
      <div class="flex items-center gap-1">
        <div role="group" aria-label="Colour" class="flex">
          @for (pen of colors; track pen.color) {
            <button [scSignaturePadNextColor]="pen.color">
              <span
                class="size-4 rounded-full border"
                [style.background]="pen.color"
              ></span>
              <span class="sr-only">{{ pen.name }}</span>
            </button>
          }
        </div>
        <div role="group" aria-label="Width" class="ms-2 flex">
          @for (pen of widths; track pen.width) {
            <button [scSignaturePadNextWidth]="pen.width">
              <span
                class="w-4 rounded-full bg-current"
                [style.height.px]="pen.width"
              ></span>
              <span class="sr-only">{{ pen.name }}</span>
            </button>
          }
        </div>
        <button scSignaturePadNextClear size="sm" class="ms-auto">Clear</button>
      </div>
      <div scSignaturePadNextSurface aria-label="Signature">
        <div scSignaturePadNextLine>× Sign here</div>
      </div>
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class PensSignaturePadNextDemo {
  readonly colors = [
    { color: 'currentColor', name: 'Ink' },
    { color: '#1d4ed8', name: 'Blue' },
    { color: '#b91c1c', name: 'Red' },
  ];
  readonly widths = [
    { width: 2, name: 'Thin' },
    { width: 3, name: 'Medium' },
    { width: 6, name: 'Thick' },
  ];
}
