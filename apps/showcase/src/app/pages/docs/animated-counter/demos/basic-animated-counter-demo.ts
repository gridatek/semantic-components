import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  ViewEncapsulation,
  signal,
  viewChild,
} from '@angular/core';
import { ScButton } from '@semantic-components/ui';
import { animate } from 'motion';

@Component({
  selector: 'app-basic-animated-counter-demo',
  imports: [ScButton],
  template: `
    <div class="flex items-center gap-4">
      <span #counter class="text-4xl font-bold tabular-nums">0</span>
      <button scButton (click)="increment()">+100</button>
      <button scButton variant="secondary" (click)="reset()">Reset</button>
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BasicAnimatedCounterDemo {
  private readonly counterEl =
    viewChild.required<ElementRef<HTMLElement>>('counter');
  private readonly current = signal(0);

  increment(): void {
    const from = this.current();
    const to = from + 100;
    this.current.set(to);

    animate(from, to, {
      duration: 1,
      ease: 'easeOut',
      onUpdate: (value: number) => {
        this.counterEl().nativeElement.textContent =
          Math.round(value).toLocaleString();
      },
    });
  }

  reset(): void {
    const from = this.current();
    this.current.set(0);

    animate(from, 0, {
      duration: 0.5,
      ease: 'easeOut',
      onUpdate: (value: number) => {
        this.counterEl().nativeElement.textContent =
          Math.round(value).toLocaleString();
      },
    });
  }
}
