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
  selector: 'app-prefix-animated-counter-demo',
  imports: [ScButton],
  template: `
    <div class="flex flex-col items-center gap-6">
      <div
        class="flex h-32 w-64 items-center justify-center rounded-xl border border-green-200 bg-green-50 dark:border-green-900 dark:bg-green-950/30"
      >
        <span
          #counter
          class="text-4xl font-bold text-green-600 tabular-nums dark:text-green-400"
        >
          $0.00
        </span>
      </div>
      <button scButton (click)="add()">+$50</button>
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PrefixAnimatedCounterDemo {
  private readonly counterEl =
    viewChild.required<ElementRef<HTMLElement>>('counter');
  private readonly current = signal(0);

  add(): void {
    const from = this.current();
    const to = from + 50;
    this.current.set(to);

    animate(from, to, {
      duration: 1,
      ease: 'easeOut',
      onUpdate: (value: number) => {
        this.counterEl().nativeElement.textContent = `$${value.toFixed(2)}`;
      },
    });
  }
}
