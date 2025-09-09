import { ChangeDetectionStrategy, Component, ViewEncapsulation, input } from '@angular/core';

import { PreviewCodeTabs } from '../../../components/preview-code-tabs/preview-code-tabs';
import { ColorPickerDemo } from './color-picker-demo';

@Component({
  selector: 'app-color-picker-demo-section',
  imports: [ColorPickerDemo, PreviewCodeTabs],
  template: `
    <app-preview-code-tabs [code]="code" [title]="title()" [level]="level()">
      <app-color-picker-demo />
    </app-preview-code-tabs>
  `,
  styles: ``,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ColorPickerDemoSection {
  readonly title = input<string>('');

  readonly level = input<'2' | '3'>('2');

  protected readonly code = `import { ChangeDetectionStrategy, Component, ViewEncapsulation, signal } from '@angular/core';

import { ScColorPicker } from '@semantic-components/ui';

@Component({
  selector: 'app-color-picker-demo',
  imports: [ScColorPicker],
  template: \`
    <div class="space-y-8">
      <div class="space-y-4">
        <h3 class="text-lg font-semibold">Basic color picker</h3>
        <p class="text-sm text-muted-foreground">
          Select colors using the interactive color picker interface.
        </p>
        <div class="space-y-4">
          <div sc-color-picker [(color)]="selectedColor1" class="max-w-sm"></div>
          <div class="flex items-center gap-4">
            <span class="text-sm">Selected color:</span>
            <div class="flex items-center gap-2">
              <div 
                class="w-6 h-6 border border-border rounded"
                [style.backgroundColor]="selectedColor1()"
              ></div>
              <span class="font-mono text-sm">{{ selectedColor1() }}</span>
            </div>
          </div>
        </div>
      </div>

      <div class="space-y-4">
        <h3 class="text-lg font-semibold">Custom initial color</h3>
        <p class="text-sm text-muted-foreground">
          Color picker initialized with a custom color value.
        </p>
        <div class="space-y-4">
          <div sc-color-picker [(color)]="selectedColor2" class="max-w-sm"></div>
          <div class="flex items-center gap-4">
            <span class="text-sm">Selected color:</span>
            <div class="flex items-center gap-2">
              <div 
                class="w-6 h-6 border border-border rounded"
                [style.backgroundColor]="selectedColor2()"
              ></div>
              <span class="font-mono text-sm">{{ selectedColor2() }}</span>
            </div>
          </div>
        </div>
      </div>

      <div class="space-y-4">
        <h3 class="text-lg font-semibold">Multiple color pickers</h3>
        <p class="text-sm text-muted-foreground">
          Multiple independent color picker instances.
        </p>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div class="space-y-4">
            <h4 class="font-medium">Primary Color</h4>
            <div sc-color-picker [(color)]="primaryColor" class="w-full"></div>
            <div class="flex items-center gap-2">
              <div 
                class="w-4 h-4 border border-border rounded"
                [style.backgroundColor]="primaryColor()"
              ></div>
              <span class="font-mono text-xs">{{ primaryColor() }}</span>
            </div>
          </div>
          <div class="space-y-4">
            <h4 class="font-medium">Secondary Color</h4>
            <div sc-color-picker [(color)]="secondaryColor" class="w-full"></div>
            <div class="flex items-center gap-2">
              <div 
                class="w-4 h-4 border border-border rounded"
                [style.backgroundColor]="secondaryColor()"
              ></div>
              <span class="font-mono text-xs">{{ secondaryColor() }}</span>
            </div>
          </div>
        </div>
        <div class="p-4 border rounded-lg">
          <h4 class="font-medium mb-3">Color Combination Preview</h4>
          <div class="flex gap-2">
            <div 
              class="flex-1 h-16 rounded border"
              [style.backgroundColor]="primaryColor()"
            ></div>
            <div 
              class="flex-1 h-16 rounded border"
              [style.backgroundColor]="secondaryColor()"
            ></div>
          </div>
          <div class="flex justify-between mt-2 text-xs font-mono">
            <span>{{ primaryColor() }}</span>
            <span>{{ secondaryColor() }}</span>
          </div>
        </div>
      </div>
    </div>
  \`,
  styles: \`\`,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ColorPickerDemo {
  readonly selectedColor1 = signal('#000000');
  readonly selectedColor2 = signal('#3b82f6');
  readonly primaryColor = signal('#ef4444');
  readonly secondaryColor = signal('#22c55e');
}`;
}
