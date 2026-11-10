import { _IdGenerator } from '@angular/cdk/a11y';
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
import { injectPreset } from '../../config/preset';
import { cn } from '../../utils';

/**
 * A group of radios, one picked: the group holds the choice — a [formField]
 * (Signal Forms types it by the group: a union value works) or [(value)].
 * Its radios carry their own value; the group checks the one that matches,
 * names them alike (one Tab stop, the arrows move the choice) and passes its
 * disabled and invalid state down.
 */
@Directive({
  selector: 'div[scRadioGroup]',
  host: {
    'data-slot': 'radio-group',
    role: 'radiogroup',
    '[attr.aria-disabled]': 'disabled() || null',
    '[class]': 'class()',
    '(focusout)': 'onFocusOut($event)',
  },
})
export class ScRadioGroup<T = unknown> implements FormValueControl<
  T | undefined
> {
  private readonly styles = injectPreset().radioGroup;
  private readonly element =
    inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;
  private readonly fallbackName = inject(_IdGenerator).getId('sc-radio-group-');

  readonly classInput = input<string>('', { alias: 'class' });
  readonly orientation = input<'vertical' | 'horizontal'>('vertical');

  /** The chosen radio's value: a [formField], or two-way. */
  readonly value = model<T | undefined>(undefined);
  // Bound by the Field directive (FormValueControl).
  readonly disabled = input(false, { transform: booleanAttribute });
  readonly invalid = input(false);
  readonly touched = input(false);
  /** The field's name (bound by the Field directive), for its radios. */
  readonly name = input('');
  /** Focus left the group: the field is touched. */
  readonly touch = output<void>();

  /** The radios' shared name: the field's, or one of its own. */
  readonly radioName = computed(() => this.name() || this.fallbackName);
  /**
   * The group holds the choice once it has one (a [formField], [(value)]);
   * otherwise its radios are each the Angular way (a [formField] on each).
   */
  readonly holdsChoice = computed(() => this.value() !== undefined);
  /** Invalid once touched, as the other controls. */
  readonly showInvalid = computed(() => this.touched() && this.invalid());

  protected readonly class = computed(() =>
    cn(
      this.orientation() === 'horizontal'
        ? 'flex flex-row gap-4'
        : this.styles.group,
      this.classInput(),
    ),
  );

  /** The chosen radio, or the first one that can take focus. */
  focus(options?: FocusOptions): void {
    const radios = [
      ...this.element.querySelectorAll<HTMLInputElement>(
        'input[type="radio"]:not(:disabled)',
      ),
    ];
    (radios.find((radio) => radio.checked) ?? radios[0])?.focus(options);
  }

  /** Picks a radio's value: the radio calls it when chosen. */
  select(value: unknown): void {
    this.value.set(value as T);
  }

  protected onFocusOut(event: FocusEvent): void {
    if (!this.element.contains(event.relatedTarget as Node | null)) {
      this.touch.emit();
    }
  }
}
