import { FocusKeyManager, type FocusableOption } from '@angular/cdk/a11y';
import {
  Directive,
  ElementRef,
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
import { injectPreset } from '../../config/preset';
import { elementDirection } from '../../utils/element-directionality/element-directionality';
import type { ScToggleVariants } from '../toggle/toggle';

/** What the group needs from its items: to focus one, and know its value. */
export interface ScToggleGroupItemRef extends FocusableOption {
  readonly element: HTMLElement;
  value(): unknown;
  isDisabled(): boolean;
}

/**
 * Toggles sharing one value: the pressed ones' values, an array (as Base
 * UI's). One pressed at a time, or several (`multiple`). A [formField]
 * (Signal Forms types it by the group) or [(value)]. One Tab stop: the arrow
 * keys move between the items (mirrored right to left), wrapping at the ends
 * (`loopFocus`). Inside a toolbar, use the toolbar's toggle group instead.
 */
@Directive({
  selector: 'div[scToggleGroup]',
  host: {
    'data-slot': 'toggle-group',
    role: 'group',
    '[attr.data-variant]': 'variant()',
    '[attr.data-size]': 'size()',
    '[attr.data-spacing]': 'spacing()',
    '[attr.data-orientation]': 'orientation()',
    '[attr.data-horizontal]': 'orientation() === "horizontal" ? "" : null',
    '[attr.data-vertical]': 'orientation() === "vertical" ? "" : null',
    '[attr.data-multiple]': 'multiple() || null',
    '[attr.data-disabled]': 'disabled() || null',
    '[attr.aria-disabled]': 'disabled() || null',
    '[style.--gap]': 'spacing()',
    '[class]': 'class()',
    '(keydown)': 'onKeydown($event)',
    '(focusin)': 'onFocusIn($event)',
    '(focusout)': 'onFocusOut($event)',
  },
})
export class ScToggleGroup<T = unknown> implements FormValueControl<T[]> {
  private readonly styles = injectPreset().toggleGroup;
  private readonly element =
    inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;

  readonly classInput = input<string>('', { alias: 'class' });
  /** The pressed items' values: a [formField], or two-way. */
  readonly value = model<T[]>([]);
  /** Several pressed at a time; otherwise one, or none. */
  readonly multiple = input(false, { transform: booleanAttribute });
  // Bound by the Field directive (FormValueControl).
  readonly disabled = input(false, { transform: booleanAttribute });
  /** The arrow keys wrap from the last item to the first. */
  readonly loopFocus = input(true, { transform: booleanAttribute });
  readonly variant = input<ScToggleVariants['variant']>('default');
  readonly size = input<ScToggleVariants['size']>('default');
  /** The gap between the items, in spacing units; 0 joins them. */
  readonly spacing = input<number>(2);
  readonly orientation = input<'horizontal' | 'vertical'>('horizontal');
  /** Focus left the group: the field is touched. */
  readonly touch = output<void>();

  private readonly items = signal<readonly ScToggleGroupItemRef[]>([]);
  private readonly keys = new FocusKeyManager(
    this.items,
    inject(Injector),
  ).skipPredicate((item: ScToggleGroupItemRef) => item.isDisabled());
  private readonly activeItem = signal<ScToggleGroupItemRef | null>(null);

  /** The item that takes the Tab stop: the focused one, the first pressed, or the first. */
  readonly tabStop = computed(() => {
    const items = this.items().filter((item) => !item.isDisabled());
    const active = this.activeItem();
    if (active && items.includes(active)) return active;
    return items.find((item) => this.has(item.value())) ?? items[0] ?? null;
  });

  protected readonly class = computed(() =>
    cn(this.styles.group, this.classInput()),
  );

  /** Whether a value is pressed. */
  has(value: unknown): boolean {
    return this.value().some((pressed) => Object.is(pressed, value));
  }

  /** Presses or releases a value: an item calls it when clicked. */
  toggle(value: unknown): void {
    if (this.disabled()) return;
    const pressed = this.has(value);
    const rest = this.value().filter((v) => !Object.is(v, value));
    if (this.multiple()) {
      this.value.set(pressed ? rest : [...rest, value as T]);
    } else {
      this.value.set(pressed ? [] : [value as T]);
    }
  }

  /** An item joins the group, in document order. */
  register(item: ScToggleGroupItemRef): void {
    this.items.update((items) =>
      [...items, item].sort((a, b) =>
        a.element.compareDocumentPosition(b.element) &
        Node.DOCUMENT_POSITION_FOLLOWING
          ? -1
          : 1,
      ),
    );
  }

  unregister(item: ScToggleGroupItemRef): void {
    this.items.update((items) => items.filter((i) => i !== item));
  }

  /** The Tab stop's item. */
  focus(options?: FocusOptions): void {
    this.tabStop()?.element.focus(options);
  }

  protected onKeydown(event: KeyboardEvent): void {
    // Read now: the group may sit in a right-to-left part of the page.
    this.keys.withWrap(this.loopFocus());
    if (this.orientation() === 'vertical') {
      this.keys.withVerticalOrientation(true).withHorizontalOrientation(null);
    } else {
      this.keys
        .withVerticalOrientation(false)
        .withHorizontalOrientation(elementDirection(this.element));
    }
    if (['Home', 'End'].includes(event.key)) this.keys.withHomeAndEnd(true);
    this.keys.onKeydown(event);
  }

  protected onFocusIn(event: FocusEvent): void {
    const item = this.items().find((i) => i.element === event.target);
    if (item) {
      this.keys.updateActiveItem(item);
      this.activeItem.set(item);
    }
  }

  protected onFocusOut(event: FocusEvent): void {
    if (!this.element.contains(event.relatedTarget as Node | null)) {
      this.touch.emit();
    }
  }
}
