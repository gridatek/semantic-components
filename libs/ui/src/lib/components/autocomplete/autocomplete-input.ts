import { Combobox } from '@angular/aria/combobox';
import {
  Directive,
  ElementRef,
  computed,
  effect,
  inject,
  input,
  untracked,
} from '@angular/core';
import { bindInput, cn } from '../../utils';
import { SC_AUTOCOMPLETE, SC_AUTOCOMPLETE_INPUT } from './autocomplete-tokens';

@Directive({
  selector: 'input[scAutocompleteInput]',
  hostDirectives: [Combobox],
  providers: [
    { provide: SC_AUTOCOMPLETE_INPUT, useExisting: ScAutocompleteInput },
  ],
  host: {
    'data-slot': 'autocomplete-input',
    autocomplete: 'off',
    '[attr.aria-invalid]': 'autocomplete.invalid() || null',
    '[attr.aria-required]': 'autocomplete.required() || null',
    '[class]': 'class()',
    '(focusout)': 'autocomplete.touch.emit()',
  },
})
export class ScAutocompleteInput {
  protected readonly autocomplete = inject(SC_AUTOCOMPLETE);
  readonly combobox = inject(Combobox);
  readonly elementRef = inject<ElementRef<HTMLInputElement>>(ElementRef);

  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() => cn('', this.classInput()));

  constructor() {
    bindInput(this.combobox.disabled, this.autocomplete.disabled);
    bindInput(this.combobox.readonly, this.autocomplete.readonly);

    // The combobox owns the input's text; keep it in sync with the control.
    effect(() => {
      const value = this.autocomplete.value();
      untracked(() => {
        if (this.combobox.value() !== value) this.combobox.value.set(value);
      });
    });
    effect(() => {
      const value = this.combobox.value();
      untracked(() => {
        if (this.autocomplete.value() !== value) {
          this.autocomplete.value.set(value);
        }
      });
    });
  }
}
