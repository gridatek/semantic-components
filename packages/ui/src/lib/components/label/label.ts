import {
  Directive,
  computed,
  contentChild,
  inject,
  input,
} from '@angular/core';
import { cn } from 'cn';
import { injectStyle } from '../../config/style';
import { SC_FIELD } from '../field';

/**
 * A label, in the style's look: its text alone; in a field — inside one, or
 * around one as a choice card — the field's look too (border, corners,
 * padding, focus ring, checked tint). In a field it names the field's
 * control (`for`); a custom control — a group, a listbox, a slider, a
 * trigger, which registers itself with the field — is named by it
 * (`aria-labelledby` to `<field id>-label`), with a `for` only at a button
 * (a select's or a combobox's trigger: `for` ties only to a native element),
 * and a click on the label focuses that control (a group's first focusable
 * part) without pressing it.
 */
@Directive({
  selector: 'label[scLabel]',
  host: {
    'data-slot': 'label',
    '[attr.id]': 'id()',
    '[attr.for]': 'for()',
    '[class]': 'class()',
    '(click)': 'focusCustomControl($event)',
  },
})
export class ScLabel {
  private readonly styles = injectStyle().label;
  private readonly field = inject(SC_FIELD, { optional: true });
  /** A field it wraps: a choice card. */
  private readonly wrapped = contentChild(SC_FIELD);
  readonly idInput = input<string>('', { alias: 'id' });
  readonly forInput = input<string>('', { alias: 'for' });
  readonly classInput = input<string>('', { alias: 'class' });

  /** In a field, `<field id>-label`: what names a control that is not an input (a group). */
  private readonly id = computed(
    () =>
      this.idInput() ||
      (this.field && !this.forInput() ? `${this.field.id()}-label` : null),
  );

  /**
   * Its own `for`, else the field's control: a native one, or a custom one
   * that is a `button` (a select's trigger, which takes the field's id). None
   * for a custom control that is no labelable element (a group, a listbox).
   */
  private readonly for = computed(() => {
    if (this.forInput()) return this.forInput();
    if (!this.field) return null;
    const control = this.field.customControl();
    return !control || control.tagName === 'BUTTON' ? this.field.id() : null;
  });

  /**
   * A field's custom control: focused on a click, as a native label's — a
   * `for` at a button would press it (open the list): that is cancelled.
   */
  private focusCustomControl(event: Event): void {
    const control = this.forInput() ? null : this.field?.customControl();
    if (!control) return;
    event.preventDefault();
    const focusable = (element: HTMLElement) =>
      element.tabIndex >= 0 && !element.matches(':disabled');
    const target = focusable(control)
      ? control
      : [
          ...control.querySelectorAll<HTMLElement>(
            'input, button, select, textarea, [tabindex]',
          ),
        ].find(focusable);
    target?.focus();
  }

  private readonly class = computed(() =>
    cn(
      this.styles.label,
      (this.field || this.wrapped()) && this.styles.field,
      this.classInput(),
    ),
  );
}
