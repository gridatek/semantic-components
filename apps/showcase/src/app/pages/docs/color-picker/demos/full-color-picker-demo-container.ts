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
  host: { class: 'block' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FullColorPickerDemoContainer {
  readonly code = `import {
  ChangeDetectionStrategy,
  Component,
  signal,
  ViewEncapsulation,
} from '@angular/core';
import {
  ScColorPicker,
  ScColorPickerArea,
  ScColorPickerHue,
  ScColorPickerPreview,
  ScColorPickerInput,
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
        sc-color-picker
        [(value)]="color"
        class="space-y-4 rounded-lg border p-4"
      >
        <div sc-color-picker-area></div>
        <div sc-color-picker-hue></div>
        <div class="flex items-center gap-3">
          <div sc-color-picker-preview></div>
          <input sc-color-picker-input format="hex" class="flex-1" />
        </div>
      </div>
      <p class="mt-2 text-sm text-muted-foreground">Selected: {{ color() }}</p>
    </div>
  \`,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FullColorPickerDemo {
  readonly color = signal('#3b82f6');
}`;
}
