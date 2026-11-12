import { Combobox } from '@angular/aria/combobox';
import {
  DestroyRef,
  Directive,
  ElementRef,
  afterNextRender,
  computed,
  effect,
  inject,
  input,
  untracked,
} from '@angular/core';
import { cn } from 'cn';
import { injectPreset } from '../../config/preset';
import { bindInput } from '../../utils';
import { SC_FIELD } from '../field';
import { ScInput } from '../input/input';
import { ScComboboxBase } from './combobox-base';
import { ScComboboxChips } from './combobox-chips';
import { ScComboboxPopup } from './combobox-popup';

/**
 * The combobox's input (Angular Aria's Combobox): typing opens the list and
 * gives the text to filter by (`query()`), the arrows move the highlight,
 * Enter picks. In an input group it is the field; after the chips, the
 * field of several values; inside the popup, the search a trigger opens.
 */
@Directive({
  selector: 'input[scComboboxInput]',
  hostDirectives: [Combobox],
  host: {
    autocomplete: 'off',
    '[class]': 'class()',
    '(input)': 'onInput()',
    '(click)': 'onClick()',
    '(keydown)': 'onKeydown($event)',
    '(focusout)': 'onFocusout()',
  },
})
export class ScComboboxInput {
  private readonly styles = injectPreset().combobox;
  protected readonly root = inject(ScComboboxBase);
  readonly combobox = inject(Combobox);
  readonly element =
    inject<ElementRef<HTMLInputElement>>(ElementRef).nativeElement;
  /** Inside the popup: the search a trigger opens. */
  private readonly inPopup = !!inject(ScComboboxPopup, { optional: true });
  /** After the chips. */
  private readonly inChips = !!inject(ScComboboxChips, { optional: true });

  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn(this.inChips && this.styles.chipsInput, this.classInput()),
  );

  constructor() {
    const destroyRef = inject(DestroyRef);

    if (this.inPopup) {
      // Always open: the popup it is in is what opens and closes.
      bindInput(this.combobox.alwaysExpanded, true);
      this.root.search.set(this);
      destroyRef.onDestroy(() => this.root.search.set(undefined));
      // Each opening starts with an empty search, focus in it.
      afterNextRender(() => {
        this.combobox.value.set('');
        this.element.focus();
      });
      return;
    }

    this.root.field.set(this);
    destroyRef.onDestroy(() => this.root.field.set(undefined));
    bindInput(this.combobox.disabled, this.root.disabled);
    bindInput(this.combobox.readonly, this.root.readonly);

    // The text, both ways.
    effect(() => {
      const text = this.root.inputValue();
      untracked(() => {
        if (this.combobox.value() !== text) this.combobox.value.set(text);
      });
    });
    effect(() => {
      const text = this.combobox.value();
      untracked(() => {
        if (this.root.inputValue() !== text) this.root.inputValue.set(text);
      });
    });

    // Invalid, from the root's form field: through the scInput on the same
    // input (it writes aria-invalid), or by hand without one (after chips).
    const scInput = inject(ScInput, { optional: true, self: true });
    if (scInput) {
      bindInput(scInput.invalid, this.root.invalid);
      bindInput(scInput.touched, this.root.touched);
    } else {
      effect(() => this.setAttribute('aria-invalid', this.root.showInvalid()));
    }
    effect(() => this.setAttribute('aria-required', this.root.required()));

    // In a field, after the chips (no scInput there): the field's id, for its
    // label, and its description.
    const field = inject(SC_FIELD, { optional: true });
    if (field && !scInput) {
      effect(() => {
        this.element.id = field.id();
        const description = field.descriptionIds().join(' ');
        if (description) {
          this.element.setAttribute('aria-describedby', description);
        } else {
          this.element.removeAttribute('aria-describedby');
        }
      });
    }
  }

  /** Typed: the text to filter by; emptied, one value is cleared. */
  protected onInput(): void {
    const text = this.element.value;
    this.root.query.set(text);
    if (!this.inPopup && !this.root.multiple && !text && this.root.hasValue()) {
      this.root.setSelected([]);
    }
  }

  protected onClick(): void {
    if (this.inPopup || !this.root.openOnInputClick()) return;
    if (!this.root.open()) this.root.show();
  }

  protected onKeydown(event: KeyboardEvent): void {
    if (this.inPopup) {
      // Aria's combobox, always open here, keeps Escape to itself: the popup
      // never hears it.
      if (event.key === 'Escape') this.root.close();
      return;
    }
    if (!this.root.multiple) return;
    if (this.element.selectionStart !== 0 || this.element.selectionEnd !== 0) {
      return;
    }
    const selected = this.root.selected();
    if (event.key === 'Backspace' && selected.length) {
      // Nothing left to delete: the last chip goes.
      this.root.remove(selected[selected.length - 1]);
    } else if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
      // Towards the chips (the start: left, or right in right-to-left).
      const towardsChips =
        (getComputedStyle(this.element).direction === 'rtl') ===
        (event.key === 'ArrowRight');
      if (towardsChips) this.root.focusLastChip();
    }
  }

  protected onFocusout(): void {
    if (!this.inPopup) this.root.touch.emit();
  }

  private setAttribute(name: string, on: boolean): void {
    if (on) this.element.setAttribute(name, 'true');
    else this.element.removeAttribute(name);
  }
}
