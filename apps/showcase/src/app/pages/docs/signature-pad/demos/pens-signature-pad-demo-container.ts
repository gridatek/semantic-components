import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { PensSignaturePadDemo } from './pens-signature-pad-demo';

@Component({
  selector: 'app-pens-signature-pad-demo-container',
  imports: [DemoContainer, PensSignaturePadDemo],
  template: `
    <app-demo-container
      title="Pens"
      [code]="code"
      demoUrl="/demos/signature-pad/pens-signature-pad-demo"
    >
      <app-pens-signature-pad-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class PensSignaturePadDemoContainer {
  readonly code = `import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScSignaturePad,
  ScSignaturePadClear,
  ScSignaturePadColor,
  ScSignaturePadLine,
  ScSignaturePadSurface,
  ScSignaturePadWidth,
} from '@semantic-components/ui';

/** The pen's colour and width — two-way, here picked with buttons. */
@Component({
  selector: 'app-pens-signature-pad-demo',
  imports: [
    ScSignaturePad,
    ScSignaturePadSurface,
    ScSignaturePadLine,
    ScSignaturePadColor,
    ScSignaturePadWidth,
    ScSignaturePadClear,
  ],
  template: \`
    <div scSignaturePad class="w-full max-w-md space-y-2">
      <div class="flex items-center gap-1">
        <div role="group" aria-label="Colour" class="flex">
          @for (pen of colors; track pen.color) {
            <button [scSignaturePadColor]="pen.color">
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
            <button [scSignaturePadWidth]="pen.width">
              <span
                class="w-4 rounded-full bg-current"
                [style.height.px]="pen.width"
              ></span>
              <span class="sr-only">{{ pen.name }}</span>
            </button>
          }
        </div>
        <button scSignaturePadClear size="sm" class="ms-auto">Clear</button>
      </div>
      <div scSignaturePadSurface aria-label="Signature">
        <div scSignaturePadLine>× Sign here</div>
      </div>
    </div>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class PensSignaturePadDemo {
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
}`;
}
