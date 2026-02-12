import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
  signal,
  ViewEncapsulation,
} from '@angular/core';
import { cn } from '../../utils';
import { SC_NUMBER_FIELD } from './number-field';

@Component({
  selector: '[sc-number-field-scrub-area]',
  template: `
    <ng-content />
  `,
  host: {
    'data-slot': 'number-field-scrub-area',
    '[class]': 'class()',
    '[attr.data-scrubbing]': 'isScrubbing() || null',
    '[attr.data-disabled]': 'numberField.disabled() || null',
    '(mousedown)': 'onMouseDown($event)',
  },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScNumberFieldScrubArea {
  readonly numberField = inject(SC_NUMBER_FIELD);
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly isScrubbing = signal(false);
  private startX = 0;
  private startValue = 0;

  protected readonly class = computed(() =>
    cn(
      'inline-flex items-center gap-2 mb-2',
      'select-none',
      'data-[scrubbing]:cursor-ew-resize',
      'data-[disabled]:opacity-50 data-[disabled]:cursor-not-allowed',
      !this.numberField.disabled() && 'cursor-ew-resize',
      this.classInput(),
    ),
  );

  protected onMouseDown(event: MouseEvent): void {
    if (this.numberField.disabled()) return;

    event.preventDefault();
    this.isScrubbing.set(true);
    this.startX = event.clientX;
    this.startValue = this.numberField.value() ?? 0;

    const onMouseMove = (e: MouseEvent) => {
      const deltaX = e.clientX - this.startX;
      const step = this.numberField.step();
      const speed = this.numberField.scrubSpeed();
      const delta = deltaX * step * speed * 0.1; // 0.1 for smoother scrubbing
      const newValue = this.startValue + delta;

      this.numberField.setValue(newValue);
    };

    const onMouseUp = () => {
      this.isScrubbing.set(false);
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  }
}
