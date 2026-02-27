import {
  ChangeDetectionStrategy,
  Component,
  signal,
  ViewEncapsulation,
} from '@angular/core';
import { ScAnimatedCounter } from '@semantic-components/ui-lab';

@Component({
  selector: 'app-basic-animated-counter-demo',
  imports: [ScAnimatedCounter],
  template: `
    <div class="flex items-center gap-4">
      <sc-animated-counter [value]="value()" class="text-4xl font-bold" />
      <button
        class="bg-primary text-primary-foreground hover:bg-primary/90 rounded-md px-3 py-1.5 text-sm"
        (click)="increment()"
      >
        +100
      </button>
      <button
        class="bg-secondary text-secondary-foreground hover:bg-secondary/90 rounded-md px-3 py-1.5 text-sm"
        (click)="reset()"
      >
        Reset
      </button>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BasicAnimatedCounterDemo {
  readonly value = signal(0);

  increment(): void {
    this.value.update((v) => v + 100);
  }

  reset(): void {
    this.value.set(0);
  }
}
