import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { EasingAnimatedCounterDemo } from './easing-animated-counter-demo';

@Component({
  selector: 'app-easing-animated-counter-demo-container',
  imports: [DemoContainer, EasingAnimatedCounterDemo],
  template: `
    <app-demo-container title="Easing" [code]="code">
      <app-easing-animated-counter-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EasingAnimatedCounterDemoContainer {
  readonly code = `import {
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
  template: \`
    <div class="flex w-full flex-col items-center gap-6">
      <div class="grid w-full grid-cols-2 gap-4 md:grid-cols-4">
        <div
          class="bg-muted/30 flex flex-col items-center justify-center gap-2 rounded-xl border p-6"
        >
          <p
            class="text-muted-foreground text-xs font-medium tracking-wider uppercase"
          >
            Linear
          </p>
          <span #counter class="text-3xl font-bold tabular-nums">0</span>
        </div>
        <div
          class="bg-muted/30 flex flex-col items-center justify-center gap-2 rounded-xl border p-6"
        >
          <p
            class="text-muted-foreground text-xs font-medium tracking-wider uppercase"
          >
            Ease In
          </p>
          <span #counter class="text-3xl font-bold tabular-nums">0</span>
        </div>
        <div
          class="bg-muted/30 flex flex-col items-center justify-center gap-2 rounded-xl border p-6"
        >
          <p
            class="text-muted-foreground text-xs font-medium tracking-wider uppercase"
          >
            Ease Out
          </p>
          <span #counter class="text-3xl font-bold tabular-nums">0</span>
        </div>
        <div
          class="bg-muted/30 flex flex-col items-center justify-center gap-2 rounded-xl border p-6"
        >
          <p
            class="text-muted-foreground text-xs font-medium tracking-wider uppercase"
          >
            Ease In/Out
          </p>
          <span #counter class="text-3xl font-bold tabular-nums">0</span>
        </div>
      </div>
      <button scButton (click)="animateAll()">Animate All</button>
    </div>
  \`,
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
}`;
}
