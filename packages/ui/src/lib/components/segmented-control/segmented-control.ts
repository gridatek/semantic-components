import { FocusKeyManager } from '@angular/cdk/a11y';
import { Directionality } from '@angular/cdk/bidi';
import {
  Directive,
  ElementRef,
  HostAttributeToken,
  Injector,
  booleanAttribute,
  computed,
  inject,
  input,
  model,
  output,
  signal,
} from '@angular/core';
import type { FormValueControl } from '@angular/forms/signals';
import { cn } from 'cn';
import { injectStyle } from '../../config/style';
import { ɵregisterFieldControl } from '../field';

/** An item, as its control reaches it. */
export interface ScSegmentedControlItemRef<T> {
  readonly element: HTMLElement;
  value(): T;
  isDisabled(): boolean;
  focus(): void;
}

/**
 * One value from a short row of buttons — List or Grid, a view, a setting —
 * an indicator sliding to the one checked. A radio group: one Tab stop, the
 * arrows (both ways) move and check, Space checks. A `[formField]`, its value
 * the checked item's (or `null`). Name it (its field's label, or
 * `aria-label`). `#control="scSegmentedControl"`: `focus()`.
 */
@Directive({
  selector: 'div[scSegmentedControl]',
  exportAs: 'scSegmentedControl',
  host: {
    'data-slot': 'segmented-control',
    role: 'radiogroup',
    '[attr.id]': 'id()',
    '[attr.aria-labelledby]': 'labelledBy()',
    '[attr.aria-describedby]': 'describedBy()',
    '[attr.aria-orientation]': 'orientation()',
    '[attr.aria-disabled]': 'disabled() || null',
    '[attr.aria-readonly]': 'readonly() || null',
    '[attr.aria-required]': 'required() || null',
    '[attr.aria-invalid]': 'showInvalid() || null',
    '[attr.data-orientation]': 'orientation()',
    '[attr.data-disabled]': 'disabled() || null',
    '[attr.data-readonly]': 'readonly() || null',
    '[attr.data-required]': 'required() || null',
    '[class]': 'class()',
    '(keydown)': 'onKeydown($event)',
    '(focusin)': 'onFocusIn($event)',
    '(focusout)': 'onFocusOut($event)',
  },
})
export class ScSegmentedControl<
  T = string,
> implements FormValueControl<T | null> {
  private readonly directionality = inject(Directionality);
  private readonly styles = injectStyle().segmentedControl;
  private readonly field = ɵregisterFieldControl();
  private readonly ariaLabel = inject(new HostAttributeToken('aria-label'), {
    optional: true,
  });
  private readonly host =
    inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;

  readonly classInput = input<string>('', { alias: 'class' });
  readonly idInput = input('', { alias: 'id' });
  readonly labelledByInput = input('', { alias: 'aria-labelledby' });
  /** The checked item's value: two-way, or `[formField]`. `null`: none. */
  readonly value = model<T | null>(null);
  /** Its items in a row, or stacked (the arrows move both ways in each). */
  readonly orientation = input<'horizontal' | 'vertical'>('horizontal');
  /** The arrows wrap from the last item to the first. */
  readonly loop = input(true, { transform: booleanAttribute });
  readonly disabled = input(false, { transform: booleanAttribute });
  readonly readonly = input(false, { transform: booleanAttribute });
  readonly required = input(false, { transform: booleanAttribute });
  readonly invalid = input(false, { transform: booleanAttribute });
  readonly touched = input(false, { transform: booleanAttribute });
  /** Focus left it (Signal Forms marks it touched). */
  readonly touch = output<void>();

  private readonly items = signal<readonly ScSegmentedControlItemRef<T>[]>([]);
  private readonly keys = new FocusKeyManager(
    this.items,
    inject(Injector),
  ).skipPredicate((item: ScSegmentedControlItemRef<T>) => item.isDisabled());
  private readonly activeItem = signal<ScSegmentedControlItemRef<T> | null>(
    null,
  );

  readonly showInvalid = computed(() => this.invalid() && this.touched());
  /** The checked item. */
  readonly checkedItem = computed(
    () =>
      this.items().find((item) => Object.is(item.value(), this.value())) ??
      null,
  );
  /** The item with the Tab stop: the focused one, the checked one, or the first. */
  readonly tabStop = computed(() => {
    const items = this.items().filter((item) => !item.isDisabled());
    const active = this.activeItem();
    if (active && items.includes(active)) return active;
    const checked = this.checkedItem();
    return (checked && items.includes(checked) ? checked : items[0]) ?? null;
  });

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
      'group/segmented relative isolate',
      'data-disabled:pointer-events-none data-disabled:opacity-50',
      this.styles.root,
      this.classInput(),
    ),
  );

  /** Checks an item's value — unless disabled or read-only. */
  check(value: T): void {
    if (this.disabled() || this.readonly()) return;
    this.value.set(value);
  }

  /** Focus on the Tab stop: the checked item, or the first. */
  focus(options?: FocusOptions): void {
    this.tabStop()?.element.focus(options);
  }

  /** An item joins, in document order. */
  register(item: ScSegmentedControlItemRef<T>): () => void {
    this.items.update((items) =>
      [...items, item].sort((a, b) =>
        a.element.compareDocumentPosition(b.element) &
        Node.DOCUMENT_POSITION_FOLLOWING
          ? -1
          : 1,
      ),
    );
    return () => this.items.update((items) => items.filter((i) => i !== item));
  }

  private onKeydown(event: KeyboardEvent): void {
    if (this.disabled()) return;
    // Both ways in either orientation; left and right as the text reads.
    this.keys
      .withWrap(this.loop())
      .withVerticalOrientation(true)
      .withHorizontalOrientation(this.directionality.value)
      .withHomeAndEnd(true);
    if (event.key === ' ') {
      const active = this.activeItem();
      if (active) this.check(active.value());
      event.preventDefault();
      return;
    }
    const before = this.keys.activeItem;
    this.keys.onKeydown(event);
    const after = this.keys.activeItem;
    if (after && after !== before) {
      this.activeItem.set(after);
      // Moved: checked too (read-only: only focus moves).
      this.check(after.value());
    }
  }

  private onFocusIn(event: FocusEvent): void {
    const item = this.items().find((i) => i.element === event.target);
    if (!item) return;
    this.activeItem.set(item);
    this.keys.updateActiveItem(item);
  }

  private onFocusOut(event: FocusEvent): void {
    const next = event.relatedTarget as Node | null;
    if (next && this.host.contains(next)) return;
    this.activeItem.set(null);
    this.touch.emit();
  }
}
