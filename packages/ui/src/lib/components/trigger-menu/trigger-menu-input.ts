import {
  DestroyRef,
  Directive,
  ElementRef,
  computed,
  inject,
  signal,
} from '@angular/core';
import type { ScToken } from '../token-input/token-input-value';
import { scTextFieldRect } from './text-field-rect';
import type { ScTriggerMenuField } from './trigger-menu';
import { ScTriggerMenu } from './trigger-menu';

/**
 * A textarea or an input the menu suggests in: its value stays plain text,
 * an item chosen puts in its text (the trigger's `insert`, or the trigger and
 * the label) and a space, as typed — forms and bindings see it. Its look is
 * its own (`scTextarea`, `scInput`); focus never leaves it.
 */
@Directive({
  selector: 'textarea[scTriggerMenuInput], input[scTriggerMenuInput]',
  host: {
    'aria-autocomplete': 'list',
    '[attr.aria-controls]': 'controls()',
    '[attr.aria-activedescendant]': 'activeDescendant()',
    '(focus)': 'onFocus()',
    '(blur)': 'hasFocus.set(false)',
    '(input)': 'sync()',
    '(keyup)': 'sync()',
    '(pointerup)': 'sync()',
    '(select)': 'sync()',
    '(keydown)': 'onKeydown($event)',
  },
})
export class ScTriggerMenuInput implements ScTriggerMenuField {
  private readonly menu = inject(ScTriggerMenu);
  private readonly host =
    inject<ElementRef<HTMLTextAreaElement | HTMLInputElement>>(ElementRef)
      .nativeElement;

  private readonly value = signal('');
  private readonly at = signal<number | null>(null);
  private readonly hasFocus = signal(false);
  private readonly canEdit = signal(true);

  /** The menu's list, while it shows. */
  private readonly controls = computed(() =>
    this.menu.visible() ? this.menu.listId : null,
  );
  /** The menu's highlighted item, while it shows. */
  private readonly activeDescendant = computed(() =>
    this.menu.visible() ? this.menu.activeId() : null,
  );

  constructor() {
    this.menu.ɵinput.set(this);
    inject(DestroyRef).onDestroy(() => {
      if (this.menu.ɵinput() === this) this.menu.ɵinput.set(undefined);
    });
  }

  element(): HTMLElement {
    return this.host;
  }

  text(): string {
    return this.value();
  }

  caret(): number | null {
    return this.at();
  }

  focused(): boolean {
    return this.hasFocus();
  }

  editable(): boolean {
    return this.canEdit();
  }

  rectAt(offset: number): DOMRect | null {
    return scTextFieldRect(this.host, offset);
  }

  insert(start: number, end: number, _token: ScToken, choice: string): void {
    const text = `${choice} `;
    this.host.setRangeText(text, start, end, 'end');
    // As typed: forms and two-way bindings read the input event.
    this.host.dispatchEvent(
      new InputEvent('input', {
        bubbles: true,
        inputType: 'insertReplacementText',
        data: text,
      }),
    );
  }

  /** What is typed and where the caret is, read from the field. */
  private sync(): void {
    const field = this.host;
    this.value.set(field.value);
    this.at.set(
      field.selectionStart === field.selectionEnd ? field.selectionEnd : null,
    );
    this.canEdit.set(!field.disabled && !field.readOnly);
  }

  private onFocus(): void {
    this.hasFocus.set(true);
    this.sync();
  }

  private onKeydown(event: Event): void {
    this.menu.onKeydown(event as KeyboardEvent);
  }
}
