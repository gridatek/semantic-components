import {
  DestroyRef,
  Directive,
  computed,
  inject,
  input,
  signal,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { fromEvent } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { cn } from '../../utils';
import { SC_NUMBER } from './number';

@Directive({
  selector: '[scNumberScrubArea]',
  host: {
    '[class]': 'class()',
    '[attr.data-scrubbing]': 'isScrubbing() || null',
    '[attr.data-disabled]': 'number.disabled() || null',
    '(mousedown)': 'onMouseDown($event)',
  },
})
export class ScNumberScrubArea {
  private readonly destroyRef = inject(DestroyRef);
  readonly number = inject(SC_NUMBER);
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly isScrubbing = signal(false);
  private startX = 0;
  private startValue = 0;

  protected readonly class = computed(() =>
    cn(
      'inline-flex items-center gap-2 mb-2',
      'select-none cursor-ew-resize [&_*]:cursor-ew-resize',
      'data-scrubbing:cursor-ew-resize',
      'data-disabled:opacity-50 data-disabled:cursor-not-allowed data-disabled:[&_*]:cursor-not-allowed',
      this.classInput(),
    ),
  );

  protected onMouseDown(event: MouseEvent): void {
    if (this.number.disabled()) return;

    event.preventDefault();
    this.isScrubbing.set(true);
    this.startX = event.clientX;
    this.startValue = this.number.value() ?? 0;

    const mouseUp$ = fromEvent<MouseEvent>(document, 'mouseup');

    fromEvent<MouseEvent>(document, 'mousemove')
      .pipe(takeUntil(mouseUp$), takeUntilDestroyed(this.destroyRef))
      .subscribe((e) => {
        const deltaX = e.clientX - this.startX;
        const step = this.number.step();
        const speed = this.number.scrubSpeed();
        const delta = deltaX * step * speed * 0.1;
        const newValue = this.startValue + delta;

        this.number.setValue(newValue);
      });

    mouseUp$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => this.isScrubbing.set(false));
  }
}
