import { ChangeDetectionStrategy, Component, ViewEncapsulation, signal } from '@angular/core';

import { ScDualRangeSlider } from '@semantic-components/ui';

@Component({
  selector: 'app-dual-range-slider-demo',
  imports: [ScDualRangeSlider],
  template: `
    <div class="space-y-8">
      <div class="space-y-4">
        <h3 class="text-lg font-semibold">Basic dual range slider</h3>
        <p class="text-sm text-muted-foreground">Select a range by dragging both thumbs.</p>
        <div class="space-y-4">
          <div [(minValue)]="minValue1" [(maxValue)]="maxValue1" sc-dual-range-slider></div>
          <div class="flex justify-between text-sm">
            <span>
              Min:
              <span class="font-mono">{{ minValue1() }}</span>
            </span>
            <span>
              Max:
              <span class="font-mono">{{ maxValue1() }}</span>
            </span>
          </div>
          <p class="text-xs text-muted-foreground">Range: 0-100, Step: 1</p>
        </div>
      </div>

      <div class="space-y-4">
        <h3 class="text-lg font-semibold">Custom range and step</h3>
        <div class="space-y-4">
          <div
            class="px-2"
            [(minValue)]="minValue2"
            [(maxValue)]="maxValue2"
            [min]="-50"
            [max]="50"
            [step]="5"
            sc-dual-range-slider
          ></div>
          <div class="flex justify-between text-sm">
            <span>
              Min:
              <span class="font-mono">{{ minValue2() }}</span>
            </span>
            <span>
              Max:
              <span class="font-mono">{{ maxValue2() }}</span>
            </span>
          </div>
          <p class="text-xs text-muted-foreground">Range: -50 to 50, Step: 5</p>
        </div>
      </div>

      <div class="space-y-4">
        <h3 class="text-lg font-semibold">Price range selector</h3>
        <div class="space-y-4">
          <div
            class="px-4 py-2 bg-accent/20 rounded-lg"
            [(minValue)]="minPrice"
            [(maxValue)]="maxPrice"
            [min]="0"
            [max]="1000"
            [step]="10"
            sc-dual-range-slider
          ></div>
          <div class="flex justify-between text-sm">
            <span class="font-medium">
              $
              <span class="font-mono">{{ minPrice() }}</span>
            </span>
            <span class="font-medium">
              $
              <span class="font-mono">{{ maxPrice() }}</span>
            </span>
          </div>
          <p class="text-xs text-muted-foreground">Price range: $0 - $1000, Step: $10</p>
        </div>
      </div>

      <div class="space-y-4">
        <h3 class="text-lg font-semibold">Decimal precision</h3>
        <div class="space-y-4">
          <div
            class="px-2"
            [(minValue)]="minDecimal"
            [(maxValue)]="maxDecimal"
            [min]="0"
            [max]="10"
            [step]="0.1"
            sc-dual-range-slider
          ></div>
          <div class="flex justify-between text-sm">
            <span>
              Min:
              <span class="font-mono">{{ minDecimal().toFixed(1) }}</span>
            </span>
            <span>
              Max:
              <span class="font-mono">{{ maxDecimal().toFixed(1) }}</span>
            </span>
          </div>
          <p class="text-xs text-muted-foreground">Range: 0-10, Step: 0.1 (decimal precision)</p>
        </div>
      </div>

      <div class="space-y-4">
        <h3 class="text-lg font-semibold">Custom styling</h3>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div class="space-y-3">
            <h4 class="text-sm font-medium">Compact</h4>
            <div
              class="py-2"
              [(minValue)]="minCompact"
              [(maxValue)]="maxCompact"
              [max]="200"
              sc-dual-range-slider
            ></div>
            <div class="text-xs text-center">{{ minCompact() }} - {{ maxCompact() }}</div>
          </div>

          <div class="space-y-3">
            <h4 class="text-sm font-medium">With background</h4>
            <div
              class="px-4 py-6 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/20 dark:to-purple-950/20 rounded-xl"
              [(minValue)]="minStyled"
              [(maxValue)]="maxStyled"
              [max]="200"
              sc-dual-range-slider
            ></div>
            <div class="text-xs text-center">{{ minStyled() }} - {{ maxStyled() }}</div>
          </div>
        </div>
      </div>

      <div class="space-y-4">
        <h3 class="text-lg font-semibold">Usage examples</h3>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div class="p-4 border rounded-lg space-y-3">
            <h4 class="text-sm font-semibold">Age Range</h4>
            <div
              [(minValue)]="ageMin"
              [(maxValue)]="ageMax"
              [min]="18"
              [max]="65"
              sc-dual-range-slider
            ></div>
            <p class="text-xs">{{ ageMin() }} - {{ ageMax() }} years old</p>
          </div>

          <div class="p-4 border rounded-lg space-y-3">
            <h4 class="text-sm font-semibold">Rating Filter</h4>
            <div
              [(minValue)]="ratingMin"
              [(maxValue)]="ratingMax"
              [min]="1"
              [max]="5"
              [step]="0.5"
              sc-dual-range-slider
            ></div>
            <p class="text-xs">{{ ratingMin().toFixed(1) }} - {{ ratingMax().toFixed(1) }} stars</p>
          </div>
        </div>
      </div>

      <div class="space-y-4">
        <h3 class="text-lg font-semibold">Features</h3>
        <ul class="text-sm text-muted-foreground space-y-1">
          <li>• Dual thumb range selection</li>
          <li>• Configurable min, max, and step values</li>
          <li>• Visual range indication between thumbs</li>
          <li>• Prevents thumbs from crossing over</li>
          <li>• Two-way data binding with model signals</li>
          <li>• Keyboard accessible</li>
          <li>• Customizable styling</li>
        </ul>
      </div>
    </div>
  `,
  styles: ``,
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

  readonly minDecimal = signal(2.5);
  readonly maxDecimal = signal(7.8);

  readonly minCompact = signal(50);
  readonly maxCompact = signal(150);

  readonly minStyled = signal(40);
  readonly maxStyled = signal(160);

  readonly ageMin = signal(25);
  readonly ageMax = signal(45);

  readonly ratingMin = signal(2.0);
  readonly ratingMax = signal(4.5);
}
