import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  signal,
} from '@angular/core';
import { ScButton } from '@semantic-components/ui';
import { ScAnimatedCounter } from '@semantic-components/ui-lab';

@Component({
  selector: 'app-easing-animated-counter-demo',
  imports: [ScAnimatedCounter, ScButton],
  template: `
    <div class="space-y-3">
      <div class="grid grid-cols-2 gap-4 md:grid-cols-4">
        <div class="text-center">
          <p class="text-muted-foreground mb-2 text-xs">Linear</p>
          <span
            scAnimatedCounter
            [value]="value()"
            easing="linear"
            [duration]="2000"
            class="text-2xl font-bold"
          ></span>
        </div>
        <div class="text-center">
          <p class="text-muted-foreground mb-2 text-xs">Ease In</p>
          <span
            scAnimatedCounter
            [value]="value()"
            easing="easeIn"
            [duration]="2000"
            class="text-2xl font-bold"
          ></span>
        </div>
        <div class="text-center">
          <p class="text-muted-foreground mb-2 text-xs">Ease Out</p>
          <span
            scAnimatedCounter
            [value]="value()"
            easing="easeOut"
            [duration]="2000"
            class="text-2xl font-bold"
          ></span>
        </div>
        <div class="text-center">
          <p class="text-muted-foreground mb-2 text-xs">Ease In/Out</p>
          <span
            scAnimatedCounter
            [value]="value()"
            easing="easeInOut"
            [duration]="2000"
            class="text-2xl font-bold"
          ></span>
        </div>
      </div>
      <button scButton (click)="animate()">Animate All</button>
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
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
