import {
  ChangeDetectionStrategy,
  Component,
  signal,
  ViewEncapsulation,
} from '@angular/core';
import { ScAnimatedCounter } from '@semantic-components/ui-lab';

@Component({
  selector: 'app-easing-animated-counter-demo',
  imports: [ScAnimatedCounter],
  template: `
    <div class="space-y-3">
      <div class="grid grid-cols-2 gap-4 md:grid-cols-4">
        <div class="text-center">
          <p class="mb-2 text-xs text-muted-foreground">Linear</p>
          <sc-animated-counter
            [value]="value()"
            easing="linear"
            [duration]="2000"
            class="text-2xl font-bold"
          />
        </div>
        <div class="text-center">
          <p class="mb-2 text-xs text-muted-foreground">Ease In</p>
          <sc-animated-counter
            [value]="value()"
            easing="easeIn"
            [duration]="2000"
            class="text-2xl font-bold"
          />
        </div>
        <div class="text-center">
          <p class="mb-2 text-xs text-muted-foreground">Ease Out</p>
          <sc-animated-counter
            [value]="value()"
            easing="easeOut"
            [duration]="2000"
            class="text-2xl font-bold"
          />
        </div>
        <div class="text-center">
          <p class="mb-2 text-xs text-muted-foreground">Ease In/Out</p>
          <sc-animated-counter
            [value]="value()"
            easing="easeInOut"
            [duration]="2000"
            class="text-2xl font-bold"
          />
        </div>
      </div>
      <button
        class="rounded-md bg-primary px-3 py-1.5 text-sm text-primary-foreground hover:bg-primary/90"
        (click)="animate()"
      >
        Animate All
      </button>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EasingAnimatedCounterDemo {
  readonly value = signal(0);

  animate(): void {
    this.value.set(0);
    setTimeout(() => this.value.set(1000), 50);
  }
}
