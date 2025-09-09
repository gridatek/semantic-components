import { ChangeDetectionStrategy, Component, ViewEncapsulation, signal } from '@angular/core';

import { ScCircularProgress } from '@semantic-components/ui';

@Component({
  selector: 'app-circular-progress-demo',
  imports: [ScCircularProgress],
  template: `
    <div class="space-y-8">
      <div class="space-y-4">
        <h3 class="text-lg font-semibold">Basic circular progress</h3>
        <p class="text-sm text-muted-foreground">A simple circular progress indicator.</p>
        <div class="flex items-center gap-6">
          <div [value]="25" sc-circular-progress></div>
          <div [value]="50" sc-circular-progress></div>
          <div [value]="75" sc-circular-progress></div>
          <div [value]="100" sc-circular-progress></div>
        </div>
      </div>

      <div class="space-y-4">
        <h3 class="text-lg font-semibold">With value labels</h3>
        <p class="text-sm text-muted-foreground">
          Circular progress with percentage values displayed in the center.
        </p>
        <div class="flex items-center gap-6">
          <div [value]="25" [showValue]="true" sc-circular-progress></div>
          <div [value]="50" [showValue]="true" sc-circular-progress></div>
          <div [value]="75" [showValue]="true" sc-circular-progress></div>
          <div [value]="100" [showValue]="true" sc-circular-progress></div>
        </div>
      </div>

      <div class="space-y-4">
        <h3 class="text-lg font-semibold">Different sizes</h3>
        <p class="text-sm text-muted-foreground">Circular progress in various sizes.</p>
        <div class="flex items-center gap-6">
          <div
            [value]="65"
            [size]="48"
            [strokeWidth]="3"
            [showValue]="true"
            sc-circular-progress
          ></div>
          <div
            [value]="65"
            [size]="64"
            [strokeWidth]="4"
            [showValue]="true"
            sc-circular-progress
          ></div>
          <div
            [value]="65"
            [size]="80"
            [strokeWidth]="5"
            [showValue]="true"
            sc-circular-progress
          ></div>
          <div
            [value]="65"
            [size]="96"
            [strokeWidth]="6"
            [showValue]="true"
            sc-circular-progress
          ></div>
        </div>
      </div>

      <div class="space-y-4">
        <h3 class="text-lg font-semibold">Interactive progress</h3>
        <p class="text-sm text-muted-foreground">Click the buttons to update the progress value.</p>
        <div class="space-y-4">
          <div class="flex items-center gap-4">
            <div
              [value]="interactiveValue()"
              [showValue]="true"
              [size]="80"
              sc-circular-progress
            ></div>
            <div class="flex gap-2">
              <button
                class="px-3 py-1 bg-primary text-primary-foreground rounded text-sm hover:bg-primary/90"
                (click)="increaseProgress()"
              >
                +10
              </button>
              <button
                class="px-3 py-1 bg-secondary text-secondary-foreground rounded text-sm hover:bg-secondary/90"
                (click)="decreaseProgress()"
              >
                -10
              </button>
              <button
                class="px-3 py-1 bg-muted text-muted-foreground rounded text-sm hover:bg-muted/90"
                (click)="resetProgress()"
              >
                Reset
              </button>
            </div>
          </div>
        </div>
      </div>

      <div class="space-y-4">
        <h3 class="text-lg font-semibold">Custom content</h3>
        <p class="text-sm text-muted-foreground">
          Circular progress with custom content in the center.
        </p>
        <div class="flex items-center gap-6">
          <div [value]="80" [size]="96" sc-circular-progress>
            <div class="text-center">
              <div class="text-lg font-bold text-primary">4.5</div>
              <div class="text-xs text-muted-foreground">stars</div>
            </div>
          </div>

          <div [value]="45" [size]="96" [strokeWidth]="8" sc-circular-progress>
            <div class="text-center">
              <div class="text-sm font-semibold">45/100</div>
              <div class="text-xs text-muted-foreground">tasks</div>
            </div>
          </div>

          <div [value]="90" [size]="96" sc-circular-progress>
            <div class="text-center">
              <div class="text-xs text-muted-foreground mb-1">Storage</div>
              <div class="text-sm font-bold">90%</div>
            </div>
          </div>
        </div>
      </div>

      <div class="space-y-4">
        <h3 class="text-lg font-semibold">Different stroke styles</h3>
        <p class="text-sm text-muted-foreground">
          Circular progress with different stroke linecap styles.
        </p>
        <div class="flex items-center gap-6">
          <div class="text-center space-y-2">
            <div
              [value]="70"
              [strokeLinecap]="'round'"
              [showValue]="true"
              sc-circular-progress
            ></div>
            <div class="text-xs text-muted-foreground">Round</div>
          </div>
          <div class="text-center space-y-2">
            <div
              [value]="70"
              [strokeLinecap]="'butt'"
              [showValue]="true"
              sc-circular-progress
            ></div>
            <div class="text-xs text-muted-foreground">Butt</div>
          </div>
          <div class="text-center space-y-2">
            <div
              [value]="70"
              [strokeLinecap]="'square'"
              [showValue]="true"
              sc-circular-progress
            ></div>
            <div class="text-xs text-muted-foreground">Square</div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: ``,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CircularProgressDemo {
  readonly interactiveValue = signal(30);

  increaseProgress(): void {
    const current = this.interactiveValue();
    this.interactiveValue.set(Math.min(current + 10, 100));
  }

  decreaseProgress(): void {
    const current = this.interactiveValue();
    this.interactiveValue.set(Math.max(current - 10, 0));
  }

  resetProgress(): void {
    this.interactiveValue.set(0);
  }
}
