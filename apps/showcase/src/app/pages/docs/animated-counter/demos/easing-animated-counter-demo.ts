import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  ViewEncapsulation,
  viewChildren,
} from '@angular/core';
import { ScButton } from '@semantic-components/ui';
import { animate } from 'motion';

@Component({
  selector: 'app-easing-animated-counter-demo',
  imports: [ScButton],
  template: `
    <div class="space-y-3">
      <div class="grid grid-cols-2 gap-4 md:grid-cols-4">
        <div class="text-center">
          <p class="text-muted-foreground mb-2 text-xs">Linear</p>
          <span #counter class="text-2xl font-bold tabular-nums">0</span>
        </div>
        <div class="text-center">
          <p class="text-muted-foreground mb-2 text-xs">Ease In</p>
          <span #counter class="text-2xl font-bold tabular-nums">0</span>
        </div>
        <div class="text-center">
          <p class="text-muted-foreground mb-2 text-xs">Ease Out</p>
          <span #counter class="text-2xl font-bold tabular-nums">0</span>
        </div>
        <div class="text-center">
          <p class="text-muted-foreground mb-2 text-xs">Ease In/Out</p>
          <span #counter class="text-2xl font-bold tabular-nums">0</span>
        </div>
      </div>
      <button scButton (click)="animateAll()">Animate All</button>
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EasingAnimatedCounterDemo {
  private readonly counters = viewChildren<ElementRef<HTMLElement>>('counter');

  private readonly easings: Array<
    'linear' | 'easeIn' | 'easeOut' | 'easeInOut'
  > = ['linear', 'easeIn', 'easeOut', 'easeInOut'];

  animateAll(): void {
    const els = this.counters();

    els.forEach((el, i) => {
      el.nativeElement.textContent = '0';

      animate(0, 1000, {
        duration: 2,
        ease: this.easings[i],
        onUpdate: (value: number) => {
          el.nativeElement.textContent = Math.round(value).toLocaleString();
        },
      });
    });
  }
}
