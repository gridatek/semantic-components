import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { CompactColorPickerDemo } from './compact-color-picker-demo';

@Component({
  selector: 'app-compact-color-picker-demo-container',
  imports: [DemoContainer, CompactColorPickerDemo],
  template: `
    <app-demo-container title="Compact" [code]="code">
      <app-compact-color-picker-demo />
    </app-demo-container>
  `,
  host: { class: 'block' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CompactColorPickerDemoContainer {
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
  ScColorPickerInput,
} from '@semantic-components/ui-lab';

@Component({
  selector: 'app-compact-color-picker-demo',
  imports: [
    ScColorPicker,
    ScColorPickerArea,
    ScColorPickerHue,
    ScColorPickerInput,
  ],
  template: \`
    <div class="max-w-[200px]">
      <div
        sc-color-picker
        [(value)]="color"
        class="space-y-3 rounded-lg border p-3"
      >
        <div sc-color-picker-area class="h-32"></div>
        <div sc-color-picker-hue></div>
        <input sc-color-picker-input format="hex" />
      </div>
    </div>
  \`,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CompactColorPickerDemo {
  readonly color = signal('#f97316');
}`;
}
