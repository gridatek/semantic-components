import { ComboboxPopup } from '@angular/aria/combobox';
import { OverlayModule } from '@angular/cdk/overlay';
import {
  Component,
  ViewEncapsulation,
  booleanAttribute,
  computed,
  contentChild,
  effect,
  input,
  model,
  untracked,
} from '@angular/core';
import type { FormValueControl } from '@angular/forms/signals';
import { setInput } from '../../utils';
import { ScComboboxBase } from '../combobox/combobox-base';
import { ScComboboxPortal } from '../combobox/combobox-portal';
import { scComboboxTemplate } from '../combobox/combobox-template';
import { ScPortalOutlet } from '../portal-outlet/portal-outlet';

/** How it completes: suggestions in a list, or also inline in the input. */
export type ScAutocompleteMode = 'list' | 'both';

/**
 * Free text with suggestions, as Base UI's Autocomplete: its value is the
 * input's text — a suggestion picked writes its label there, and the text may
 * be anything. Inside, the Combobox's parts (`scComboboxInput`,
 * `scComboboxPortal`, `scComboboxPopup`, `scComboboxList`, `scComboboxItem`…).
 * You filter the suggestions, by `query()`. With `mode="both"`, the
 * highlighted suggestion is also typed into the input, selected.
 */
@Component({
  selector: 'div[scAutocomplete]',
  exportAs: 'scAutocomplete',
  imports: [ComboboxPopup, OverlayModule, ScPortalOutlet],
  providers: [{ provide: ScComboboxBase, useExisting: ScAutocomplete }],
  template: scComboboxTemplate,
  host: {
    'data-slot': 'autocomplete',
    '[class]': 'class()',
    '[attr.data-disabled]': 'disabled() || null',
  },
  encapsulation: ViewEncapsulation.None,
})
export class ScAutocomplete
  extends ScComboboxBase<string>
  implements FormValueControl<string>
{
  /** The text: two-way, or a [formField]. */
  readonly value = model('');
  /** `list`: suggestions in a list; `both`: the highlighted one also completes the text inline. */
  readonly mode = input<ScAutocompleteMode>('list');
  /** Opens on a click in the input (off: typing or ↓ opens it, as Base UI's). */
  override readonly openOnInputClick = input(false, {
    transform: booleanAttribute,
  });

  readonly multiple = false;
  /** The text as the "selected" value: shown again when the list closes. */
  readonly selected = computed<readonly string[]>(() =>
    this.value() ? [this.value()] : [],
  );
  readonly portal = contentChild.required(ScComboboxPortal);

  /** A suggestion picked: its label is the text. */
  setSelected(values: readonly string[]): void {
    const [value] = values;
    this.value.set(value === undefined ? '' : this.labelOf(value));
  }

  constructor() {
    super();
    // Typed: the text is the value, as typed.
    effect(() => {
      const text = this.inputValue();
      untracked(() => {
        if (this.value() !== text) this.value.set(text);
      });
    });
    // Open, the suggestions are filtered by the text, whatever opened it.
    effect(() => {
      const open = this.open();
      const text = this.inputValue();
      untracked(() => this.query.set(open ? text : ''));
    });
    // `both`: the highlighted suggestion completes the text inline.
    effect(() => {
      const field = this.field();
      if (!field) return;
      const suggestion =
        this.mode() === 'both' && this.open()
          ? (this.activeLabel() ?? undefined)
          : undefined;
      untracked(() => setInput(field.combobox.inlineSuggestion, suggestion));
    });
    effect(() => {
      if (!this.open()) untracked(() => this.activeLabel.set(null));
    });
  }
}
