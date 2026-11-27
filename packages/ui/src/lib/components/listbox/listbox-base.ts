import { Listbox } from '@angular/aria/listbox';
import {
  Directive,
  ElementRef,
  HostAttributeToken,
  booleanAttribute,
  computed,
  inject,
  input,
  output,
  signal,
} from '@angular/core';
import { cn } from 'cn';
import { injectStyle } from '../../config/style';
import { type ScTargetInput, bindInput } from '../../utils';
import { ɵregisterFieldControl } from '../field';

/** An option part, as its listbox lists them. */
export interface ScListboxItemHost<T> {
  value(): T;
  disabled(): boolean;
}

/**
 * What a listbox does, one value or several: `scListbox` and
 * `scListbox multiple` are this, each with its own value's type. Angular
 * Aria's listbox underneath — the WAI-ARIA keyboard (arrows, Home, End,
 * typeahead; Shift ranges, Ctrl + A with several). Its parts inject it.
 */
@Directive({
  host: {
    'data-slot': 'listbox',
    '[attr.id]': 'id()',
    '[attr.aria-labelledby]': 'labelledBy()',
    '[attr.aria-describedby]': 'describedBy()',
    '[attr.aria-invalid]': 'showInvalid() || null',
    '[attr.aria-required]': 'required() || null',
    '[attr.data-orientation]': 'orientation()',
    '[attr.data-disabled]': 'disabled() || null',
    '[attr.data-readonly]': 'readonly() || null',
    '[attr.data-required]': 'required() || null',
    '[class]': 'class()',
    '(focusout)': 'onFocusOut($event)',
    '(click)': 'onClick()',
  },
})
export abstract class ScListboxBase<T> {
  protected readonly listbox = inject<Listbox<T>>(Listbox);
  private readonly field = ɵregisterFieldControl();
  private readonly ariaLabel = inject(new HostAttributeToken('aria-label'), {
    optional: true,
  });
  private readonly styles = injectStyle().listbox;
  private readonly host =
    inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;

  readonly classInput = input<string>('', { alias: 'class' });
  readonly idInput = input('', { alias: 'id' });
  readonly labelledByInput = input('', { alias: 'aria-labelledby' });
  /**
   * `automatic`: the arrows, Home, End and typing select (with several, Ctrl
   * adds); `manual`: they only move — Space, Enter or a click selects. One
   * value: automatic by default; several: manual.
   */
  readonly activation = input<'automatic' | 'manual' | null>(null);
  /** Which arrows move: ↑ ↓, or ← → (as the text reads). */
  readonly orientation = input<'vertical' | 'horizontal'>('vertical');
  /** The arrows wrap from the last option to the first. */
  readonly loop = input(true, { transform: booleanAttribute });
  /** Focus stays on the list (`aria-activedescendant`), not on the options. */
  readonly virtualFocus = input(false, { transform: booleanAttribute });
  readonly disabled = input(false, { transform: booleanAttribute });
  readonly readonly = input(false, { transform: booleanAttribute });
  readonly required = input(false, { transform: booleanAttribute });
  readonly invalid = input(false, { transform: booleanAttribute });
  readonly touched = input(false, { transform: booleanAttribute });
  /** Focus left it (Signal Forms marks it touched). */
  readonly touch = output<void>();

  /** Several values. */
  abstract readonly ɵmultiple: boolean;
  /** Its options, in order. */
  protected readonly ɵitems = signal<readonly ScListboxItemHost<T>[]>([]);

  private readonly showInvalid = computed(
    () => this.invalid() && this.touched(),
  );
  private readonly isAutomatic = computed(
    () =>
      (this.activation() ?? (this.ɵmultiple ? 'manual' : 'automatic')) ===
      'automatic',
  );

  private readonly id = computed(
    () => this.idInput() || this.field?.id() || null,
  );
  private readonly labelledBy = computed(
    () =>
      this.labelledByInput() ||
      (this.field && !this.ariaLabel ? `${this.field.id()}-label` : null),
  );
  private readonly describedBy = computed(
    () => this.field?.descriptionIds().join(' ') || null,
  );

  private readonly class = computed(() =>
    cn(
      'flex overflow-y-auto outline-none transition-colors',
      this.orientation() === 'horizontal'
        ? 'flex-row flex-wrap gap-1'
        : 'flex-col',
      'focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50',
      'aria-invalid:border-destructive',
      'data-disabled:pointer-events-none data-disabled:opacity-50',
      // The option under focus shows only while the list has focus, or a pointer.
      '[&:not(:focus-within):not(:hover)_[data-active=true]]:bg-transparent [&:not(:focus-within):not(:hover)_[data-active=true]]:text-current',
      this.styles.root,
      this.classInput(),
    ),
  );

  constructor() {
    bindInput(
      this.listbox.multi,
      computed(() => this.ɵmultiple),
    );
    bindInput(
      this.listbox.selectionMode,
      computed(() => (this.isAutomatic() ? 'follow' : 'explicit')),
    );
    bindInput(
      this.listbox.focusMode,
      computed(() => (this.virtualFocus() ? 'activedescendant' : 'roving')),
    );
    bindInput(this.listbox.orientation, this.orientation);
    bindInput(this.listbox.wrap, this.loop);
    bindInput(this.listbox.disabled, this.disabled);
    // Disabled: no Tab stop at all (Aria would keep one on the list).
    bindInput(
      // Its transform takes strings too: the same input, typed as ours.
      this.listbox.tabIndex as unknown as ScTargetInput<number | undefined>,
      computed(() => (this.disabled() ? -1 : undefined)),
    );
    bindInput(this.listbox.readonly, this.readonly);
    // Disabled options are skipped by the arrows, typing and ranges.
    bindInput(this.listbox.softDisabled, false);
  }

  /** Every option that can be chosen (with several). */
  selectAll(): void {
    if (!this.ɵmultiple || this.disabled() || this.readonly()) return;
    this.listbox.value.set(
      this.ɵitems()
        .filter((item) => !item.disabled())
        .map((item) => item.value()),
    );
  }

  /** Nothing chosen. */
  clear(): void {
    if (this.disabled() || this.readonly()) return;
    this.ɵcleared = true;
    this.listbox.value.set([]);
  }

  /** Focus on the list: its option with the Tab stop. */
  focus(): void {
    const option = this.host.querySelector<HTMLElement>(
      '[role=option][tabindex="0"]',
    );
    (this.virtualFocus() || !option ? this.host : option).focus();
  }

  /** A deliberate empty: clear(), or a deselect. */
  protected ɵcleared = false;
  /** The option pressed was chosen already (`deselectable`). */
  ɵpressedSelected = false;

  /** The selected option pressed again: nothing chosen (`deselectable`). */
  abstract ɵdeselect(): void;

  ɵregister(item: ScListboxItemHost<T>): () => void {
    this.ɵitems.update((items) => [...items, item]);
    return () => this.ɵitems.update((items) => items.filter((i) => i !== item));
  }

  /** After Aria's click (its own, on this element): a chosen option pressed again. */
  private onClick(): void {
    if (this.ɵpressedSelected) this.ɵdeselect();
    this.ɵpressedSelected = false;
  }

  private onFocusOut(event: FocusEvent): void {
    const next = event.relatedTarget as Node | null;
    if (next && this.host.contains(next)) return;
    this.touch.emit();
  }
}
