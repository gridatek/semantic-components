import {
  DestroyRef,
  Directive,
  computed,
  inject,
  input,
  signal,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { cn } from '@semantic-components/ui';
import { fromEvent } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { SC_NUMBER_FIELD } from './number-field';

@Directive({
  selector: '[scNumberFieldScrubArea]',
  host: {
    'data-slot': 'number-field-scrub-area',
    '[class]': 'class()',
    '[attr.data-scrubbing]': 'isScrubbing() || null',
    '[attr.data-disabled]': 'numberField.disabled() || null',
    '(mousedown)': 'onMouseDown($event)',
  },
})
export class ScNumberFieldScrubArea {
  private readonly destroyRef = inject(DestroyRef);
  readonly numberField = inject(SC_NUMBER_FIELD);
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
    if (this.numberField.disabled()) return;

    event.preventDefault();
    this.isScrubbing.set(true);
    this.startX = event.clientX;
    this.startValue = this.numberField.value() ?? 0;

    const mouseUp$ = fromEvent<MouseEvent>(document, 'mouseup');

    fromEvent<MouseEvent>(document, 'mousemove')
      .pipe(takeUntil(mouseUp$), takeUntilDestroyed(this.destroyRef))
      .subscribe((e) => {
        const deltaX = e.clientX - this.startX;
        const step = this.numberField.step();
        const speed = this.numberField.scrubSpeed();
        const delta = deltaX * step * speed * 0.1;
        const newValue = this.startValue + delta;

        this.numberField.setValue(newValue);
      });

    mouseUp$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => this.isScrubbing.set(false));
  }
}
