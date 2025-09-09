import { ChangeDetectionStrategy, Component, ViewEncapsulation, signal } from '@angular/core';

import { ScInputNumber } from '@semantic-components/ui';

@Component({
  selector: 'app-input-number-demo',
  imports: [ScInputNumber],
  template: `
    <div class="space-y-8">
      <div class="space-y-4">
        <h3 class="text-lg font-semibold">Basic number input</h3>
        <p class="text-sm text-muted-foreground">
          A simple number input with default configuration.
        </p>
        <div class="space-y-4">
          <div class="max-w-xs" [(value)]="basicValue" sc-input-number></div>
          <div class="text-sm">
            Value:
            <span class="font-mono">{{ basicValue() }}</span>
          </div>
        </div>
      </div>

      <div class="space-y-4">
        <h3 class="text-lg font-semibold">With spinner controls</h3>
        <p class="text-sm text-muted-foreground">Number input with increment/decrement buttons.</p>
        <div class="space-y-4">
          <div
            class="max-w-xs"
            [(value)]="controlsValue"
            [showControls]="true"
            sc-input-number
          ></div>
          <div class="text-sm">
            Value:
            <span class="font-mono">{{ controlsValue() }}</span>
          </div>
        </div>
      </div>

      <div class="space-y-4">
        <h3 class="text-lg font-semibold">Min/Max constraints</h3>
        <p class="text-sm text-muted-foreground">
          Number input with minimum and maximum value constraints.
        </p>
        <div class="space-y-4">
          <div
            class="max-w-xs"
            [(value)]="constrainedValue"
            [min]="0"
            [max]="100"
            [showControls]="true"
            sc-input-number
            placeholder="0-100"
          ></div>
          <div class="text-sm">
            Value:
            <span class="font-mono">{{ constrainedValue() }}</span>
            <span class="text-muted-foreground ml-2">(Range: 0-100)</span>
          </div>
        </div>
      </div>

      <div class="space-y-4">
        <h3 class="text-lg font-semibold">Custom step values</h3>
        <p class="text-sm text-muted-foreground">Number input with custom step increments.</p>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div class="space-y-2">
            <label class="text-sm font-medium">Step: 0.1</label>
            <div
              class="w-full"
              [(value)]="stepValue1"
              [step]="0.1"
              [precision]="1"
              [showControls]="true"
              sc-input-number
            ></div>
            <div class="text-xs text-muted-foreground">{{ stepValue1() }}</div>
          </div>
          <div class="space-y-2">
            <label class="text-sm font-medium">Step: 5</label>
            <div
              class="w-full"
              [(value)]="stepValue2"
              [step]="5"
              [showControls]="true"
              sc-input-number
            ></div>
            <div class="text-xs text-muted-foreground">{{ stepValue2() }}</div>
          </div>
          <div class="space-y-2">
            <label class="text-sm font-medium">Step: 25</label>
            <div
              class="w-full"
              [(value)]="stepValue3"
              [step]="25"
              [showControls]="true"
              sc-input-number
            ></div>
            <div class="text-xs text-muted-foreground">{{ stepValue3() }}</div>
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
            <div
              class="w-full"
              [(value)]="currencyValue"
              [precision]="2"
              [step]="0.01"
              [min]="0"
              [showControls]="true"
              sc-input-number
              placeholder="0.00"
            ></div>
            <div class="text-xs text-muted-foreground">&#36;{{ currencyValue().toFixed(2) }}</div>
          </div>
          <div class="space-y-2">
            <label class="text-sm font-medium">Scientific (4 decimals)</label>
            <div
              class="w-full"
              [(value)]="scientificValue"
              [precision]="4"
              [step]="0.0001"
              [showControls]="true"
              sc-input-number
            ></div>
            <div class="text-xs text-muted-foreground">{{ scientificValue().toFixed(4) }}</div>
          </div>
          <div class="space-y-2">
            <label class="text-sm font-medium">Percentage (1 decimal)</label>
            <div
              class="w-full"
              [(value)]="percentageValue"
              [precision]="1"
              [step]="0.1"
              [min]="0"
              [max]="100"
              [showControls]="true"
              sc-input-number
            ></div>
            <div class="text-xs text-muted-foreground">{{ percentageValue().toFixed(1) }}%</div>
          </div>
        </div>
      </div>

      <div class="space-y-4">
        <h3 class="text-lg font-semibold">Positive only</h3>
        <p class="text-sm text-muted-foreground">Number input that only allows positive values.</p>
        <div class="space-y-4">
          <div
            class="max-w-xs"
            [(value)]="positiveValue"
            [allowNegative]="false"
            [showControls]="true"
            sc-input-number
            placeholder="Positive numbers only"
          ></div>
          <div class="text-sm">
            Value:
            <span class="font-mono">{{ positiveValue() }}</span>
            <span class="text-muted-foreground ml-2">(Positive only)</span>
          </div>
        </div>
      </div>

      <div class="space-y-4">
        <h3 class="text-lg font-semibold">Disabled state</h3>
        <p class="text-sm text-muted-foreground">Number input in disabled state.</p>
        <div class="space-y-4">
          <div
            class="max-w-xs"
            [(value)]="disabledValue"
            [disabled]="true"
            [showControls]="true"
            sc-input-number
          ></div>
          <div class="text-sm text-muted-foreground">
            This input is disabled and cannot be modified.
          </div>
        </div>
      </div>

      <div class="space-y-4">
        <h3 class="text-lg font-semibold">Interactive example</h3>
        <p class="text-sm text-muted-foreground">
          Use the buttons to control the number input programmatically. Try keyboard shortcuts: ↑/↓
          arrows, Page Up/Down.
        </p>
        <div class="space-y-4">
          <div
            class="max-w-xs"
            [(value)]="interactiveValue"
            [min]="-100"
            [max]="100"
            [step]="1"
            [showControls]="true"
            sc-input-number
          ></div>
          <div class="flex gap-2">
            <button
              class="px-3 py-1 bg-primary text-primary-foreground rounded text-sm hover:bg-primary/90"
              (click)="setRandomValue()"
            >
              Random
            </button>
            <button
              class="px-3 py-1 bg-secondary text-secondary-foreground rounded text-sm hover:bg-secondary/90"
              (click)="setZero()"
            >
              Zero
            </button>
            <button
              class="px-3 py-1 bg-secondary text-secondary-foreground rounded text-sm hover:bg-secondary/90"
              (click)="setMax()"
            >
              Max (100)
            </button>
            <button
              class="px-3 py-1 bg-secondary text-secondary-foreground rounded text-sm hover:bg-secondary/90"
              (click)="setMin()"
            >
              Min (-100)
            </button>
          </div>
          <div class="text-sm">
            Value:
            <span class="font-mono">{{ interactiveValue() }}</span>
          </div>
        </div>
      </div>

      <div class="space-y-4">
        <h3 class="text-lg font-semibold">Form example</h3>
        <p class="text-sm text-muted-foreground">Multiple number inputs in a form-like layout.</p>
        <div class="space-y-4">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div class="space-y-2">
              <label class="text-sm font-medium">Quantity</label>
              <div
                class="w-full"
                [(value)]="formQuantity"
                [min]="1"
                [max]="999"
                [showControls]="true"
                sc-input-number
                placeholder="1"
              ></div>
            </div>
            <div class="space-y-2">
              <label class="text-sm font-medium">Price ($)</label>
              <div
                class="w-full"
                [(value)]="formPrice"
                [precision]="2"
                [step]="0.01"
                [min]="0"
                [showControls]="true"
                sc-input-number
                placeholder="0.00"
              ></div>
            </div>
            <div class="space-y-2">
              <label class="text-sm font-medium">Discount (%)</label>
              <div
                class="w-full"
                [(value)]="formDiscount"
                [min]="0"
                [max]="100"
                [precision]="1"
                [step]="0.1"
                [showControls]="true"
                sc-input-number
                placeholder="0.0"
              ></div>
            </div>
            <div class="space-y-2">
              <label class="text-sm font-medium">Tax Rate (%)</label>
              <div
                class="w-full"
                [(value)]="formTaxRate"
                [min]="0"
                [max]="50"
                [precision]="2"
                [step]="0.01"
                [showControls]="true"
                sc-input-number
                placeholder="0.00"
              ></div>
            </div>
          </div>
          <div class="p-4 bg-muted rounded-lg">
            <h4 class="font-medium mb-3">Calculation Summary</h4>
            <div class="space-y-1 text-sm">
              <div class="flex justify-between">
                <span>Quantity:</span>
                <span class="font-mono">{{ formQuantity() }}</span>
              </div>
              <div class="flex justify-between">
                <span>Unit Price:</span>
                <span class="font-mono">&#36;{{ formPrice().toFixed(2) }}</span>
              </div>
              <div class="flex justify-between">
                <span>Subtotal:</span>
                <span class="font-mono">&#36;{{ (formQuantity() * formPrice()).toFixed(2) }}</span>
              </div>
              <div class="flex justify-between">
                <span>Discount ({{ formDiscount().toFixed(1) }}%):</span>
                <span class="font-mono">
                  -&#36;{{ ((formQuantity() * formPrice() * formDiscount()) / 100).toFixed(2) }}
                </span>
              </div>
              <div class="flex justify-between">
                <span>Tax ({{ formTaxRate().toFixed(2) }}%):</span>
                <span class="font-mono">
                  &#36;{{
                    (
                      (formQuantity() * formPrice() * (1 - formDiscount() / 100) * formTaxRate()) /
                      100
                    ).toFixed(2)
                  }}
                </span>
              </div>
              <hr class="my-2" />
              <div class="flex justify-between font-medium">
                <span>Total:</span>
                <span class="font-mono">&#36;{{ calculateTotal().toFixed(2) }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: ``,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputNumberDemo {
  readonly basicValue = signal(42);
  readonly controlsValue = signal(10);
  readonly constrainedValue = signal(50);
  readonly stepValue1 = signal(1.5);
  readonly stepValue2 = signal(20);
  readonly stepValue3 = signal(100);
  readonly currencyValue = signal(99.99);
  readonly scientificValue = signal(3.1416);
  readonly percentageValue = signal(75.5);
  readonly positiveValue = signal(25);
  readonly disabledValue = signal(123);
  readonly interactiveValue = signal(0);

  // Form values
  readonly formQuantity = signal(2);
  readonly formPrice = signal(29.99);
  readonly formDiscount = signal(10.0);
  readonly formTaxRate = signal(8.25);

  setRandomValue(): void {
    this.interactiveValue.set(Math.floor(Math.random() * 201) - 100); // -100 to 100
  }

  setZero(): void {
    this.interactiveValue.set(0);
  }

  setMax(): void {
    this.interactiveValue.set(100);
  }

  setMin(): void {
    this.interactiveValue.set(-100);
  }

  calculateTotal(): number {
    const subtotal = this.formQuantity() * this.formPrice();
    const afterDiscount = subtotal * (1 - this.formDiscount() / 100);
    const tax = (afterDiscount * this.formTaxRate()) / 100;
    return afterDiscount + tax;
  }
}
