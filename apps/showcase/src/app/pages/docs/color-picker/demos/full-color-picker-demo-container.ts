import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { FullColorPickerDemo } from './full-color-picker-demo';

@Component({
  selector: 'app-full-color-picker-demo-container',
  imports: [DemoContainer, FullColorPickerDemo],
  template: `
    <app-demo-container title="Full" [code]="code">
      <app-full-color-picker-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FullColorPickerDemoContainer {
  readonly code = `import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  signal,
} from '@angular/core';
import {
  ScColorPicker,
  ScColorPickerArea,
  ScColorPickerHue,
  ScColorPickerInput,
  ScColorPickerPreview,
} from '@semantic-components/ui-lab';

@Component({
  selector: 'app-full-color-picker-demo',
  imports: [
    ScColorPicker,
    ScColorPickerArea,
    ScColorPickerHue,
    ScColorPickerPreview,
    ScColorPickerInput,
  ],
  template: \`
    <div class="max-w-xs">
      <div
        scColorPicker
        [(value)]="color"
        class="space-y-4 rounded-lg border p-4"
      >
        <div scColorPickerArea></div>
        <div scColorPickerHue></div>
        <div class="flex items-center gap-3">
          <div scColorPickerPreview></div>
          <input scColorPickerInput format="hex" class="flex-1" />
        </div>
      </div>
      <p class="text-muted-foreground mt-2 text-sm">Selected: {{ color() }}</p>
    </div>
  \`,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FullColorPickerDemo {
  readonly color = signal('#3b82f6');
}`;
}
