import { ChangeDetectionStrategy, Component, ViewEncapsulation, input } from '@angular/core';

import { PreviewCodeTabs } from '../../../components/preview-code-tabs/preview-code-tabs';
import { DualRangeSliderDemo } from './dual-range-slider-demo';

@Component({
  selector: 'app-dual-range-slider-demo-section',
  imports: [DualRangeSliderDemo, PreviewCodeTabs],
  template: `
    <app-preview-code-tabs [code]="code" [title]="title()" [level]="level()">
      <app-dual-range-slider-demo />
    </app-preview-code-tabs>
  `,
  styles: ``,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DualRangeSliderDemoSection {
  readonly title = input<string>('');

  readonly level = input<'2' | '3'>('2');

  protected readonly code = `import { ChangeDetectionStrategy, Component, ViewEncapsulation, signal } from '@angular/core';

import { ScDualRangeSlider } from '@semantic-components/ui';

@Component({
  selector: 'app-dual-range-slider-demo',
  imports: [ScDualRangeSlider],
  template: \`
    <div class="space-y-8">
      <div class="space-y-4">
        <h3 class="text-lg font-semibold">Basic dual range slider</h3>
        <p class="text-sm text-muted-foreground">
          Select a range by dragging both thumbs.
        </p>
        <div class="space-y-4">
          <div sc-dual-range-slider [(minValue)]="minValue1" [(maxValue)]="maxValue1"></div>
          <div class="flex justify-between text-sm">
            <span>Min: <span class="font-mono">{{ minValue1() }}</span></span>
            <span>Max: <span class="font-mono">{{ maxValue1() }}</span></span>
          </div>
          <p class="text-xs text-muted-foreground">
            Range: 0-100, Step: 1
          </p>
        </div>
      </div>

      <div class="space-y-4">
        <h3 class="text-lg font-semibold">Custom range and step</h3>
        <div class="space-y-4">
          <div 
            sc-dual-range-slider 
            [(minValue)]="minValue2" 
            [(maxValue)]="maxValue2"
            [min]="-50"
            [max]="50"
            [step]="5"
            class="px-2"
          ></div>
          <div class="flex justify-between text-sm">
            <span>Min: <span class="font-mono">{{ minValue2() }}</span></span>
            <span>Max: <span class="font-mono">{{ maxValue2() }}</span></span>
          </div>
          <p class="text-xs text-muted-foreground">
            Range: -50 to 50, Step: 5
          </p>
        </div>
      </div>

      <div class="space-y-4">
        <h3 class="text-lg font-semibold">Price range selector</h3>
        <div class="space-y-4">
          <div 
            sc-dual-range-slider 
            [(minValue)]="minPrice" 
            [(maxValue)]="maxPrice"
            [min]="0"
            [max]="1000"
            [step]="10"
            class="px-4 py-2 bg-accent/20 rounded-lg"
          ></div>
          <div class="flex justify-between text-sm">
            <span class="font-medium">$<span class="font-mono">{{ minPrice() }}</span></span>
            <span class="font-medium">$<span class="font-mono">{{ maxPrice() }}</span></span>
          </div>
          <p class="text-xs text-muted-foreground">
            Price range: $0 - $1000, Step: $10
          </p>
        </div>
      </div>
    </div>
  \`,
  styles: \`\`,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DualRangeSliderDemo {
  readonly minValue1 = signal(20);
  readonly maxValue1 = signal(80);

  readonly minValue2 = signal(-20);
  readonly maxValue2 = signal(30);

  readonly minPrice = signal(100);
  readonly maxPrice = signal(500);
}`;
}
