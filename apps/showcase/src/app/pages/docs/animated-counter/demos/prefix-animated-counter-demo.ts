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
    <div class="flex items-center gap-4">
      <span #counter class="text-3xl font-bold text-green-600 tabular-nums">
        $0.00
      </span>
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
