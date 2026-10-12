import {
  DestroyRef,
  Directive,
  ElementRef,
  afterRenderEffect,
  computed,
  inject,
  input,
} from '@angular/core';
import { cn } from '@semantic-components/ui';
import { ScEmojiPickerState } from './emoji-picker-state';

/**
 * The emoji grid, virtualised: only the rows in view are drawn. Write, in
 * it, every category (`categories()`, each a `scEmojiPickerCategory` with
 * its `scEmojiPickerCategoryHeader`) and the rows in view (`rows()`, each a
 * `scEmojiPickerRow` of `scEmojiPickerEmoji` buttons). Give it an
 * `aria-label`.
 */
@Directive({
  selector: 'div[scEmojiPickerList]',
  exportAs: 'scEmojiPickerList',
  host: {
    'data-slot': 'emoji-picker-list',
    role: 'grid',
    '[attr.aria-rowcount]': 'state.layout().rows.length',
    '[attr.aria-colcount]': 'state.columns()',
    '[class]': 'class()',
    '[style.height.px]': 'state.measured() ? state.totalHeight() : null',
    '[style.padding-top.px]': 'state.measured() ? state.offsetTop() : null',
    '[style.visibility]': 'state.measured() ? null : "hidden"',
    '[style.min-width.px]': 'state.rowWidth()',
    '[style.--sc-emoji-picker-row-height.px]': 'state.rowHeight()',
    '[style.--sc-emoji-picker-header-height.px]': 'state.headerHeight()',
  },
})
export class ScEmojiPickerList {
  protected readonly state = inject(ScEmojiPickerState);

  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    // flow-root: the first row's margin (its header's space) stays inside.
    cn('relative box-border flow-root select-none pb-1', this.classInput()),
  );

  /** Every category (their headers stick while their rows scroll). */
  readonly categories = computed(() => this.state.layout().categories);
  /** The rows in view. */
  readonly rows = this.state.visibleRows;

  constructor() {
    const element = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;
    // A row's and a header's height, as you styled them (all the same).
    let observer: ResizeObserver | null = null;
    inject(DestroyRef).onDestroy(() => observer?.disconnect());
    let observed: Element[] = [];
    const measure = () => {
      observer ??= new ResizeObserver(() => measure());
      const row = element.querySelector<HTMLElement>(
        '[data-slot="emoji-picker-row"]',
      );
      const header = element.querySelector<HTMLElement>(
        '[data-slot="emoji-picker-category-header"]',
      );
      if (row?.offsetHeight) this.state.rowHeight.set(row.offsetHeight);
      // A full row's width (from an emoji's), so the list keeps its width
      // when a search leaves few emojis.
      const emoji = row?.querySelector<HTMLElement>(
        '[data-slot="emoji-picker-emoji"]',
      );
      if (row && emoji?.offsetWidth) {
        const style = getComputedStyle(row);
        const columns = this.state.columns();
        this.state.rowWidth.set(
          (parseFloat(style.paddingLeft) || 0) +
            (parseFloat(style.paddingRight) || 0) +
            columns * emoji.offsetWidth +
            (columns - 1) * (parseFloat(style.columnGap) || 0),
        );
      }
      if (header?.offsetHeight) {
        this.state.headerHeight.set(header.offsetHeight);
      }
      const next = [row, header].filter((e): e is HTMLElement => !!e);
      if (
        next.length !== observed.length ||
        next.some((e, i) => e !== observed[i])
      ) {
        const resize = observer;
        resize.disconnect();
        next.forEach((e) => resize.observe(e));
        observed = next;
      }
    };
    afterRenderEffect(() => {
      this.state.visibleRows();
      this.categories();
      measure();
    });
  }
}
