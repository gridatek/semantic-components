import type { Combobox } from '@angular/aria/combobox';
import type {
  ConnectedOverlayPositionChange,
  ConnectedPosition,
} from '@angular/cdk/overlay';
import {
  Directive,
  type Signal,
  type TemplateRef,
  booleanAttribute,
  computed,
  effect,
  inject,
  input,
  model,
  output,
  signal,
  untracked,
} from '@angular/core';
import { cn } from 'cn';
import { SC_FIELD } from '../field';

/** What the root needs of its input: the Aria combobox on it, and its element. */
export interface ScComboboxInputRef {
  readonly combobox: Combobox;
  readonly element: HTMLInputElement;
}

/** The popup's template (`ng-template[scComboboxPortal]`). */
export interface ScComboboxPortalRef {
  readonly templateRef: TemplateRef<unknown>;
}

// Below its field, or above it without room. The gap is shadcn's sideOffset.
export const scComboboxPositions: ConnectedPosition[] = [
  {
    originX: 'start',
    originY: 'bottom',
    overlayX: 'start',
    overlayY: 'top',
    offsetY: 6,
  },
  {
    originX: 'start',
    originY: 'top',
    overlayX: 'start',
    overlayY: 'bottom',
    offsetY: -6,
  },
];

/**
 * What a combobox does, one value or several: `scCombobox` and
 * `scCombobox multiple` are this, each with its own value's type. Its
 * parts inject it.
 */
@Directive()
export abstract class ScComboboxBase<T = unknown> {
  /** Several values (`multiple`), or one. */
  abstract readonly multiple: boolean;
  /** The selected values: one or none when not `multiple`. */
  abstract readonly selected: Signal<readonly T[]>;
  /** Sets the selected values. */
  abstract setSelected(values: readonly T[]): void;
  /** The popup's template. */
  abstract readonly portal: Signal<ScComboboxPortalRef>;

  readonly classInput = input<string>('', { alias: 'class' });
  /** The input's text. */
  readonly inputValue = model('');
  /** Whether the popup is open. */
  readonly open = model(false);
  /**
   * A value's label, shown in the input, the trigger and the chips: the
   * options' texts are only known once the list has opened. Its string form
   * when not given.
   */
  readonly itemToStringLabel = input<(value: T) => string>();
  /** Whether two values are the same one (objects not kept by reference). */
  readonly isItemEqualToValue = input<(item: T, value: T) => boolean>(
    Object.is,
  );
  /** The first option highlighted while filtering. */
  readonly autoHighlight = input(false, { transform: booleanAttribute });
  /** The pointer highlights the option it moves over. */
  readonly highlightItemOnHover = input(true, {
    transform: booleanAttribute,
  });
  /** The arrows go round from the last option to the first. */
  readonly loopFocus = input(true, { transform: booleanAttribute });
  /** A click in the input opens the list. */
  readonly openOnInputClick = input(true, { transform: booleanAttribute });

  // Bound by Signal Forms ([formField] on the root).
  readonly disabled = input(false, { transform: booleanAttribute });
  readonly readonly = input(false, { transform: booleanAttribute });
  readonly required = input(false, { transform: booleanAttribute });
  readonly invalid = input(false, { transform: booleanAttribute });
  readonly touched = input(false, { transform: booleanAttribute });
  readonly touch = output<void>();

  /** The input in the field (not the one inside the popup). */
  readonly field = signal<ScComboboxInputRef | undefined>(undefined);
  /** The search inside the popup (a trigger opens it), once rendered. */
  readonly search = signal<ScComboboxInputRef | undefined>(undefined);
  /** The trigger's element. */
  readonly triggerElement = signal<HTMLElement | undefined>(undefined);
  /** The chips' element (multiple). */
  readonly chipsElement = signal<HTMLElement | undefined>(undefined);
  /** Whether a clear button shows (it takes the trigger's place). */
  readonly clearVisible = signal(false);
  /** The trigger's accessible name, for the popup it opens. */
  readonly triggerLabel = signal<string | null>(null);

  /**
   * What to filter the options by: the text typed since the list opened —
   * empty until then, so a list opened on a selected value shows them all.
   */
  readonly query = signal('');

  readonly hasValue = computed(() => this.selected().length > 0);
  /** Invalid, once touched: shown on the input or the trigger. */
  readonly showInvalid = computed(() => this.touched() && this.invalid());

  /** Where the popup opened: below its field, or above it. */
  readonly side = signal<'bottom' | 'top'>('bottom');
  protected readonly positions = scComboboxPositions;

  /** What the popup hangs from: the chips, the input's group, or the trigger. */
  protected readonly anchor = computed<HTMLElement | undefined>(() => {
    const input = this.field()?.element;
    return (
      this.chipsElement() ??
      input?.closest<HTMLElement>('[data-slot=input-group]') ??
      input ??
      this.triggerElement()
    );
  });

  /** The options rendered now (those your filter kept). */
  private readonly renderedSignal = signal<readonly T[]>([]);
  readonly rendered = this.renderedSignal.asReadonly();

  /** The scField it is in: its label names a trigger that is the field. */
  private readonly formField = inject(SC_FIELD, { optional: true });
  /**
   * Whether the field it is in is its own: its label names its trigger and
   * its popup. Set to false by a control it is only a part of (the phone
   * input's country picker: the label is the number's).
   */
  readonly namedByField = signal(true);
  /** The field's label's id. */
  readonly labelId = computed(() =>
    this.formField && this.namedByField()
      ? `${this.formField.id()}-label`
      : null,
  );
  /** The field's description and errors. */
  readonly descriptionIds = computed(() =>
    this.namedByField()
      ? this.formField?.descriptionIds().join(' ') || null
      : null,
  );
  /** The value's element in a trigger (`scComboboxValue`): part of its name. */
  readonly valueId = signal<string | null>(null);

  /** Labels of the options seen so far. */
  private readonly labels = signal<ReadonlyMap<T, string>>(new Map());

  /** The selected value's label (the first, when several). */
  readonly selectedLabel = computed(() => {
    const [value] = this.selected();
    return value === undefined ? '' : this.labelOf(value);
  });

  protected readonly class = computed(() =>
    cn('relative w-fit', this.classInput()),
  );

  constructor() {
    // The field's combobox opens and closes with `open`, both ways.
    effect(() => {
      const combobox = this.field()?.combobox;
      const open = this.open();
      if (!combobox) return;
      untracked(() => {
        if (combobox.expanded() !== open) combobox.expanded.set(open);
      });
    });
    effect(() => {
      const expanded = this.field()?.combobox.expanded();
      if (expanded === undefined) return;
      untracked(() => {
        if (this.open() !== expanded) this.open.set(expanded);
      });
    });

    // Closed: the input shows the selected label again (nothing when
    // several, or none), whatever was typed.
    effect(() => {
      if (this.open()) return;
      const text = this.multiple ? '' : this.selectedLabel();
      untracked(() => {
        this.query.set('');
        if (this.field() && this.inputValue() !== text) {
          this.inputValue.set(text);
        }
      });
    });
  }

  /** A value's label: `itemToStringLabel`, its option's text, or its string form. */
  labelOf(value: T): string {
    const label = this.itemToStringLabel()?.(value);
    if (label !== undefined) return label;
    const equal = this.isItemEqualToValue();
    for (const [item, text] of this.labels()) {
      if (equal(item, value)) return text;
    }
    return typeof value === 'string' ? value : String(value ?? '');
  }

  /** Whether a value is selected. */
  isSelected(value: T): boolean {
    const equal = this.isItemEqualToValue();
    return this.selected().some((item) => equal(item, value));
  }

  /**
   * The list's selection changed (a pick): one value closes the popup,
   * several keep it open and clear the text.
   */
  pick(values: readonly T[]): void {
    this.setSelected(values);
    if (this.multiple) {
      this.query.set('');
      if (this.field()) this.inputValue.set('');
      this.search()?.combobox.value.set('');
    } else {
      this.close();
    }
  }

  /** Removes one value (a chip's ✕). */
  remove(value: T): void {
    const equal = this.isItemEqualToValue();
    this.setSelected(this.selected().filter((item) => !equal(item, value)));
    this.focus();
  }

  /** Clears the value and the text. */
  clear(): void {
    this.setSelected([]);
    this.query.set('');
    if (this.field()) this.inputValue.set('');
    this.focus();
  }

  toggle(): void {
    if (this.disabled() || this.readonly()) return;
    if (this.open()) this.close();
    else this.show();
  }

  show(): void {
    if (this.disabled() || this.readonly()) return;
    this.open.set(true);
    this.field()?.element.focus();
  }

  /** Closes the popup; focus back in the input, or on the trigger. */
  close(): void {
    this.open.set(false);
    this.focus();
  }

  focus(options?: FocusOptions): void {
    (this.field()?.element ?? this.triggerElement())?.focus(options);
  }

  /** From the input, towards the chips: the last chip's remove button. */
  focusLastChip(): void {
    const buttons = this.chipsElement()?.querySelectorAll<HTMLElement>(
      '[data-slot=combobox-chip-remove]',
    );
    buttons?.[buttons.length - 1]?.focus();
  }

  /** A click outside a popup that a trigger opened. */
  protected onOutsideClick(event: MouseEvent): void {
    if (this.triggerElement()?.contains(event.target as Node)) return;
    this.open.set(false);
  }

  /** @internal An option rendered, or gone. */
  setRendered(value: T, rendered: boolean): void {
    this.renderedSignal.update((values) =>
      rendered ? [...values, value] : values.filter((item) => item !== value),
    );
  }

  /** @internal An option's text, for its value's label. */
  registerLabel(value: T, label: string): void {
    if (untracked(this.labels).get(value) === label) return;
    this.labels.update((labels) => new Map(labels).set(value, label));
  }

  protected onPositionChange(change: ConnectedOverlayPositionChange): void {
    this.side.set(
      change.connectionPair.originY === 'bottom' ? 'bottom' : 'top',
    );
  }
}
