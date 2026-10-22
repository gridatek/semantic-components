import { Listbox, Option } from '@angular/aria/listbox';
import {
  Component,
  ElementRef,
  ViewEncapsulation,
  afterNextRender,
  computed,
  effect,
  inject,
  input,
  untracked,
} from '@angular/core';
import { bindInput, cn } from '../../utils';
import { ScTimePicker } from './time-picker';

/**
 * The list of times (a listbox) in the popover: the picker's `times()`,
 * written in the input's locale. It opens on the value (or the time before
 * it), focused; Enter or a click picks. Name it (`aria-label`).
 */
@Component({
  selector: 'div[scTimePickerList]',
  imports: [Option],
  hostDirectives: [Listbox],
  template: `
    @for (time of picker.times(); track time.toString()) {
      <div
        ngOption
        data-slot="time-picker-option"
        [value]="time.toString()"
        [label]="picker.label(time)"
        [class]="optionClass"
        (click)="picker.pick(time)"
      >
        {{ picker.label(time) }}
      </div>
    }
  `,
  host: {
    'data-slot': 'time-picker-list',
    '[class]': 'class()',
    '(keydown.enter)': 'pickActive()',
    '(keydown.space)': 'pickActive()',
  },
  encapsulation: ViewEncapsulation.None,
})
export class ScTimePickerList {
  protected readonly picker = inject(ScTimePicker);
  private readonly listbox = inject<Listbox<string>>(Listbox);
  private readonly host =
    inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;

  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly optionClass = cn(
    'relative flex cursor-pointer items-center rounded-md px-2 py-1.5 text-sm tabular-nums outline-none',
    'hover:bg-accent hover:text-accent-foreground focus-visible:bg-accent focus-visible:text-accent-foreground',
    'aria-selected:bg-primary aria-selected:text-primary-foreground',
  );

  protected readonly class = computed(() =>
    cn(
      'flex max-h-72 min-w-32 scroll-py-1 flex-col gap-0.5 overflow-y-auto p-1 outline-none',
      this.classInput(),
    ),
  );

  constructor() {
    bindInput(this.listbox.focusMode, 'roving');
    bindInput(this.listbox.selectionMode, 'explicit');
    // The value, selected — when it is one of the times.
    effect(() => {
      const value = this.picker.timeInput().value()?.toString();
      const listed = this.picker
        .times()
        .some((time) => time.toString() === value);
      untracked(() => this.listbox.value.set(value && listed ? [value] : []));
    });
    // Open on the value (or the time before it) — focused, in view.
    afterNextRender(() => {
      this.listbox.gotoIndex(this.picker.startIndex());
      this.listbox.scrollActiveItemIntoView({ block: 'center' });
      this.host
        .querySelector<HTMLElement>(
          '[data-slot="time-picker-option"][tabindex="0"]',
        )
        ?.focus();
    });
  }

  /** Enter or Space: the focused time, picked. */
  protected pickActive(): void {
    const index = [
      ...this.host.querySelectorAll('[data-slot="time-picker-option"]'),
    ].indexOf(this.host.ownerDocument.activeElement as Element);
    const time = this.picker.times()[index];
    if (time) this.picker.pick(time);
  }
}
