import { ChangeDetectionStrategy, Component, ViewEncapsulation, signal } from '@angular/core';

import { ScScrubArea } from '@semantic-components/ui';

@Component({
  selector: 'app-scrub-area-demo',
  imports: [ScScrubArea],
  template: `
    <div class="space-y-8">
      <div class="space-y-4">
        <h3 class="text-lg font-semibold">Basic scrub area</h3>
        <p class="text-sm text-muted-foreground">
          Click and drag horizontally to change the value.
        </p>
        <div class="space-y-2">
          <div
            class="inline-flex items-center gap-2 rounded-md border px-3 py-2"
            [(value)]="value1"
            sc-scrub-area
          >
            <span class="text-sm font-medium">Value:</span>
            <span class="text-sm font-mono">{{ value1() }}</span>
          </div>
          <p class="text-xs text-muted-foreground">Range: 0-100, Step: 1, Sensitivity: 1</p>
        </div>
      </div>

      <div class="space-y-4">
        <h3 class="text-lg font-semibold">Custom range and step</h3>
        <div class="space-y-2">
          <div
            class="inline-flex items-center gap-2 rounded-md border px-3 py-2 bg-accent/50"
            [(value)]="value2"
            [min]="-10"
            [max]="10"
            [step]="0.1"
            [sensitivity]="0.1"
            sc-scrub-area
          >
            <span class="text-sm font-medium">Decimal:</span>
            <span class="text-sm font-mono">{{ value2().toFixed(1) }}</span>
          </div>
          <p class="text-xs text-muted-foreground">
            Range: -10 to 10, Step: 0.1, Low sensitivity for precision
          </p>
        </div>
      </div>

      <div class="space-y-4">
        <h3 class="text-lg font-semibold">High sensitivity</h3>
        <div class="space-y-2">
          <div
            class="inline-flex items-center gap-2 rounded-md border px-3 py-2 bg-blue-50 dark:bg-blue-950/20"
            [(value)]="value3"
            [max]="1000"
            [sensitivity]="5"
            sc-scrub-area
          >
            <span class="text-sm font-medium">Fast scrub:</span>
            <span class="text-sm font-mono">{{ value3() }}</span>
          </div>
          <p class="text-xs text-muted-foreground">
            Range: 0-1000, Higher sensitivity for faster changes
          </p>
        </div>
      </div>

      <div class="space-y-4">
        <h3 class="text-lg font-semibold">Custom styling</h3>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div
            class="flex items-center justify-between rounded-lg bg-red-100 dark:bg-red-900/20 px-4 py-3 transition-colors hover:bg-red-200 dark:hover:bg-red-900/30"
            [(value)]="value4"
            [max]="255"
            sc-scrub-area
          >
            <span class="text-sm font-medium text-red-800 dark:text-red-200">Red</span>
            <span class="text-sm font-mono text-red-600 dark:text-red-400">{{ value4() }}</span>
          </div>

          <div
            class="flex items-center justify-between rounded-lg bg-green-100 dark:bg-green-900/20 px-4 py-3 transition-colors hover:bg-green-200 dark:hover:bg-green-900/30"
            [(value)]="value5"
            [max]="255"
            sc-scrub-area
          >
            <span class="text-sm font-medium text-green-800 dark:text-green-200">Green</span>
            <span class="text-sm font-mono text-green-600 dark:text-green-400">{{ value5() }}</span>
          </div>
        </div>
        <p class="text-xs text-muted-foreground">RGB color component scrubbers (0-255)</p>
      </div>

      <div class="space-y-4">
        <h3 class="text-lg font-semibold">Usage tips</h3>
        <ul class="text-sm text-muted-foreground space-y-1">
          <li>• Click and drag horizontally to change values</li>
          <li>• Shows ew-resize cursor when hovering</li>
          <li>• Right-click is disabled during scrubbing</li>
          <li>• Values are constrained within min/max bounds</li>
          <li>• Adjust sensitivity for different use cases</li>
          <li>• Perfect for numeric inputs in design tools</li>
        </ul>
      </div>
    </div>
  `,
  styles: ``,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScrubAreaDemo {
  readonly value1 = signal(50);
  readonly value2 = signal(0);
  readonly value3 = signal(500);
  readonly value4 = signal(128); // Red
  readonly value5 = signal(64); // Green
}
