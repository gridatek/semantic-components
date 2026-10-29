import {
  Directive,
  ElementRef,
  computed,
  inject,
  input,
  numberAttribute,
  signal,
} from '@angular/core';
import { cn, ɵwarnIfUnnamed } from '../../utils';

/** Where a task is: not known yet, under way, or done. */
export type ScProgressState = 'indeterminate' | 'loading' | 'complete';

/** A value as a number, `null` (or nothing) meaning not known. */
const valueAttribute = (value: unknown): number | null =>
  value === null || value === undefined || value === ''
    ? null
    : numberAttribute(value, 0);

/**
 * A task's progress: a value between `min` and `max` — `null` while not
 * known (indeterminate). Shown as a bar (`scProgressTrack` and
 * `scProgressRange`) or a circle (`scProgressCircle`), with your
 * label (its name) and your value text (read as its value).
 */
@Directive({
  selector: 'div[scProgress]',
  exportAs: 'scProgress',
  host: {
    'data-slot': 'progress',
    role: 'progressbar',
    '[attr.aria-valuemin]': 'min()',
    '[attr.aria-valuemax]': 'max()',
    '[attr.aria-valuenow]': 'indeterminate() ? null : value()',
    '[attr.aria-labelledby]': 'labelId()',
    '[attr.data-state]': 'state()',
    '[attr.data-shape]': 'shape()',
    '[class]': 'class()',
  },
})
export class ScProgress {
  readonly element = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;

  readonly classInput = input<string>('', { alias: 'class' });
  /** How far the task is; `null` while not known. */
  readonly value = input<number | null, unknown>(null, {
    transform: valueAttribute,
  });
  readonly min = input(0, { transform: numberAttribute });
  readonly max = input(100, { transform: numberAttribute });

  readonly indeterminate = computed(() => this.value() === null);
  /** How much is done, from 0 to 1. */
  readonly fraction = computed(() => {
    const value = this.value();
    const span = this.max() - this.min();
    if (value === null || span <= 0) return 0;
    return Math.min(Math.max((value - this.min()) / span, 0), 1);
  });
  readonly state = computed<ScProgressState>(() => {
    const value = this.value();
    if (value === null) return 'indeterminate';
    return value >= this.max() ? 'complete' : 'loading';
  });

  /** Set by the parts: the label's id, the shape drawn. */
  readonly labelId = signal<string | null>(null);
  readonly shape = signal<'bar' | 'circle'>('bar');

  protected readonly class = computed(() =>
    cn(
      'group/progress',
      this.shape() === 'circle'
        ? 'relative inline-flex size-16 shrink-0'
        : 'flex flex-wrap gap-3',
      this.classInput(),
    ),
  );

  constructor() {
    ɵwarnIfUnnamed('scProgress');
  }
}
