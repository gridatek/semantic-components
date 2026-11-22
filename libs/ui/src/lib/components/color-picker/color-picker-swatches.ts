import {
  Directive,
  Injector,
  afterNextRender,
  computed,
  inject,
  input,
  signal,
} from '@angular/core';
import { cn } from 'cn';
import { ɵwarnIfUnnamed } from '../../utils';

/** What the group knows of an item. */
export interface ScColorPickerSwatchItemRef {
  readonly element: HTMLButtonElement;
  readonly checked: () => boolean;
}

/**
 * In page order. An item not yet in the page (a `@for` row being made) has no
 * order: it stays where it was added, and the list is sorted again once drawn.
 */
const byPageOrder = (
  items: readonly ScColorPickerSwatchItemRef[],
): ScColorPickerSwatchItemRef[] =>
  [...items].sort((a, b) => {
    if (!a.element.isConnected || !b.element.isConnected) return 0;
    return a.element.compareDocumentPosition(b.element) &
      Node.DOCUMENT_POSITION_FOLLOWING
      ? -1
      : 1;
  });

/** Preset colours: a radio group of `scColorPickerSwatchItem`s — one Tab stop, the arrows move and choose. Name it. */
@Directive({
  selector: '[scColorPickerSwatches]',
  host: {
    'data-slot': 'color-picker-swatches',
    role: 'radiogroup',
    '[class]': 'class()',
  },
})
export class ScColorPickerSwatches {
  private readonly injector = inject(Injector);
  readonly classInput = input<string>('', { alias: 'class' });

  /** Its items, in page order: registered by each. */
  readonly items = signal<readonly ScColorPickerSwatchItemRef[]>([]);
  private sortPending = false;

  /** The item in the Tab order: the checked one — or, with none, the first. */
  readonly reachable = computed(() => {
    const items = this.items();
    return (items.find((item) => item.checked()) ?? items[0])?.element;
  });

  private readonly class = computed(() =>
    cn('flex flex-wrap gap-1', this.classInput()),
  );

  constructor() {
    ɵwarnIfUnnamed('scColorPickerSwatches');
  }

  register(item: ScColorPickerSwatchItemRef): void {
    this.items.update((items) => byPageOrder([...items, item]));
    if (this.sortPending) return;
    this.sortPending = true;
    afterNextRender(
      () => {
        this.sortPending = false;
        this.items.update(byPageOrder);
      },
      { injector: this.injector },
    );
  }

  unregister(item: ScColorPickerSwatchItemRef): void {
    this.items.update((items) => items.filter((i) => i !== item));
  }
}
