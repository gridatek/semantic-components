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
        class="rounded-md bg-primary px-3 py-1.5 text-sm text-primary-foreground hover:bg-primary/90"
        (click)="increment()"
      >
        +100
      </button>
      <button
        class="rounded-md bg-secondary px-3 py-1.5 text-sm text-secondary-foreground hover:bg-secondary/90"
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
