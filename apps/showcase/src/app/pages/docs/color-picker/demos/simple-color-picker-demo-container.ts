import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { SimpleColorPickerDemo } from './simple-color-picker-demo';

@Component({
  selector: 'app-simple-color-picker-demo-container',
  imports: [DemoContainer, SimpleColorPickerDemo],
  template: `
    <app-demo-container title="Simple Swatches" [code]="code">
      <app-simple-color-picker-demo />
    </app-demo-container>
  `,
  host: { class: 'block' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SimpleColorPickerDemoContainer {
  readonly code = `import {
  ChangeDetectionStrategy,
  Component,
  signal,
  ViewEncapsulation,
} from '@angular/core';
import {
  ScColorPicker,
  ScColorPickerPreview,
  ScColorPickerInput,
  ScColorPickerSwatches,
} from '@semantic-components/ui-lab';

@Component({
  selector: 'app-simple-color-picker-demo',
  imports: [
    ScColorPicker,
    ScColorPickerPreview,
    ScColorPickerInput,
    ScColorPickerSwatches,
  ],
  template: \`
    <div class="max-w-xs">
      <div
        sc-color-picker
        [(value)]="color"
        class="space-y-4 rounded-lg border p-4"
      >
        <div sc-color-picker-swatches [colors]="swatches"></div>
        <div class="flex items-center gap-3">
          <div sc-color-picker-preview></div>
          <input sc-color-picker-input format="hex" class="flex-1" />
        </div>
      </div>
    </div>
  \`,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SimpleColorPickerDemo {
  readonly color = signal('#ef4444');

  readonly swatches = [
    '#1e293b',
    '#334155',
    '#475569',
    '#64748b',
    '#dc2626',
    '#ea580c',
    '#d97706',
    '#65a30d',
    '#16a34a',
    '#0d9488',
    '#0891b2',
    '#2563eb',
    '#7c3aed',
    '#c026d3',
    '#94a3b8',
    '#cbd5e1',
  ];
}`;
}
