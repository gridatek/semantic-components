import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { PrefixAnimatedCounterDemo } from './prefix-animated-counter-demo';

@Component({
  selector: 'app-prefix-animated-counter-demo-container',
  imports: [DemoContainer, PrefixAnimatedCounterDemo],
  template: `
    <app-demo-container title="Prefix" [code]="code">
      <app-prefix-animated-counter-demo />
    </app-demo-container>
  `,
  host: { class: 'block' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PrefixAnimatedCounterDemoContainer {
  readonly code = `import {
  ChangeDetectionStrategy,
  Component,
  signal,
  ViewEncapsulation,
} from '@angular/core';
import { ScAnimatedCounter } from '@semantic-components/ui-lab';

@Component({
  selector: 'app-prefix-animated-counter-demo',
  imports: [ScAnimatedCounter],
  template: \`
    <div class="flex items-center gap-4">
      <sc-animated-counter
        [value]="value()"
        prefix="$"
        [decimalPlaces]="2"
        class="text-3xl font-bold text-green-600"
      />
      <button
        class="rounded-md bg-green-600 px-3 py-1.5 text-sm text-white hover:bg-green-700"
        (click)="add()"
      >
        +$50
      </button>
    </div>
  \`,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PrefixAnimatedCounterDemo {
  readonly value = signal(0);

  add(): void {
    this.value.update((v) => v + 50);
  }
}`;
}
