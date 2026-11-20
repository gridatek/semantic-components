import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { PenSignaturePadNextDemo } from './pen-signature-pad-next-demo';

@Component({
  selector: 'app-pen-signature-pad-next-demo-container',
  imports: [DemoContainer, PenSignaturePadNextDemo],
  template: `
    <app-demo-container
      title="Pen"
      [code]="code"
      demoUrl="/demos/signature-pad-next/pen-signature-pad-next-demo"
    >
      <app-pen-signature-pad-next-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class PenSignaturePadNextDemoContainer {
  private readonly code = `import { Component, ViewEncapsulation, computed, signal } from '@angular/core';
import {
  ScButton,
  ScSignaturePadNext,
  ScToggleGroup,
  ScToggleGroupItem,
} from '@semantic-components/ui';

/** The pen from your own controls: \`penColor\` and \`penWidth\` bound to toggle groups. Each stroke keeps its own. */
@Component({
  selector: 'app-pen-signature-pad-next-demo',
  imports: [ScButton, ScSignaturePadNext, ScToggleGroup, ScToggleGroupItem],
  template: \`
    <div class="w-full max-w-md space-y-2">
      <div class="flex flex-wrap items-center gap-2">
        <div
          scToggleGroup
          variant="outline"
          size="sm"
          aria-label="Colour"
          [(value)]="color"
        >
          @for (pen of colors; track pen.value) {
            <button scToggleGroupItem [value]="pen.value">
              <span
                class="size-3 rounded-full"
                [style.background]="pen.swatch"
              ></span>
              <span class="sr-only">{{ pen.name }}</span>
            </button>
          }
        </div>
        <div
          scToggleGroup
          variant="outline"
          size="sm"
          aria-label="Width"
          [(value)]="width"
        >
          <button scToggleGroupItem value="2">Fine</button>
          <button scToggleGroupItem value="3">Medium</button>
          <button scToggleGroupItem value="5">Bold</button>
        </div>
        <button
          scButton
          variant="outline"
          size="sm"
          class="ms-auto"
          [disabled]="pad.empty()"
          (click)="pad.clear()"
        >
          Clear
        </button>
      </div>
      <div
        scSignaturePadNext
        #pad="scSignaturePadNext"
        aria-label="Signature"
        [penColor]="penColor()"
        [penWidth]="penWidth()"
      ></div>
    </div>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class PenSignaturePadNextDemo {
  private readonly colors = [
    { name: 'Ink', value: 'currentColor', swatch: 'currentColor' },
    { name: 'Blue', value: '#1d4ed8', swatch: '#1d4ed8' },
    { name: 'Red', value: '#b91c1c', swatch: '#b91c1c' },
  ];

  private readonly color = signal(['currentColor']);
  private readonly width = signal(['3']);

  private readonly penColor = computed(() => this.color()[0] ?? 'currentColor');
  private readonly penWidth = computed(() => Number(this.width()[0] ?? 3));
}`;
}
