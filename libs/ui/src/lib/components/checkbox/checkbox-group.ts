import {
  Directive,
  ElementRef,
  booleanAttribute,
  computed,
  inject,
  input,
  model,
  output,
} from '@angular/core';
import type { FormValueControl } from '@angular/forms/signals';
import { cn } from '../../utils';

/**
 * Checkboxes sharing one value: the ticked ones' values, as an array — a
 * [formField] (Signal Forms types it by the group) or [(value)]. Each
 * checkbox carries its own value; a parent checkbox (`parent`) ticks all of
 * `allValues` or none, and is mixed when only some are ticked.
 */
@Directive({
  selector: 'div[scCheckboxGroup]',
  host: {
    'data-slot': 'checkbox-group',
    role: 'group',
    '[attr.aria-disabled]': 'disabled() || null',
    '[attr.data-disabled]': 'disabled() || null',
    '[class]': 'class()',
    '(focusout)': 'onFocusOut($event)',
  },
})
export class ScCheckboxGroup<T = unknown> implements FormValueControl<T[]> {
  private readonly element =
    inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;

  readonly classInput = input<string>('', { alias: 'class' });
  /** The ticked checkboxes' values: a [formField], or two-way. */
  readonly value = model<T[]>([]);
  /** Every checkbox's value: what a parent checkbox ticks. */
  readonly allValues = input<readonly T[]>([]);
  // Bound by the Field directive (FormValueControl).
  readonly disabled = input(false, { transform: booleanAttribute });
  readonly invalid = input(false);
  readonly touched = input(false);
  /** Focus left the group: the field is touched. */
  readonly touch = output<void>();

  /** Invalid once touched, as the other controls. */
  readonly showInvalid = computed(() => this.touched() && this.invalid());
  /** Every one of allValues ticked. */
  readonly allTicked = computed(
    () =>
      this.allValues().length > 0 &&
      this.allValues().every((value) => this.has(value)),
  );
  /** Some of allValues ticked, not all: a parent shows a minus. */
  readonly someTicked = computed(
    () =>
      !this.allTicked() && this.allValues().some((value) => this.has(value)),
  );

  protected readonly class = computed(() =>
    cn('flex w-full flex-col gap-3', this.classInput()),
  );

  /** Whether a value is ticked. */
  has(value: unknown): boolean {
    return this.value().some((ticked) => Object.is(ticked, value));
  }

  /** Ticks or unticks one value: a checkbox calls it. */
  set(value: unknown, ticked: boolean): void {
    const rest = this.value().filter((v) => !Object.is(v, value));
    this.value.set(ticked ? [...rest, value as T] : rest);
  }

  /** Ticks all of allValues, or none of them (values outside them stay). */
  setAll(ticked: boolean): void {
    const all = this.allValues();
    const rest = this.value().filter((v) => !all.some((a) => Object.is(a, v)));
    this.value.set(ticked ? [...rest, ...all] : rest);
  }

  /** The first checkbox that can take focus. */
  focus(options?: FocusOptions): void {
    this.element
      .querySelector<HTMLInputElement>('input[type="checkbox"]:not(:disabled)')
      ?.focus(options);
  }

  protected onFocusOut(event: FocusEvent): void {
    if (!this.element.contains(event.relatedTarget as Node | null)) {
      this.touch.emit();
    }
  }
}
