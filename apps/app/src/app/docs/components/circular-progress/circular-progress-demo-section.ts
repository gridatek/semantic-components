import { ChangeDetectionStrategy, Component, ViewEncapsulation, input } from '@angular/core';

import { PreviewCodeTabs } from '../../../components/preview-code-tabs/preview-code-tabs';
import { CircularProgressDemo } from './circular-progress-demo';

@Component({
  selector: 'app-circular-progress-demo-section',
  imports: [CircularProgressDemo, PreviewCodeTabs],
  template: `
    <app-preview-code-tabs [code]="code" [title]="title()" [level]="level()">
      <app-circular-progress-demo />
    </app-preview-code-tabs>
  `,
  styles: ``,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CircularProgressDemoSection {
  readonly title = input<string>('');

  readonly level = input<'2' | '3'>('2');

  protected readonly code = `import { ChangeDetectionStrategy, Component, ViewEncapsulation, signal } from '@angular/core';

import { ScCircularProgress } from '@semantic-components/ui';

@Component({
  selector: 'app-circular-progress-demo',
  imports: [ScCircularProgress],
  template: \`
    <div class="space-y-8">
      <div class="space-y-4">
        <h3 class="text-lg font-semibold">Basic circular progress</h3>
        <p class="text-sm text-muted-foreground">
          A simple circular progress indicator.
        </p>
        <div class="flex items-center gap-6">
          <div sc-circular-progress [value]="25"></div>
          <div sc-circular-progress [value]="50"></div>
          <div sc-circular-progress [value]="75"></div>
          <div sc-circular-progress [value]="100"></div>
        </div>
      </div>

      <div class="space-y-4">
        <h3 class="text-lg font-semibold">With value labels</h3>
        <p class="text-sm text-muted-foreground">
          Circular progress with percentage values displayed in the center.
        </p>
        <div class="flex items-center gap-6">
          <div sc-circular-progress [value]="25" [showValue]="true"></div>
          <div sc-circular-progress [value]="50" [showValue]="true"></div>
          <div sc-circular-progress [value]="75" [showValue]="true"></div>
          <div sc-circular-progress [value]="100" [showValue]="true"></div>
        </div>
      </div>

      <div class="space-y-4">
        <h3 class="text-lg font-semibold">Interactive progress</h3>
        <p class="text-sm text-muted-foreground">
          Click the buttons to update the progress value.
        </p>
        <div class="space-y-4">
          <div class="flex items-center gap-4">
            <div sc-circular-progress [value]="interactiveValue()" [showValue]="true" [size]="80"></div>
            <div class="flex gap-2">
              <button 
                class="px-3 py-1 bg-primary text-primary-foreground rounded text-sm hover:bg-primary/90"
                (click)="increaseProgress()">
                +10
              </button>
              <button 
                class="px-3 py-1 bg-secondary text-secondary-foreground rounded text-sm hover:bg-secondary/90"
                (click)="decreaseProgress()">
                -10
              </button>
              <button 
                class="px-3 py-1 bg-muted text-muted-foreground rounded text-sm hover:bg-muted/90"
                (click)="resetProgress()">
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
          <div sc-circular-progress [value]="80" [size]="96">
            <div class="text-center">
              <div class="text-lg font-bold text-primary">4.5</div>
              <div class="text-xs text-muted-foreground">stars</div>
            </div>
          </div>
          
          <div sc-circular-progress [value]="45" [size]="96" [strokeWidth]="8">
            <div class="text-center">
              <div class="text-sm font-semibold">45/100</div>
              <div class="text-xs text-muted-foreground">tasks</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  \`,
  styles: \`\`,
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
}`;
}
