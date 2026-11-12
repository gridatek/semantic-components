import { ToolbarWidgetGroup } from '@angular/aria/toolbar';
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
import { cn } from 'cn';
import { bindInput } from '../../utils';
import { SC_TOGGLE_VALUES, type ScToggleValues } from '../toggle/toggle-values';

/**
 * Widgets grouped in a toolbar: Angular Aria's ToolbarWidgetGroup — any mix
 * of widgets, `disabled` for all of them, keyed by the toolbar. It can hold
 * its toggles' pressed values (`scToggle` with a `value`): an array, one
 * pressed at a time or several (`multiple`) — a toggle group in a toolbar,
 * a [formField] (Signal Forms types it by the group) or [(value)].
 */
@Directive({
  selector: 'div[scToolbarWidgetGroup]',
  hostDirectives: [ToolbarWidgetGroup],
  providers: [{ provide: SC_TOGGLE_VALUES, useExisting: ScToolbarWidgetGroup }],
  host: {
    'data-slot': 'toolbar-widget-group',
    role: 'group',
    '[attr.data-multiple]': 'multiple() || null',
    '[class]': 'class()',
    '(focusout)': 'onFocusOut($event)',
  },
})
export class ScToolbarWidgetGroup<T = unknown>
  implements FormValueControl<T[]>, ScToggleValues
{
  private readonly element =
    inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;

  readonly classInput = input<string>('', { alias: 'class' });
  /** Its toggles' pressed values: a [formField], or two-way. */
  readonly value = model<T[]>([]);
  /** Several pressed at a time; otherwise one, or none. */
  readonly multiple = input(false, { transform: booleanAttribute });
  /** All its widgets disabled (bound by the Field directive too). */
  readonly disabled = input(false, { transform: booleanAttribute });
  /** Focus left the group: the field is touched. */
  readonly touch = output<void>();

  protected readonly class = computed(() =>
    cn('flex items-center gap-1', this.classInput()),
  );

  has(value: unknown): boolean {
    return this.value().some((pressed) => Object.is(pressed, value));
  }

  toggle(value: unknown): void {
    const pressed = this.has(value);
    const rest = this.value().filter((v) => !Object.is(v, value));
    if (this.multiple()) {
      this.value.set(pressed ? rest : [...rest, value as T]);
    } else {
      this.value.set(pressed ? [] : [value as T]);
    }
  }

  constructor() {
    bindInput(inject(ToolbarWidgetGroup).disabled, this.disabled);
  }

  protected onFocusOut(event: FocusEvent): void {
    if (!this.element.contains(event.relatedTarget as Node | null)) {
      this.touch.emit();
    }
  }
}
