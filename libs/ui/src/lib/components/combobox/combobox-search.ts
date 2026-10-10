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
  model,
  untracked,
} from '@angular/core';
import { bindInput, cn } from '../../utils';
import { SC_COMBOBOX } from './combobox-tokens';

/**
 * The search box inside the combobox popup. It is itself an (always
 * expanded) editable combobox driving the list, and takes focus when the
 * popup opens. Its text starts empty on every open.
 */
@Directive({
  selector: 'input[scComboboxSearch]',
  hostDirectives: [Combobox],
  host: {
    'data-slot': 'combobox-search',
    autocomplete: 'off',
    // The inner combobox stops Escape (it is always expanded), so close the
    // popup from here.
    '(keydown.escape)': 'root.close()',
    '[class]': 'class()',
  },
})
export class ScComboboxSearch {
  protected readonly root = inject(SC_COMBOBOX);
  readonly combobox = inject(Combobox);

  readonly classInput = input<string>('', { alias: 'class' });
  /** The search text, for filtering. Reset to `''` whenever the popup opens. */
  readonly value = model('');

  protected readonly class = computed(() => cn('', this.classInput()));

  constructor() {
    bindInput(this.combobox.alwaysExpanded, true);

    effect(() => {
      const value = this.value();
      untracked(() => {
        if (this.combobox.value() !== value) this.combobox.value.set(value);
      });
    });
    effect(() => {
      const value = this.combobox.value();
      untracked(() => {
        if (this.value() !== value) this.value.set(value);
      });
    });

    this.root.search.set(this.combobox);
    inject(DestroyRef).onDestroy(() => this.root.search.set(undefined));

    const element = inject<ElementRef<HTMLInputElement>>(ElementRef);
    afterNextRender(() => {
      // Start every open with an empty search. Done after the first render so
      // the reset reaches a two-way `[(value)]` binding.
      this.value.set('');
      element.nativeElement.focus();
    });
  }
}
