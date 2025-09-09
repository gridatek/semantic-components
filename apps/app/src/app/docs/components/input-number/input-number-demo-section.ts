import { ChangeDetectionStrategy, Component, ViewEncapsulation, input } from '@angular/core';

import { PreviewCodeTabs } from '../../../components/preview-code-tabs/preview-code-tabs';
import { InputNumberDemo } from './input-number-demo';

@Component({
  selector: 'app-input-number-demo-section',
  imports: [InputNumberDemo, PreviewCodeTabs],
  template: `
    <app-preview-code-tabs [code]="code" [title]="title()" [level]="level()">
      <app-input-number-demo />
    </app-preview-code-tabs>
  `,
  styles: ``,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputNumberDemoSection {
  readonly title = input<string>('');

  readonly level = input<'2' | '3'>('2');

  protected readonly code = `import { ChangeDetectionStrategy, Component, ViewEncapsulation, signal } from '@angular/core';

import { ScInputNumber } from '@semantic-components/ui';

@Component({
  selector: 'app-input-number-demo',
  imports: [ScInputNumber],
  template: \`
    <div class="space-y-8">
      <div class="space-y-4">
        <h3 class="text-lg font-semibold">Basic number input</h3>
        <p class="text-sm text-muted-foreground">
          A simple number input with default configuration.
        </p>
        <div class="space-y-4">
          <div sc-input-number [(value)]="basicValue" class="max-w-xs"></div>
          <div class="text-sm">
            Value: <span class="font-mono">{{ basicValue() }}</span>
          </div>
        </div>
      </div>

      <div class="space-y-4">
        <h3 class="text-lg font-semibold">With spinner controls</h3>
        <p class="text-sm text-muted-foreground">
          Number input with increment/decrement buttons.
        </p>
        <div class="space-y-4">
          <div sc-input-number [(value)]="controlsValue" [showControls]="true" class="max-w-xs"></div>
          <div class="text-sm">
            Value: <span class="font-mono">{{ controlsValue() }}</span>
          </div>
        </div>
      </div>

      <div class="space-y-4">
        <h3 class="text-lg font-semibold">Min/Max constraints</h3>
        <p class="text-sm text-muted-foreground">
          Number input with minimum and maximum value constraints.
        </p>
        <div class="space-y-4">
          <div sc-input-number 
            [(value)]="constrainedValue" 
            [min]="0" 
            [max]="100" 
            [showControls]="true"
            placeholder="0-100"
            class="max-w-xs">
          </div>
          <div class="text-sm">
            Value: <span class="font-mono">{{ constrainedValue() }}</span>
            <span class="text-muted-foreground ml-2">(Range: 0-100)</span>
          </div>
        </div>
      </div>

      <div class="space-y-4">
        <h3 class="text-lg font-semibold">Decimal precision</h3>
        <p class="text-sm text-muted-foreground">
          Number inputs with different decimal precision settings.
        </p>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div class="space-y-2">
            <label class="text-sm font-medium">Currency (2 decimals)</label>
            <div sc-input-number 
              [(value)]="currencyValue" 
              [precision]="2" 
              [step]="0.01"
              [min]="0"
              [showControls]="true"
              placeholder="0.00"
              class="w-full">
            </div>
            <div class="text-xs text-muted-foreground">\${{ currencyValue().toFixed(2) }}</div>
          </div>
        </div>
      </div>

      <div class="space-y-4">
        <h3 class="text-lg font-semibold">Interactive example</h3>
        <p class="text-sm text-muted-foreground">
          Use the buttons to control the number input programmatically. Try keyboard shortcuts: ↑/↓ arrows, Page Up/Down.
        </p>
        <div class="space-y-4">
          <div sc-input-number 
            [(value)]="interactiveValue" 
            [min]="-100"
            [max]="100"
            [step]="1"
            [showControls]="true"
            class="max-w-xs">
          </div>
          <div class="flex gap-2">
            <button 
              class="px-3 py-1 bg-primary text-primary-foreground rounded text-sm hover:bg-primary/90"
              (click)="setRandomValue()">
              Random
            </button>
            <button 
              class="px-3 py-1 bg-secondary text-secondary-foreground rounded text-sm hover:bg-secondary/90"
              (click)="setZero()">
              Zero
            </button>
          </div>
        </div>
      </div>
    </div>
  \`,
  styles: \`\`,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputNumberDemo {
  readonly basicValue = signal(42);
  readonly controlsValue = signal(10);
  readonly constrainedValue = signal(50);
  readonly currencyValue = signal(99.99);
  readonly interactiveValue = signal(0);

  setRandomValue(): void {
    this.interactiveValue.set(Math.floor(Math.random() * 201) - 100);
  }

  setZero(): void {
    this.interactiveValue.set(0);
  }
}`;
}
