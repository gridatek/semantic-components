import { ComboboxWidget } from '@angular/aria/combobox';
import { Listbox } from '@angular/aria/listbox';
import {
  Directive,
  Injector,
  afterNextRender,
  booleanAttribute,
  computed,
  effect,
  inject,
  input,
  untracked,
} from '@angular/core';
import { cn } from 'cn';
import { injectPreset } from '../../config/preset';
import { bindInput } from '../../utils';
import { ScComboboxBase } from './combobox-base';

function sameItems<T>(a: readonly T[], b: readonly T[]): boolean {
  return a.length === b.length && a.every((item) => b.includes(item));
}

/**
 * The options (Angular Aria's Listbox): focus stays in the input, the active
 * option is announced through `aria-activedescendant`, and only Enter or a
 * click selects. It scrolls past its height, its scrollbar shown
 * (`hideScrollbar` hides it). Name it (`aria-label`).
 */
@Directive({
  selector: 'div[scComboboxList]',
  hostDirectives: [Listbox, ComboboxWidget],
  host: {
    'data-slot': 'combobox-list',
    '[attr.data-empty]': 'root.rendered().length ? null : ""',
    '[class]': 'class()',
  },
})
export class ScComboboxList<T = unknown> {
  private readonly styles = injectPreset().combobox;
  protected readonly root = inject<ScComboboxBase<T>>(ScComboboxBase);
  private readonly listbox = inject<Listbox<T>>(Listbox);
  private readonly widget = inject(ComboboxWidget);

  readonly classInput = input<string>('', { alias: 'class' });
  /** Hides its scrollbar (shadcn's look): nothing then shows that it scrolls. */
  readonly hideScrollbar = input(false, { transform: booleanAttribute });

  protected readonly class = computed(() =>
    cn(
      this.styles.list,
      this.hideScrollbar() ? 'no-scrollbar' : '[scrollbar-width:thin]',
      this.classInput(),
    ),
  );

  constructor() {
    const injector = inject(Injector);
    bindInput(this.listbox.focusMode, 'activedescendant');
    bindInput(this.listbox.selectionMode, 'explicit');
    bindInput(this.listbox.multi, this.root.multiple);
    bindInput(this.listbox.wrap, this.root.loopFocus);
    bindInput(this.widget.activeDescendant, this.listbox.activeDescendant);

    // The value → the listbox: those of the rendered options that are
    // selected (again as filtering brings an option back).
    effect(() => {
      const wanted = this.selectedRendered();
      untracked(() => {
        if (!sameItems(this.listbox.value(), wanted)) {
          this.listbox.value.set(wanted);
        }
      });
    });

    // The listbox → the value: a pick.
    effect(() => {
      const picked = this.listbox.value();
      untracked(() => {
        const held = this.selectedRendered();
        if (sameItems(picked, held)) return;
        if (!this.root.multiple) {
          if (picked.length) {
            this.root.pick([picked[0]]);
          } else {
            // Picking the selected option takes it off in a single-select
            // listbox: a combobox keeps its value, and closes.
            this.listbox.value.set(held);
            this.root.close();
          }
          return;
        }
        // Several: the selected ones your filter hides stay.
        const equal = this.root.isItemEqualToValue();
        const rendered = this.root.rendered();
        const selected = this.root.selected();
        const kept = selected.filter(
          (item) =>
            !rendered.some((option) => equal(option, item)) ||
            picked.some((option) => equal(option, item)),
        );
        const added = picked.filter(
          (option) => !selected.some((item) => equal(option, item)),
        );
        this.root.pick([...kept, ...added]);
      });
    });

    // While filtering, the first option highlighted.
    effect(() => {
      this.root.rendered();
      if (!this.root.autoHighlight() || !this.root.query()) return;
      afterNextRender(() => this.listbox.gotoFirst(), { injector });
    });
  }

  /** The rendered options that are selected, as the listbox holds them. */
  private selectedRendered(): T[] {
    const equal = this.root.isItemEqualToValue();
    const selected = this.root.selected();
    return this.root
      .rendered()
      .filter((option) => selected.some((item) => equal(option, item)));
  }
}
